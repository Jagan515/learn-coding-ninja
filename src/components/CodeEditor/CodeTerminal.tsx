import { useState } from "react";
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

  const handleRun = () => {
    setIsRunning(true);
    setDebugState(prev => ({ ...prev, isDebugging: false, currentLine: 0 }));
    
    const compileMessage = `[${language.toUpperCase()}] Compiling code...\n`;
    const runtimeMessage = `[${language.toUpperCase()}] Executing program...\n`;
    let outputMessage = "";

    switch (language) {
      case "python":
        outputMessage = `${compileMessage}>>> ${code}\n\nOutput:\n${code}`;
        break;
      case "java":
        outputMessage = `${compileMessage}javac Main.java\n${runtimeMessage}java Main\n\nOutput:\n${code}`;
        break;
      case "c":
      case "cpp":
        outputMessage = `${compileMessage}g++ -o program main.cpp\n${runtimeMessage}./program\n\nOutput:\n${code}`;
        break;
    }

    setOutput(outputMessage);
    setTimeout(() => setIsRunning(false), 1000);
  };

  const handleDebug = () => {
    const startTime = performance.now();
    
    setDebugState(prev => ({
      ...prev,
      isDebugging: true,
      currentLine: 0,
      variables: { 
        "counter": 0,
        "message": "Hello, debugger!",
        "array": [1, 2, 3]
      },
      memoryStats: {
        heapUsed: 50 * 1024 * 1024, // 50MB
        heapTotal: 100 * 1024 * 1024, // 100MB
        timeElapsed: performance.now() - startTime,
        cpuUsage: 25, // 25% CPU usage
      }
    }));
    setOutput("[Debugger] Starting debug session...\n");
  };

  const handleStepOver = () => {
    const startTime = performance.now();
    
    setDebugState(prev => ({
      ...prev,
      currentLine: prev.currentLine + 1,
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
    setOutput(prev => prev + `\n[Debugger] Stepped to line ${debugState.currentLine + 1}`);
  };

  const handleStopDebug = () => {
    setDebugState(prev => ({ ...prev, isDebugging: false }));
  };

  const handleClear = () => {
    setOutput("");
    setDebugState(prev => ({ ...prev, isDebugging: false, currentLine: 0 }));
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <Card className="w-full max-w-4xl mx-auto border-2">
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
