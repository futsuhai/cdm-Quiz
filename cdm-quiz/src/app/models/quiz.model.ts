import { IQuestion } from "./question.model";

export interface IQuiz {
    id: string;
    name: string;
    questions: IQuestion[];
}

export type Phase = "Start" | "Progress" | "End"; // ИМХО лучше вынести в enum, он буд-то больше для этих целей подходит. Но смотри сам
