import { IQuestion } from "./question.model";

export interface IQuiz {
    id: string;
    name: string;
    questions: IQuestion[];
}

export type Phase = "Start" | "Progress" | "End";