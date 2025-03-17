
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

// Default code templates for each language
const getDefaultCode = (language: ProgrammingLanguage): string => {
  switch (language) {
    case "python":
      return `# Python Example
print("Hello, World!")

# Try a simple calculation
result = 5 + 7
print(f"5 + 7 = {result}")`;
    case "java":
      return `// Java Example
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        // Try a simple calculation
        int result = 5 + 7;
        System.out.println("5 + 7 = " + result);
    }
}`;
    case "c":
      return `// C Example
#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    
    // Try a simple calculation
    int result = 5 + 7;
    printf("5 + 7 = %d\\n", result);
    
    return 0;
}`;
    case "cpp":
      return `// C++ Example
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    
    // Try a simple calculation
    int result = 5 + 7;
    cout << "5 + 7 = " << result << endl;
    
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
    
    const compileMessage = `[${language.toUpperCase()}] Compiling code...\n`;
    const runtimeMessage = `[${language.toUpperCase()}] Executing program...\n`;
    
    // Simulated compilation and execution
    const executeCode = () => {
      try {
        let result = "";
        
        switch (language) {
          case "python":
            if (code.includes("print")) {
              const printMatches = code.match(/print\((.*?)\)/g);
              if (printMatches) {
                result = printMatches
                  .map(match => {
                    const content = match.substring(6, match.length - 1);
                    return content.startsWith('"') || content.startsWith("'") 
                      ? content.slice(1, -1) 
                      : eval(content);
                  })
                  .join("\n");
              }
            } else if (code.trim()) {
              result = String(eval(code));
            }
            break;
            
          case "java":
            if (code.includes("System.out.println")) {
              const printMatches = code.match(/System\.out\.println\((.*?)\)/g);
              if (printMatches) {
                result = printMatches
                  .map(match => {
                    const content = match.substring(19, match.length - 1);
                    return content.startsWith('"') ? content.slice(1, -1) : eval(content);
                  })
                  .join("\n");
              }
            }
            break;
            
          case "c":
          case "cpp":
            if (code.includes("printf") || code.includes("cout")) {
              const printfMatches = code.match(/printf\((.*?)\)/g);
              const coutMatches = code.match(/cout\s*<<\s*(.*?)(;|<<)/g);
              
              if (printfMatches) {
                result = printfMatches
                  .map(match => {
                    const content = match.substring(7, match.length - 1);
                    const parts = content.split(',');
                    if (parts.length === 1) {
                      return content.startsWith('"') ? content.slice(1, -1) : eval(content);
                    } else {
                      // Simple format string handling
                      let formatStr = parts[0].slice(1, -1);
                      formatStr = formatStr.replace(/\\n/g, '\n');
                      return formatStr.replace(/%d|%s|%f/g, "value");
                    }
                  })
                  .join("\n");
              } else if (coutMatches) {
                result = coutMatches
                  .map(match => {
                    // Remove 'cout <<' and potential trailing '<<' or ';'
                    let content = match.replace(/cout\s*<<\s*/, '').replace(/;$|<<$/, '').trim();
                    if (content.startsWith('"') && content.endsWith('"')) {
                      return content.slice(1, -1);
                    } else if (content === "endl") {
                      return "\n";
                    } else {
                      return content;
                    }
                  })
                  .join("");
              }
            }
            break;
        }
        
        // Simulate potential errors
        if (Math.random() < 0.05) {
          throw new Error("Random runtime error simulated for testing");
        }
        
        return result;
      } catch (error) {
        return `Runtime Error: ${error.message}`;
      }
    };

    // Simulate network delay for compilation
    setTimeout(() => {
      try {
        const startTime = performance.now();
        const result = executeCode();
        const endTime = performance.now();
        const executionTime = (endTime - startTime).toFixed(2);
        
        // Update output with execution results
        const successMessage = `Execution completed in ${executionTime}ms with exit code 0.\n`;
        const outputMessage = `${compileMessage}${runtimeMessage}${successMessage}\nOutput:\n${result}`;
        setOutput(outputMessage);
        
        // Show success toast
        toast({
          title: "Execution Complete",
          description: `Code executed successfully in ${executionTime}ms.`,
        });
      } catch (error) {
        // Handle any unexpected errors
        const errorMessage = `${compileMessage}Error during execution: ${error.message}`;
        setOutput(errorMessage);
        
        toast({
          title: "Execution Failed",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setIsRunning(false);
      }
    }, 500 + Math.random() * 1000); // Random delay between 500ms and 1500ms
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
