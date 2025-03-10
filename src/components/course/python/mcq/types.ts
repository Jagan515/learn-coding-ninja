
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
