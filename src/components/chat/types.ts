
export interface Message {
  role: "assistant" | "user";
  content: string;
}

export interface ChatContext {
  title: string;
  description: string;
  currentSection?: string;
}
