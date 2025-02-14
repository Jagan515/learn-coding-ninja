
import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { oneDark } from "@codemirror/theme-one-dark";
import { EditorView } from "@codemirror/view";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import { MoonIcon, SunIcon, Play, Trash2, Bug, StepForward, StepBack, Pause } from "lucide-react";
import LanguageSelector, { ProgrammingLanguage } from "./LanguageSelector";
import { ScrollArea } from "../ui/scroll-area";
import { Toggle } from "../ui/toggle";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

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
    setDebugState(prev => ({
      ...prev,
      isDebugging: true,
      currentLine: 0,
      variables: { 
        // Simulate some variables for demonstration
        "counter": 0,
        "message": "Hello, debugger!",
        "array": [1, 2, 3]
      }
    }));
    setOutput("[Debugger] Starting debug session...\n");
  };

  const handleStepOver = () => {
    setDebugState(prev => ({
      ...prev,
      currentLine: prev.currentLine + 1,
      variables: {
        ...prev.variables,
        counter: prev.variables.counter + 1
      }
    }));
    setOutput(prev => prev + `\n[Debugger] Stepped to line ${debugState.currentLine + 1}`);
  };

  const handleToggleBreakpoint = (line: number) => {
    setDebugState(prev => ({
      ...prev,
      breakpoints: prev.breakpoints.includes(line)
        ? prev.breakpoints.filter(bp => bp !== line)
        : [...prev.breakpoints, line]
    }));
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={handleRun}
              disabled={isRunning || debugState.isDebugging}
              className={cn(
                "transition-all",
                isRunning && "animate-pulse bg-primary/90"
              )}
            >
              <Play className="h-4 w-4 mr-2" />
              {isRunning ? "Running..." : "Run"}
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={handleDebug}
              disabled={isRunning || debugState.isDebugging}
            >
              <Bug className="h-4 w-4 mr-2" />
              Debug
            </Button>
            {debugState.isDebugging && (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleStepOver}
                >
                  <StepForward className="h-4 w-4 mr-2" />
                  Step Over
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setDebugState(prev => ({ ...prev, isDebugging: false }))}
                >
                  <Pause className="h-4 w-4 mr-2" />
                  Stop
                </Button>
              </>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleClear}
            disabled={!output || isRunning}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear
          </Button>
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Output Terminal</h3>
            <ScrollArea className={cn(
              "h-[200px] w-full rounded-md border-2 p-4 transition-colors font-mono",
              isDarkTheme 
                ? "bg-gray-900/50 border-gray-800 text-gray-100" 
                : "bg-gray-50 border-gray-200 text-gray-800"
            )}>
              <pre className="text-sm whitespace-pre-wrap">
                {output || (
                  <span className="text-muted-foreground italic">
                    Terminal output will appear here...
                  </span>
                )}
              </pre>
            </ScrollArea>
          </div>
          {debugState.isDebugging && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Variables</h3>
              <ScrollArea className={cn(
                "h-[200px] w-full rounded-md border-2 p-4 transition-colors font-mono",
                isDarkTheme 
                  ? "bg-gray-900/50 border-gray-800 text-gray-100" 
                  : "bg-gray-50 border-gray-200 text-gray-800"
              )}>
                <pre className="text-sm">
                  {Object.entries(debugState.variables).map(([key, value]) => (
                    <div key={key} className="mb-1">
                      <span className="text-blue-500">{key}</span>
                      <span className="text-gray-500"> = </span>
                      <span className="text-green-500">
                        {typeof value === 'object' ? JSON.stringify(value) : value.toString()}
                      </span>
                    </div>
                  ))}
                </pre>
              </ScrollArea>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CodeTerminal;
