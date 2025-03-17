import { useState, useEffect } from "react";
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
    print(i)`;
    case "java":
      return `// Java Example
public class Main {
    public static void main(String[] args) {
        // Print numbers 0 to 4 using a loop
        for (int i = 0; i < 5; i++) {
            System.out.println(i);
        }
    }
}`;
    case "c":
      return `// C Example
#include <stdio.h>

int main() {
    // Print numbers 0 to 4 using a loop
    for (int i = 0; i < 5; i++) {
        printf("%d\\n", i);
    }
    
    return 0;
}`;
    case "cpp":
      return `// C++ Example
#include <iostream>
using namespace std;

int main() {
    // Print numbers 0 to 4 using a loop
    for (int i = 0; i < 5; i++) {
        cout << i << endl;
    }
    
    return 0;
}`;
  }
};

interface DebugState {
  isDebugging: boolean;
  breakpoints: number[];
  currentLine: number;
  variables: Record<string, any>;
  memoryStats: {
    heapUsed: number;
    heapTotal: number;
    timeElapsed: number;
    cpuUsage: number;
  };
}

// Simulate compiler and runtime execution for different languages
const executeCode = (code: string, language: ProgrammingLanguage): { output: string; error: string | null } => {
  try {
    let output = "";
    let error = null;

    // Pre-compilation validation for each language to catch obvious errors
    switch (language) {
      case "python":
        // Check for Python syntax errors
        if (!code.includes("print") && code.includes("for") && !code.includes(":")) {
          throw new Error("SyntaxError: expected ':' at the end of the 'for' statement");
        }
        break;
      case "java":
        // Check for basic Java errors
        if (!code.includes("class")) {
          throw new Error("Error: no class definition found");
        }
        if (!code.includes("public static void main")) {
          throw new Error("Error: main method not found");
        }
        break;
      case "c":
      case "cpp":
        // Check for basic C/C++ errors
        if (!code.includes("main(")) {
          throw new Error("Error: no main function defined");
        }
        if (code.includes("cout") && !code.includes("iostream")) {
          throw new Error("Error: 'cout' used but <iostream> not included");
        }
        if (code.includes("printf") && !code.includes("stdio.h")) {
          throw new Error("Error: 'printf' used but <stdio.h> not included");
        }
        break;
    }

    // Simulate execution for each language
    switch (language) {
      case "python":
        // Extract and execute loop structures for Python
        if (code.includes("for") && code.includes("range")) {
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
              // Check if there's a print statement inside the loop
              if (code.includes("print")) {
                const printMatch = code.match(/\s+print\s*\((.*?)\)/);
                if (printMatch) {
                  const printArg = printMatch[1].trim();
                  if (printArg === loopVar) {
                    output += i + "\n";
                  } else if (printArg.includes(loopVar)) {
                    // Handle simple expressions like "i + 1"
                    try {
                      const value = eval(printArg.replace(loopVar, i.toString()));
                      output += value + "\n";
                    } catch {
                      output += printArg.replace(loopVar, i.toString()) + "\n";
                    }
                  } else {
                    output += printArg.replace(/["']/g, "") + "\n";
                  }
                }
              }
            }
          }
        } else if (code.includes("print")) {
          // Handle individual print statements
          const printMatches = code.match(/print\s*\((.*?)\)/g);
          if (printMatches) {
            printMatches.forEach(match => {
              const content = match.substring(match.indexOf('(') + 1, match.lastIndexOf(')'));
              if (content.startsWith('"') || content.startsWith("'")) {
                output += content.slice(1, -1) + "\n";
              } else {
                try {
                  output += eval(content) + "\n";
                } catch {
                  output += content + "\n";
                }
              }
            });
          }
        }
        break;
        
      case "java":
        // Extract and execute loop structures for Java
        if (code.includes("for") && code.includes("System.out.println")) {
          const forLoopMatch = code.match(/for\s*\(\s*int\s+(\w+)\s*=\s*(\d+)\s*;\s*\w+\s*<\s*(\d+)\s*;/);
          if (forLoopMatch) {
            const loopVar = forLoopMatch[1];
            const start = parseInt(forLoopMatch[2]);
            const end = parseInt(forLoopMatch[3]);
            
            const printMatch = code.match(/System\.out\.println\s*\((.*?)\)/);
            if (printMatch) {
              const printArg = printMatch[1].trim();
              
              for (let i = start; i < end; i++) {
                if (printArg === loopVar) {
                  output += i + "\n";
                } else if (printArg.includes(loopVar)) {
                  // Handle simple expressions like "i + 1"
                  try {
                    const value = eval(printArg.replace(loopVar, i.toString()));
                    output += value + "\n";
                  } catch {
                    output += printArg.replace(loopVar, i.toString()) + "\n";
                  }
                } else if (printArg.startsWith('"') && printArg.endsWith('"')) {
                  output += printArg.slice(1, -1) + "\n";
                } else {
                  output += printArg + "\n";
                }
              }
            }
          }
        } else if (code.includes("System.out.println")) {
          // Handle individual print statements
          const printMatches = code.match(/System\.out\.println\s*\((.*?)\)/g);
          if (printMatches) {
            printMatches.forEach(match => {
              const content = match.substring(match.indexOf('(') + 1, match.lastIndexOf(')'));
              if (content.startsWith('"') && content.endsWith('"')) {
                output += content.slice(1, -1) + "\n";
              } else {
                try {
                  output += eval(content) + "\n";
                } catch {
                  output += content + "\n";
                }
              }
            });
          }
        }
        break;
        
      case "c":
        // Extract and execute loop structures for C
        if (code.includes("for") && code.includes("printf")) {
          const forLoopMatch = code.match(/for\s*\(\s*int\s+(\w+)\s*=\s*(\d+)\s*;\s*\w+\s*<\s*(\d+)\s*;/);
          if (forLoopMatch) {
            const loopVar = forLoopMatch[1];
            const start = parseInt(forLoopMatch[2]);
            const end = parseInt(forLoopMatch[3]);
            
            const printMatch = code.match(/printf\s*\(\s*"([^"]*)"\s*(?:,\s*(.*))?\s*\)/);
            if (printMatch) {
              let formatStr = printMatch[1];
              const printArg = printMatch[2]?.trim();
              
              for (let i = start; i < end; i++) {
                if (printArg === loopVar) {
                  output += formatStr.replace(/%d|%i/, String(i)).replace(/\\n/g, '\n');
                } else if (printArg && printArg.includes(loopVar)) {
                  try {
                    const value = eval(printArg.replace(loopVar, i.toString()));
                    output += formatStr.replace(/%d|%i/, String(value)).replace(/\\n/g, '\n');
                  } catch {
                    output += formatStr.replace(/%d|%i/, printArg.replace(loopVar, i.toString())).replace(/\\n/g, '\n');
                  }
                } else {
                  output += formatStr.replace(/\\n/g, '\n');
                }
              }
            }
          }
        } else if (code.includes("printf")) {
          // Handle individual printf statements
          const printfMatches = code.match(/printf\s*\(\s*"([^"]*)"\s*(?:,\s*(.*))?\s*\)/g);
          if (printfMatches) {
            printfMatches.forEach(match => {
              const formatMatch = match.match(/printf\s*\(\s*"([^"]*)"\s*(?:,\s*(.*))?\s*\)/);
              if (formatMatch) {
                let formatStr = formatMatch[1];
                const args = formatMatch[2]?.split(',').map(arg => arg.trim()) || [];
                
                let result = formatStr;
                args.forEach((arg) => {
                  try {
                    const value = eval(arg);
                    // Use String() instead of replace with a function
                    result = result.replace(/%d|%i|%f|%s/, String(value));
                  } catch {
                    result = result.replace(/%d|%i|%f|%s/, arg);
                  }
                });
                
                output += result.replace(/\\n/g, '\n');
              }
            });
          }
        }
        break;
        
      case "cpp":
        // Extract and execute loop structures for C++
        if (code.includes("for") && code.includes("cout")) {
          const forLoopMatch = code.match(/for\s*\(\s*int\s+(\w+)\s*=\s*(\d+)\s*;\s*\w+\s*<\s*(\d+)\s*;/);
          if (forLoopMatch) {
            const loopVar = forLoopMatch[1];
            const start = parseInt(forLoopMatch[2]);
            const end = parseInt(forLoopMatch[3]);
            
            const coutMatch = code.match(/cout\s*<<\s*(.*?)\s*(?:<<\s*endl)?;/);
            if (coutMatch) {
              const coutArg = coutMatch[1].trim();
              
              for (let i = start; i < end; i++) {
                if (coutArg === loopVar) {
                  output += i + "\n";
                } else if (coutArg.includes(loopVar)) {
                  try {
                    const value = eval(coutArg.replace(loopVar, i.toString()));
                    output += value + "\n";
                  } catch {
                    output += coutArg.replace(loopVar, i.toString()) + "\n";
                  }
                } else if (coutArg.startsWith('"') && coutArg.endsWith('"')) {
                  output += coutArg.slice(1, -1) + "\n";
                } else {
                  output += coutArg + "\n";
                }
              }
            }
          }
        } else if (code.includes("cout")) {
          // Handle individual cout statements
          const coutMatches = code.match(/cout\s*<<\s*(.*?)\s*(?:<<\s*endl)?;/g);
          if (coutMatches) {
            coutMatches.forEach(match => {
              // Extract the content being output
              let content = match.replace(/cout\s*<<\s*/, '').replace(/\s*<<\s*endl\s*;/, '');
              
              if (content.startsWith('"') && content.endsWith('"')) {
                output += content.slice(1, -1) + "\n";
              } else if (content === "endl") {
                output += "\n";
              } else {
                try {
                  output += eval(content) + "\n";
                } catch {
                  output += content + "\n";
                }
              }
            });
          }
        }
        break;
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
  
  const [debugState, setDebugState] = useState<DebugState>({
    isDebugging: false,
    breakpoints: [],
    currentLine: 0,
    variables: {},
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
    
    setDebugState(prev => ({
      ...prev,
      isDebugging: true,
      currentLine: 1,
      variables: { 
        "counter": 0,
        "message": "Hello, debugger!",
        "array": [1, 2, 3]
      },
      memoryStats: {
        heapUsed: 50 * 1024 * 1024, // 50MB
        heapTotal: 100 * 1024 * 1024, // 100MB
        timeElapsed: 0,
        cpuUsage: 25, // 25% CPU usage
      }
    }));
    
    setOutput("[Debugger] Starting debug session...\n[Debugger] Loaded variables for inspection\n[Debugger] Ready to step through code");
    
    toast({
      title: "Debug Mode Activated",
      description: "Use the step controls to navigate through your code.",
    });
  };

  const handleStepOver = () => {
    const startTime = performance.now();
    const lineCount = code.split('\n').length;
    
    // Simulate stepping to the next line, wrapping around if we reach the end
    const nextLine = (debugState.currentLine + 1) % lineCount || 1;
    
    setDebugState(prev => ({
      ...prev,
      currentLine: nextLine,
      variables: {
        ...prev.variables,
        counter: prev.variables.counter + 1
      },
      memoryStats: {
        ...prev.memoryStats,
        heapUsed: prev.memoryStats.heapUsed + 1024 * 1024, // Simulate 1MB increase
        timeElapsed: performance.now() - startTime,
        cpuUsage: Math.min(prev.memoryStats.cpuUsage + 5, 100), // Increase CPU usage
      }
    }));
    
    setOutput(prev => prev + `\n[Debugger] Stepped to line ${nextLine}`);
  };

  const handleStopDebug = () => {
    setDebugState(prev => ({ ...prev, isDebugging: false }));
    setOutput(prev => prev + "\n[Debugger] Debug session terminated");
    
    toast({
      title: "Debug Mode Deactivated",
      description: "Returning to regular editing mode.",
    });
  };

  const handleClear = () => {
    setOutput("");
    setDebugState(prev => ({ ...prev, isDebugging: false, currentLine: 0 }));
    
    toast({
      title: "Console Cleared",
      description: "Output terminal has been cleared.",
    });
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <Card className="w-full mx-auto border-2">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <LanguageSelector
                selectedLanguage={language}
                onLanguageChange={setLanguage}
              />
              <Badge variant="outline" className={cn(
                "ml-2 transition-colors",
                isRunning ? "bg-primary/10 text-primary" : 
                debugState.isDebugging ? "bg-yellow-500/10 text-yellow-500" : 
                "bg-muted"
              )}>
                {isRunning ? "Running" : 
                 debugState.isDebugging ? "Debugging" : 
                 "Ready"} - {language.toUpperCase()} Compiler
              </Badge>
            </div>
          </div>
          <Toggle
            pressed={isDarkTheme}
            onPressedChange={toggleTheme}
            aria-label="Toggle theme"
            className="bg-background hover:bg-muted"
          >
            {isDarkTheme ? (
              <SunIcon className="h-4 w-4" />
            ) : (
              <MoonIcon className="h-4 w-4" />
            )}
          </Toggle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className={cn(
          "min-h-[300px] border-2 rounded-lg overflow-hidden transition-colors relative",
          !isDarkTheme ? "border-gray-300 shadow-sm" : "border-gray-800"
        )}>
          <CodeMirror
            value={code}
            height="300px"
            extensions={[getLanguageExtension(language)]}
            theme={isDarkTheme ? oneDark : EditorView.theme({})}
            onChange={(value) => setCode(value)}
            className={cn(
              "text-sm transition-colors",
              !isDarkTheme ? "bg-white" : "bg-gray-900"
            )}
          />
          {debugState.isDebugging && (
            <div className="absolute left-0 top-0 w-8 h-full bg-opacity-20 pointer-events-none">
              {debugState.breakpoints.map(line => (
                <div
                  key={line}
                  className="absolute left-0 w-full h-5 bg-red-500"
                  style={{ top: `${line * 20}px` }}
                />
              ))}
              {debugState.currentLine > 0 && (
                <div
                  className="absolute left-0 w-full h-5 bg-yellow-500"
                  style={{ top: `${debugState.currentLine * 20}px` }}
                />
              )}
            </div>
          )}
        </div>
        
        <ControlPanel
          onRun={handleRun}
          onDebug={handleDebug}
          onStepOver={handleStepOver}
          onStopDebug={handleStopDebug}
          onClear={handleClear}
          isRunning={isRunning}
          isDebugging={debugState.isDebugging}
          hasOutput={!!output}
        />

        <Separator className="my-4" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <OutputTerminal
              output={output}
              isDarkTheme={isDarkTheme}
            />
          </div>
          {debugState.isDebugging && (
            <>
              <DebugPanel
                variables={debugState.variables}
                isDarkTheme={isDarkTheme}
              />
              <div className="md:col-span-3">
                <MemoryPanel
                  stats={debugState.memoryStats}
                  isDarkTheme={isDarkTheme}
                />
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CodeTerminal;
