
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
import { MoonIcon, SunIcon, Play, Trash2 } from "lucide-react";
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

const CodeTerminal = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState<ProgrammingLanguage>("python");
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    // Simulate compilation and execution with language-specific messages
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
    // Simulate compilation/execution time
    setTimeout(() => setIsRunning(false), 1000);
  };

  const handleClear = () => {
    setOutput("");
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    // Toggle the class on the document root for global theme
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
                isRunning ? "bg-primary/10 text-primary" : "bg-muted"
              )}>
                {isRunning ? "Running" : "Ready"} - {language.toUpperCase()} Compiler
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
          "min-h-[300px] border-2 rounded-lg overflow-hidden transition-colors",
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
        </div>
        <Separator className="my-4" />
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Output Terminal</h3>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleClear}
                disabled={!output || isRunning}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear
              </Button>
              <Button 
                size="sm" 
                onClick={handleRun}
                disabled={isRunning}
                className={cn(
                  "transition-all",
                  isRunning && "animate-pulse bg-primary/90"
                )}
              >
                <Play className="h-4 w-4 mr-2" />
                {isRunning ? "Running..." : "Run"}
              </Button>
            </div>
          </div>
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
      </CardContent>
    </Card>
  );
};

export default CodeTerminal;
