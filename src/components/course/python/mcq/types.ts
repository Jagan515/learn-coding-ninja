
export interface MCQOption {
  id: string;
  text: string;
}

export interface MCQuestion {
  id: string;
  question: string;
  code?: string;
  options: MCQOption[];
  correctOption: string;
  explanation: string;
}

export interface MCQItem {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}
