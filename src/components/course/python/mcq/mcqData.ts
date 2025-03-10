
import { MCQuestion } from "./types";

// Sample MCQs
export const mcqQuestions: MCQuestion[] = [
  {
    id: "q1",
    question: "What is the output of the following code?",
    code: "x = 5\ny = 10\nprint(x + y)",
    options: [
      { id: "a", text: "5" },
      { id: "b", text: "10" },
      { id: "c", text: "15" },
      { id: "d", text: "Error" }
    ],
    correctOption: "c",
    explanation: "The code adds the variables x (with value 5) and y (with value 10), resulting in 15."
  },
  {
    id: "q2",
    question: "Which of the following is NOT a valid Python data type?",
    options: [
      { id: "a", text: "int" },
      { id: "b", text: "str" },
      { id: "c", text: "bool" },
      { id: "d", text: "char" }
    ],
    correctOption: "d",
    explanation: "Python does not have a built-in 'char' data type. Individual characters are represented as strings of length 1."
  },
  {
    id: "q3",
    question: "What will be the value of the following expression?",
    code: "5 // 2",
    options: [
      { id: "a", text: "2.5" },
      { id: "b", text: "2" },
      { id: "c", text: "2.0" },
      { id: "d", text: "Error" }
    ],
    correctOption: "b",
    explanation: "The // operator performs integer division (floor division), which returns the largest integer less than or equal to the result. So 5 // 2 equals 2, not 2.5."
  }
];
