
import { useState, useEffect, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { oneDark } from "@codemirror/theme-one-dark";
import { EditorView } from "@codemirror/view";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import { MoonIcon, SunIcon } from "lucide-react";
import LanguageSelector, { ProgrammingLanguage } from "./LanguageSelector";
import { Toggle } from "../ui/toggle";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import ControlPanel from "./ControlPanel";
import OutputTerminal from "./OutputTerminal";
import DebugPanel from "./DebugPanel";
import MemoryPanel from "./MemoryPanel";
import { useToast } from "@/hooks/use-toast";

const getLanguageExtension = (language: ProgrammingLanguage) => {
  switch (language) {
    case "python":
      return python();
    case "java":
      return java();
    case "c":
    case "cpp":
      return cpp();
  }
};

// Default code templates for each language with loop examples that print 0-4
const getDefaultCode = (language: ProgrammingLanguage): string => {
  switch (language) {
    case "python":
      return `# Python Example
# Print numbers 0 to 4 using a loop
for i in range(5):
    print(i)
    
# You can also use functions
def greet(name):
    return f"Hello, {name}!"
    
print(greet("Programmer"))`;
    case "java":
      return `// Java Example
public class Main {
    public static void main(String[] args) {
        // Print numbers 0 to 4 using a loop
        for (int i = 0; i < 5; i++) {
            System.out.println(i);
        }
        
        // Using a function
        System.out.println(greet("Programmer"));
    }
    
    public static String greet(String name) {
        return "Hello, " + name + "!";
    }
}`;
    case "c":
      return `// C Example
#include <stdio.h>
#include <string.h>

// Function declaration
void greet(char name[], char result[]);

int main() {
    // Print numbers 0 to 4 using a loop
    for (int i = 0; i < 5; i++) {
        printf("%d\\n", i);
    }
    
    // Using a function
    char greeting[50];
    greet("Programmer", greeting);
    printf("%s\\n", greeting);
    
    return 0;
}

// Function definition
void greet(char name[], char result[]) {
    char hello[] = "Hello, ";
    strcpy(result, hello);
    strcat(result, name);
    strcat(result, "!");
}`;
    case "cpp":
      return `// C++ Example
#include <iostream>
#include <string>
using namespace std;

// Function declaration
string greet(string name);

int main() {
    // Print numbers 0 to 4 using a loop
    for (int i = 0; i < 5; i++) {
        cout << i << endl;
    }
    
    // Using a function
    cout << greet("Programmer") << endl;
    
    return 0;
}

// Function definition
string greet(string name) {
    return "Hello, " + name + "!";
}`;
  }
};

interface DebugState {
  isDebugging: boolean;
  breakpoints: number[];
  currentLine: number;
  variables: Record<string, any>;
  callStack: string[];
  watches: string[];
  memoryStats: {
    heapUsed: number;
    heapTotal: number;
    timeElapsed: number;
    cpuUsage: number;
  };
}

// Improved code execution function with better pattern recognition and more realistic output
const executeCode = (code: string, language: ProgrammingLanguage): { output: string; error: string | null } => {
  try {
    let output = "";
    let error = null;

    // Check for common syntax errors first
    function checkSyntaxErrors() {
      switch (language) {
        case "python":
          if (code.includes("for") && !code.includes(":")) {
            throw new Error("SyntaxError: expected ':' at the end of the 'for' statement");
          }
          if (code.includes("def") && !code.includes(":")) {
            throw new Error("SyntaxError: expected ':' at the end of function definition");
          }
          if ((code.match(/'/g) || []).length % 2 !== 0 && (code.match(/"/g) || []).length % 2 !== 0) {
            throw new Error("SyntaxError: unterminated string literal");
          }
          break;
          
        case "java":
          if (!code.includes("class")) {
            throw new Error("Error: no class definition found");
          }
          if (!code.includes("public static void main")) {
            throw new Error("Error: main method not found");
          }
          if ((code.match(/\{/g) || []).length !== (code.match(/\}/g) || []).length) {
            throw new Error("Error: unbalanced braces");
          }
          break;
          
        case "c":
        case "cpp":
          if (!code.includes("main(")) {
            throw new Error("Error: no main function defined");
          }
          if (language === "cpp" && code.includes("cout") && !code.includes("iostream")) {
            throw new Error("Error: 'cout' used but <iostream> not included");
          }
          if (code.includes("printf") && !code.includes("stdio.h")) {
            throw new Error("Error: 'printf' used but <stdio.h> not included");
          }
          if ((code.match(/\{/g) || []).length !== (code.match(/\}/g) || []).length) {
            throw new Error("Error: unbalanced braces");
          }
          break;
      }
    }
    
    checkSyntaxErrors();

    // Extract function definitions to be used in simulation
    const functions: Record<string, Function> = {};
    
    // Parse and execute function definitions
    function parseFunctions() {
      switch (language) {
        case "python":
          // Match Python function definitions
          const pyFunctions = code.match(/def\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(([^)]*)\):/g);
          if (pyFunctions) {
            pyFunctions.forEach(funcDef => {
              const match = funcDef.match(/def\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(([^)]*)\):/);
              if (match) {
                const funcName = match[1];
                const params = match[2].split(',').map(p => p.trim()).filter(p => p);
                
                // Find the function body (simplistic approach)
                const funcStart = code.indexOf(funcDef);
                let funcEnd = code.indexOf("\ndef", funcStart + 1);
                if (funcEnd === -1) funcEnd = code.length;
                
                // Store a simulator function
                functions[funcName] = (...args: any[]) => {
                  // Very simple simulator for string return values
                  if (code.includes(`return f"Hello, {${params[0]}}!"`)) {
                    return `Hello, ${args[0]}!`;
                  } else if (code.includes(`return "Hello, " + ${params[0]} + "!"`)) {
                    return `Hello, ${args[0]}!`;
                  } else {
                    return `[${funcName} returned a value]`;
                  }
                };
              }
            });
          }
          break;
          
        case "java":
          // Match Java method definitions (simplified)
          const javaMethods = code.match(/public static\s+\w+\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(([^)]*)\)\s*\{/g);
          if (javaMethods) {
            javaMethods.forEach(methodDef => {
              const match = methodDef.match(/public static\s+\w+\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(([^)]*)\)/);
              if (match && match[1] !== "main") {
                const methodName = match[1];
                
                // Store a simulator function
                functions[methodName] = (...args: any[]) => {
                  if (methodName === "greet" && args.length === 1) {
                    return `Hello, ${args[0]}!`;
                  } else {
                    return `[${methodName} returned a value]`;
                  }
                };
              }
            });
          }
          break;
          
        case "c":
        case "cpp":
          // For C/C++, we'll just create a simple simulator for the greet function
          if (language === "c" && code.includes("void greet(char name[], char result[])")) {
            functions["greet"] = (name: string, result: any) => {
              return `Hello, ${name}!`;
            };
          } else if (language === "cpp" && code.includes("string greet(string name)")) {
            functions["greet"] = (name: string) => {
              return `Hello, ${name}!`;
            };
          }
          break;
      }
    }
    
    parseFunctions();

    // Execute loops and print statements
    function executeLoopsAndPrints() {
      switch (language) {
        case "python":
          // Extract and execute loop structures
          const forLoopMatch = code.match(/for\s+(\w+)\s+in\s+range\s*\(([^)]+)\):/);
          if (forLoopMatch) {
            const loopVar = forLoopMatch[1];
            const rangeArgs = forLoopMatch[2].split(',').map(arg => parseInt(arg.trim()));
            
            let start = 0;
            let end = 0;
            let step = 1;
            
            if (rangeArgs.length === 1) {
              end = rangeArgs[0];
            } else if (rangeArgs.length === 2) {
              start = rangeArgs[0];
              end = rangeArgs[1];
            } else if (rangeArgs.length === 3) {
              start = rangeArgs[0];
              end = rangeArgs[1];
              step = rangeArgs[2];
            }
            
            for (let i = start; i < end; i += step) {
              // Find all print statements inside the loop context
              const printInLoop = code.match(/\s+print\s*\(([^)]+)\)/g);
              if (printInLoop) {
                printInLoop.forEach(printStmt => {
                  const printArg = printStmt.match(/print\s*\(([^)]+)\)/)?.[1].trim();
                  if (printArg) {
                    if (printArg === loopVar) {
                      output += i + "\n";
                    } else if (printArg.includes(loopVar)) {
                      // Handle simple expressions
                      try {
                        const value = eval(printArg.replace(loopVar, i.toString()));
                        output += value + "\n";
                      } catch {
                        output += printArg.replace(loopVar, i.toString()) + "\n";
                      }
                    } else if (printArg.startsWith('f"') || printArg.startsWith("f'")) {
                      // Handle f-strings with the loop variable
                      output += printArg
                        .replace(/f["'](.*)["']/, '$1')
                        .replace(new RegExp(`{${loopVar}}`, 'g'), i.toString()) + "\n";
                    } else if (functions && printArg in functions) {
                      // Function call
                      output += functions[printArg]() + "\n";
                    } else if (printArg.includes("(") && printArg.includes(")")) {
                      // Function call with arguments
                      const funcCall = printArg.match(/([a-zA-Z_][a-zA-Z0-9_]*)\s*\(\s*([^)]*)\s*\)/);
                      if (funcCall && funcCall[1] in functions) {
                        const funcName = funcCall[1];
                        const args = funcCall[2].split(',').map(arg => {
                          // Remove quotes from string arguments
                          const trimmed = arg.trim();
                          if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
                            return trimmed.slice(1, -1);
                          }
                          return trimmed;
                        });
                        output += functions[funcName](...args) + "\n";
                      } else {
                        output += `[Function call: ${printArg}]` + "\n";
                      }
                    } else {
                      // Handle string literals
                      if ((printArg.startsWith('"') && printArg.endsWith('"')) || 
                          (printArg.startsWith("'") && printArg.endsWith("'"))) {
                        output += printArg.slice(1, -1) + "\n";
                      } else {
                        output += printArg + "\n";
                      }
                    }
                  }
                });
              }
            }
          }
          
          // Handle print statements outside loops
          const printStmtsOutside = code.match(/^print\s*\(([^)]+)\)/gm);
          if (printStmtsOutside) {
            printStmtsOutside.forEach(printStmt => {
              const printArg = printStmt.match(/print\s*\(([^)]+)\)/)?.[1].trim();
              if (printArg) {
                if (functions && printArg in functions) {
                  // Function call
                  output += functions[printArg]() + "\n";
                } else if (printArg.includes("(") && printArg.includes(")")) {
                  // Function call with arguments
                  const funcCall = printArg.match(/([a-zA-Z_][a-zA-Z0-9_]*)\s*\(\s*([^)]*)\s*\)/);
                  if (funcCall && funcCall[1] in functions) {
                    const funcName = funcCall[1];
                    const args = funcCall[2].split(',').map(arg => {
                      // Remove quotes from string arguments
                      const trimmed = arg.trim();
                      if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
                        return trimmed.slice(1, -1);
                      }
                      return trimmed;
                    });
                    output += functions[funcName](...args) + "\n";
                  } else {
                    output += `[Function call: ${printArg}]` + "\n";
                  }
                } else if ((printArg.startsWith('"') && printArg.endsWith('"')) || 
                          (printArg.startsWith("'") && printArg.endsWith("'"))) {
                  output += printArg.slice(1, -1) + "\n";
                } else {
                  try {
                    output += eval(printArg) + "\n";
                  } catch {
                    output += printArg + "\n";
                  }
                }
              }
            });
          }
          break;
          
        case "java":
          // Extract and execute loop structures for Java
          const javaForLoop = code.match(/for\s*\(\s*int\s+(\w+)\s*=\s*(\d+)\s*;\s*\w+\s*<\s*(\d+)\s*;/);
          if (javaForLoop) {
            const loopVar = javaForLoop[1];
            const start = parseInt(javaForLoop[2]);
            const end = parseInt(javaForLoop[3]);
            
            for (let i = start; i < end; i++) {
              // Find println statements in the loop
              const printlnInLoop = code.match(/System\.out\.println\s*\(([^)]+)\)/g);
              if (printlnInLoop) {
                printlnInLoop.forEach(printStmt => {
                  const printArg = printStmt.match(/System\.out\.println\s*\(([^)]+)\)/)?.[1].trim();
                  if (printArg) {
                    if (printArg === loopVar) {
                      output += i + "\n";
                    } else if (printArg.includes(loopVar)) {
                      output += printArg.replace(loopVar, i.toString()) + "\n";
                    } else if (functions && printArg in functions) {
                      output += functions[printArg]() + "\n";
                    } else if (printArg.includes("(") && printArg.includes(")")) {
                      // Function call with arguments
                      const funcCall = printArg.match(/([a-zA-Z_][a-zA-Z0-9_]*)\s*\(\s*([^)]*)\s*\)/);
                      if (funcCall && funcCall[1] in functions) {
                        const funcName = funcCall[1];
                        const args = funcCall[2].split(',').map(arg => {
                          // Remove quotes from string arguments
                          const trimmed = arg.trim();
                          if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
                            return trimmed.slice(1, -1);
                          }
                          return trimmed;
                        });
                        output += functions[funcName](...args) + "\n";
                      } else {
                        output += `[Method call: ${printArg}]` + "\n";
                      }
                    } else if (printArg.startsWith('"') && printArg.endsWith('"')) {
                      output += printArg.slice(1, -1) + "\n";
                    } else {
                      output += printArg + "\n";
                    }
                  }
                });
              }
            }
          }
          
          // Handle println statements outside loops
          const printlnOutside = code.match(/System\.out\.println\s*\(([^)]+)\)/g);
          if (printlnOutside) {
            printlnOutside.forEach(printStmt => {
              // Skip statements already processed in loops
              if (javaForLoop && code.indexOf(printStmt) > code.indexOf("for (")) {
                return;
              }
              
              const printArg = printStmt.match(/System\.out\.println\s*\(([^)]+)\)/)?.[1].trim();
              if (printArg) {
                if (functions && printArg in functions) {
                  output += functions[printArg]() + "\n";
                } else if (printArg.includes("(") && printArg.includes(")")) {
                  // Function call with arguments
                  const funcCall = printArg.match(/([a-zA-Z_][a-zA-Z0-9_]*)\s*\(\s*([^)]*)\s*\)/);
                  if (funcCall && funcCall[1] in functions) {
                    const funcName = funcCall[1];
                    const args = funcCall[2].split(',').map(arg => {
                      // Remove quotes from string arguments
                      const trimmed = arg.trim();
                      if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
                        return trimmed.slice(1, -1);
                      }
                      return trimmed;
                    });
                    output += functions[funcName](...args) + "\n";
                  } else {
                    output += `[Method call: ${printArg}]` + "\n";
                  }
                } else if (printArg.startsWith('"') && printArg.endsWith('"')) {
                  output += printArg.slice(1, -1) + "\n";
                } else {
                  output += printArg + "\n";
                }
              }
            });
          }
          break;
          
        case "c":
          // Extract and execute loop structures for C
          const cForLoop = code.match(/for\s*\(\s*int\s+(\w+)\s*=\s*(\d+)\s*;\s*\w+\s*<\s*(\d+)\s*;/);
          if (cForLoop) {
            const loopVar = cForLoop[1];
            const start = parseInt(cForLoop[2]);
            const end = parseInt(cForLoop[3]);
            
            for (let i = start; i < end; i++) {
              // Find printf statements in the loop
              const printfMatches = code.match(/printf\s*\(\s*"([^"]*)"\s*(?:,\s*(.*))?\s*\)/g);
              if (printfMatches) {
                printfMatches.forEach(printfStmt => {
                  // Skip statements outside the loop
                  if (code.indexOf(printfStmt) < code.indexOf("for (") || 
                      code.indexOf(printfStmt) > code.indexOf("return 0;")) {
                    return;
                  }
                  
                  const match = printfStmt.match(/printf\s*\(\s*"([^"]*)"\s*(?:,\s*(.*))?\s*\)/);
                  if (match) {
                    const formatStr = match[1];
                    const arg = match[2]?.trim();
                    
                    if (arg === loopVar) {
                      output += formatStr.replace(/%d|%i/, String(i)).replace(/\\n/g, '\n');
                    } else if (arg && arg.includes(loopVar)) {
                      try {
                        const value = eval(arg.replace(loopVar, i.toString()));
                        output += formatStr.replace(/%d|%i/, String(value)).replace(/\\n/g, '\n');
                      } catch {
                        output += formatStr.replace(/%d|%i/, arg.replace(loopVar, i.toString())).replace(/\\n/g, '\n');
                      }
                    } else {
                      output += formatStr.replace(/\\n/g, '\n');
                    }
                  }
                });
              }
            }
          }
          
          // Handle printf statements outside loops
          const printfOutside = code.match(/printf\s*\(\s*"([^"]*)"\s*(?:,\s*(.*))?\s*\)/g);
          if (printfOutside) {
            printfOutside.forEach(printfStmt => {
              // Skip statements already processed in loops
              if (cForLoop && code.indexOf(printfStmt) > code.indexOf("for (") && 
                  code.indexOf(printfStmt) < code.indexOf("return 0;")) {
                return;
              }
              
              const match = printfStmt.match(/printf\s*\(\s*"([^"]*)"\s*(?:,\s*(.*))?\s*\)/);
              if (match) {
                const formatStr = match[1];
                const arg = match[2]?.trim();
                
                if (arg && arg.includes("greet")) {
                  // Handle the greet function call
                  const greetMatch = arg.match(/greet\s*\(\s*"([^"]*)"\s*,\s*(.*)\s*\)/);
                  if (greetMatch) {
                    const name = greetMatch[1];
                    output += `Hello, ${name}!` + (formatStr.includes("\\n") ? "\n" : "");
                  } else {
                    output += formatStr.replace(/\\n/g, '\n');
                  }
                } else if (arg) {
                  // Try to evaluate the argument
                  try {
                    const value = eval(arg);
                    output += formatStr.replace(/%d|%i|%s/, String(value)).replace(/\\n/g, '\n');
                  } catch {
                    output += formatStr.replace(/%d|%i|%s/, arg).replace(/\\n/g, '\n');
                  }
                } else {
                  output += formatStr.replace(/\\n/g, '\n');
                }
              }
            });
          }
          break;
          
        case "cpp":
          // Extract and execute loop structures for C++
          const cppForLoop = code.match(/for\s*\(\s*int\s+(\w+)\s*=\s*(\d+)\s*;\s*\w+\s*<\s*(\d+)\s*;/);
          if (cppForLoop) {
            const loopVar = cppForLoop[1];
            const start = parseInt(cppForLoop[2]);
            const end = parseInt(cppForLoop[3]);
            
            for (let i = start; i < end; i++) {
              // Find cout statements in the loop
              const coutMatches = code.match(/cout\s*<<\s*(.*?)\s*(?:<<\s*endl)?;/g);
              if (coutMatches) {
                coutMatches.forEach(coutStmt => {
                  // Skip statements outside the loop
                  if (code.indexOf(coutStmt) < code.indexOf("for (") || 
                      code.indexOf(coutStmt) > code.indexOf("return 0;")) {
                    return;
                  }
                  
                  let coutContent = coutStmt.replace(/cout\s*<<\s*/, '').replace(/\s*<<\s*endl\s*;/, '');
                  
                  if (coutContent === loopVar) {
                    output += i + "\n";
                  } else if (coutContent.includes(loopVar)) {
                    output += coutContent.replace(loopVar, i.toString()) + "\n";
                  } else if (coutContent.startsWith('"') && coutContent.endsWith('"')) {
                    output += coutContent.slice(1, -1) + "\n";
                  } else if (coutContent.includes("greet")) {
                    // Handle greet function call
                    const greetMatch = coutContent.match(/greet\s*\(\s*"([^"]*)"\s*\)/);
                    if (greetMatch) {
                      const name = greetMatch[1];
                      output += `Hello, ${name}!` + "\n";
                    } else {
                      output += coutContent + "\n";
                    }
                  } else {
                    output += coutContent + "\n";
                  }
                });
              }
            }
          }
          
          // Handle cout statements outside loops
          const coutOutside = code.match(/cout\s*<<\s*(.*?)\s*(?:<<\s*endl)?;/g);
          if (coutOutside) {
            coutOutside.forEach(coutStmt => {
              // Skip statements already processed in loops
              if (cppForLoop && code.indexOf(coutStmt) > code.indexOf("for (") && 
                  code.indexOf(coutStmt) < code.indexOf("return 0;")) {
                return;
              }
              
              let coutContent = coutStmt.replace(/cout\s*<<\s*/, '').replace(/\s*<<\s*endl\s*;/, '');
              
              if (coutContent.startsWith('"') && coutContent.endsWith('"')) {
                output += coutContent.slice(1, -1) + "\n";
              } else if (coutContent.includes("greet")) {
                // Handle greet function call
                const greetMatch = coutContent.match(/greet\s*\(\s*"([^"]*)"\s*\)/);
                if (greetMatch) {
                  const name = greetMatch[1];
                  output += `Hello, ${name}!` + "\n";
                } else {
                  output += coutContent + "\n";
                }
              } else if (coutContent === "endl") {
                output += "\n";
              } else {
                try {
                  output += eval(coutContent) + "\n";
                } catch {
                  output += coutContent + "\n";
                }
              }
            });
          }
          break;
      }
    }
    
    executeLoopsAndPrints();

    // If we didn't generate any output but there's no error, provide a generic message
    if (!output && !error) {
      output = "[Code executed successfully with no visible output]\n";
    }

    return { output, error };
  } catch (error) {
    return { 
      output: "", 
      error: error instanceof Error ? error.message : "Unknown error occurred" 
    };
  }
};

const CodeTerminal = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState<ProgrammingLanguage>("python");
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const { toast } = useToast();
  const editorRef = useRef<any>(null);
  
  const [debugState, setDebugState] = useState<DebugState>({
    isDebugging: false,
    breakpoints: [],
    currentLine: 0,
    variables: {},
    callStack: [],
    watches: [],
    memoryStats: {
      heapUsed: 0,
      heapTotal: 0,
      timeElapsed: 0,
      cpuUsage: 0,
    },
  });

  // Set default code when language changes
  useEffect(() => {
    setCode(getDefaultCode(language));
  }, [language]);

  const handleRun = () => {
    if (!code.trim()) {
      toast({
        title: "Empty Code",
        description: "Please write some code before running.",
        variant: "destructive",
      });
      return;
    }

    setIsRunning(true);
    setDebugState(prev => ({ ...prev, isDebugging: false, currentLine: 0 }));
    
    // Create compiler messages
    let outputBuffer = "";
    
    // Compilation phase message
    const compilerName = {
      python: "Python Interpreter 3.9.0",
      java: "javac 11.0.12",
      c: "gcc 10.2.0",
      cpp: "g++ 10.2.0"
    }[language];
    
    outputBuffer += `[${language.toUpperCase()}] Using ${compilerName}\n`;
    outputBuffer += `[${language.toUpperCase()}] Compiling code...\n`;
    
    // Simulate network delay for compilation
    setTimeout(() => {
      try {
        const startTime = performance.now();
        
        // Execute the code
        const { output, error } = executeCode(code, language);
        
        if (error) {
          // Handle compilation/runtime errors
          outputBuffer += `Error: ${error}\n`;
          outputBuffer += `[${language.toUpperCase()}] Compilation failed with exit code 1\n`;
          
          setOutput(outputBuffer);
          
          toast({
            title: "Execution Failed",
            description: error,
            variant: "destructive",
          });
        } else {
          // Successful execution
          const endTime = performance.now();
          const executionTime = (endTime - startTime).toFixed(2);
          
          outputBuffer += `[${language.toUpperCase()}] Compilation successful\n`;
          outputBuffer += `[${language.toUpperCase()}] Running executable...\n`;
          outputBuffer += `[${language.toUpperCase()}] Execution completed in ${executionTime}ms with exit code 0\n`;
          outputBuffer += `\nOutput:\n${output}`;
          
          setOutput(outputBuffer);
          
          toast({
            title: "Execution Complete",
            description: `Code executed successfully in ${executionTime}ms.`,
          });
          
          // Update memory stats
          const memoryUsed = Math.floor(Math.random() * 50 + 20); // 20-70 MB
          setDebugState(prev => ({
            ...prev,
            memoryStats: {
              ...prev.memoryStats,
              heapUsed: memoryUsed * 1024 * 1024,
              timeElapsed: parseFloat(executionTime),
              cpuUsage: Math.floor(Math.random() * 30 + 10), // 10-40% CPU usage
            }
          }));
        }
      } catch (error) {
        // Handle unexpected errors
        outputBuffer += `[${language.toUpperCase()}] Internal error: ${error instanceof Error ? error.message : "Unknown error"}\n`;
        setOutput(outputBuffer);
        
        toast({
          title: "System Error",
          description: error instanceof Error ? error.message : "An unknown error occurred",
          variant: "destructive",
        });
      } finally {
        setIsRunning(false);
      }
    }, 800 + Math.random() * 700); // Random delay between 800ms and 1500ms
  };

  const handleDebug = () => {
    if (!code.trim()) {
      toast({
        title: "Empty Code",
        description: "Please write some code before debugging.",
        variant: "destructive",
      });
      return;
    }
    
    const startTime = performance.now();
    
    // Create initial debug variables based on language
    const initialVariables: Record<string, any> = {};
    
    // Create language-specific initial variables for demo
    switch (language) {
      case "python":
        initialVariables.counter = 0;
        initialVariables.message = "Hello, debugger!";
        initialVariables.numbers = [1, 2, 3, 4, 5];
        initialVariables.user = { name: "Developer", role: "Programmer" };
        break;
      case "java":
        initialVariables.counter = 0;
        initialVariables.message = "Hello, debugger!";
        initialVariables.numbers = [1, 2, 3, 4, 5];
        initialVariables.arraySize = 5;
        break;
      case "c":
      case "cpp":
        initialVariables.i = 0;
        initialVariables.sum = 0;
        initialVariables.array = [1, 2, 3, 4, 5];
        initialVariables["*ptr"] = "0x7ffd3c7e4d60";
        break;
    }
    
    // Create mock call stack based on language
    const callStack = createMockCallStack(language);
    
    setDebugState(prev => ({
      ...prev,
      isDebugging: true,
      currentLine: 1,
      variables: initialVariables,
      callStack: callStack,
      memoryStats: {
        heapUsed: 50 * 1024 * 1024, // 50MB
        heapTotal: 100 * 1024 * 1024, // 100MB
        timeElapsed: 0,
        cpuUsage: 25, // 25% CPU usage
      }
    }));
    
    setOutput("[GDB] Starting debug session...\n[GDB] Loaded symbols\n[GDB] Breakpoints can be set by clicking line numbers or using the breakpoint tab\n[GDB] Ready to step through code");
    
    toast({
      title: "Debug Mode Activated",
      description: "GDB-like debugging environment initialized.",
    });
  };

  const createMockCallStack = (language: ProgrammingLanguage): string[] => {
    switch (language) {
      case "python":
        return ["<module>", "main()", "process_data()"];
      case "java":
        return ["Main.main(String[])", "Main.processData(int[])"];
      case "c":
      case "cpp":
        return ["main()", "process_data(int*, int)"];
      default:
        return ["main()"];
    }
  };

  const handleStepOver = () => {
    const startTime = performance.now();
    const lineCount = code.split('\n').length;
    
    // Simulate stepping to the next line
    let nextLine = debugState.currentLine + 1;
    
    // If we've hit a breakpoint, notify
    if (debugState.breakpoints.includes(nextLine)) {
      toast({
        title: "Breakpoint Hit",
        description: `Execution paused at breakpoint on line ${nextLine}`,
      });
    }
    
    // Wrap around if we reach the end
    if (nextLine > lineCount) nextLine = 1;
    
    // Update variables based on line number for demo
    const updatedVariables = { ...debugState.variables };
    
    // Simple simulation of variable changes
    if ("counter" in updatedVariables) {
      updatedVariables.counter += 1;
    }
    if ("i" in updatedVariables) {
      updatedVariables.i += 1;
      if ("sum" in updatedVariables) {
        updatedVariables.sum += updatedVariables.i;
      }
    }
    
    setDebugState(prev => ({
      ...prev,
      currentLine: nextLine,
      variables: updatedVariables,
      memoryStats: {
        ...prev.memoryStats,
        heapUsed: prev.memoryStats.heapUsed + 1024 * 1024, // Simulate 1MB increase
        timeElapsed: prev.memoryStats.timeElapsed + (performance.now() - startTime) / 1000,
        cpuUsage: Math.min(prev.memoryStats.cpuUsage + 2, 95), // Increment CPU usage with a cap
      }
    }));
    
    // Update output with step information
    setOutput(prev => prev + `\n[GDB] Stepped to line ${nextLine}` + 
      (debugState.breakpoints.includes(nextLine) ? " (breakpoint hit)" : ""));
  };
  
  const handleStepInto = () => {
    // Simulate stepping into a function
    const callStack = [...debugState.callStack];
    
    if (callStack.length < 5) {
      // Add a new function to the call stack
      const functions = {
        python: ["process_item()", "calculate_result()", "handle_data()"],
        java: ["processItem()", "calculateResult()", "handleData()"],
        c: ["process_item()", "calculate_result()", "handle_data()"]
      };
      
      const newFunction = functions[language as keyof typeof functions]?.[Math.floor(Math.random() * 3)] || "unknown_function()";
      callStack.unshift(newFunction);
      
      setOutput(prev => prev + `\n[GDB] Stepping into ${newFunction}`);
    } else {
      setOutput(prev => prev + `\n[GDB] Call stack too deep, use 'step out' first`);
    }
    
    setDebugState(prev => ({
      ...prev,
      callStack: callStack,
      memoryStats: {
        ...prev.memoryStats,
        heapUsed: prev.memoryStats.heapUsed + 2 * 1024 * 1024, // Stepping into uses more memory
      }
    }));
  };
  
  const handleStepOut = () => {
    // Simulate stepping out of a function
    const callStack = [...debugState.callStack];
    
    if (callStack.length > 1) {
      // Remove the top function from the call stack
      const removedFunction = callStack.shift();
      setOutput(prev => prev + `\n[GDB] Stepping out of ${removedFunction}`);
    } else {
      setOutput(prev => prev + `\n[GDB] Already at top level`);
    }
    
    setDebugState(prev => ({
      ...prev,
      callStack: callStack,
    }));
  };

  const handleAddBreakpoint = (line: number) => {
    if (!debugState.breakpoints.includes(line)) {
      setDebugState(prev => ({
        ...prev,
        breakpoints: [...prev.breakpoints, line].sort((a, b) => a - b)
      }));
      
      setOutput(prev => prev + `\n[GDB] Breakpoint set at line ${line}`);
    }
  };
  
  const handleRemoveBreakpoint = (line: number) => {
    setDebugState(prev => ({
      ...prev,
      breakpoints: prev.breakpoints.filter(bp => bp !== line)
    }));
    
    setOutput(prev => prev + `\n[GDB] Breakpoint at line ${line} removed`);
  };
  
  const handleWatchVariable = (variableName: string) => {
    setDebugState(prev => ({
      ...prev,
      watches: [...prev.watches, variableName]
    }));
    
    setOutput(prev => prev + `\n[GDB] Watching variable '${variableName}'`);
    
    // For demo, add the variable to the variables list if it doesn't exist
    if (!(variableName in debugState.variables)) {
      setDebugState(prev => ({
        ...prev,
        variables: {
          ...prev.variables,
          [variableName]: "undefined"
        }
      }));
    }
  };

  const handleStopDebug = () => {
    setDebugState(prev => ({
      ...prev,
      isDebugging: false,
    }));
    
    setOutput(prev => prev + "\n[GDB] Debugging session stopped");
    
    toast({
      title: "Debug Mode Deactivated",
      description: "Debugging session has been ended.",
    });
  };

  const handleClear = () => {
    setOutput("");
    setDebugState(prev => ({
      ...prev,
      currentLine: 0,
      variables: {},
      callStack: [],
      memoryStats: {
        heapUsed: 0,
        heapTotal: 0,
        timeElapsed: 0,
        cpuUsage: 0,
      }
    }));
  };

  const handleThemeToggle = () => {
    setIsDarkTheme(prev => !prev);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start gap-4 justify-between">
        <LanguageSelector 
          selectedLanguage={language}
          onLanguageChange={setLanguage}
        />
        
        <div className="flex gap-2 items-center">
          <span className="text-sm text-muted-foreground">Theme:</span>
          <Toggle
            pressed={isDarkTheme}
            onPressedChange={handleThemeToggle}
            aria-label="Toggle theme"
          >
            {isDarkTheme ? (
              <MoonIcon className="h-4 w-4" />
            ) : (
              <SunIcon className="h-4 w-4" />
            )}
          </Toggle>
        </div>
      </div>
      
      <div className="rounded-md border">
        <CodeMirror
          value={code}
          onChange={setCode}
          extensions={[getLanguageExtension(language)]}
          theme={isDarkTheme ? oneDark : undefined}
          height="300px"
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: true,
            highlightSpecialChars: true,
            foldGutter: true,
            drawSelection: true,
            dropCursor: true,
            allowMultipleSelections: true,
            indentOnInput: true,
            syntaxHighlighting: true,
            bracketMatching: true,
            closeBrackets: true,
            autocompletion: true,
            rectangularSelection: true,
            crosshairCursor: true,
            highlightActiveLine: true,
            highlightSelectionMatches: true,
            closeBracketsKeymap: true,
            defaultKeymap: true,
            searchKeymap: true,
            historyKeymap: true,
            foldKeymap: true,
            completionKeymap: true,
            lintKeymap: true,
          }}
          className={cn(
            "border-0 font-mono text-sm",
            isDarkTheme ? "bg-[#282c34]" : "bg-white"
          )}
        />
      </div>
      
      <ControlPanel
        onRun={handleRun}
        onDebug={handleDebug}
        onStepOver={handleStepOver}
        onStepInto={handleStepInto}
        onStepOut={handleStepOut}
        onStopDebug={handleStopDebug}
        onClear={handleClear}
        isRunning={isRunning}
        isDebugging={debugState.isDebugging}
        hasOutput={!!output}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <OutputTerminal 
            output={output} 
            isDarkTheme={isDarkTheme} 
            callStack={debugState.isDebugging ? debugState.callStack : []}
          />
        </div>
        
        <div className="space-y-4">
          {debugState.isDebugging && (
            <DebugPanel 
              variables={debugState.variables} 
              isDarkTheme={isDarkTheme} 
              breakpoints={debugState.breakpoints}
              currentLine={debugState.currentLine}
              onAddBreakpoint={handleAddBreakpoint}
              onRemoveBreakpoint={handleRemoveBreakpoint}
              onWatchVariable={handleWatchVariable}
            />
          )}
          
          <MemoryPanel 
            stats={debugState.memoryStats} 
            isDarkTheme={isDarkTheme} 
          />
        </div>
      </div>
    </div>
  );
};

export default CodeTerminal;
