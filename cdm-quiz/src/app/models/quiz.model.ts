import { IQuestion } from "./question.model";

export interface IQuiz {
    id: string;
    name: string;
    questions: IQuestion[];
}

export enum Phase {
    Start = "Start",
    Progress = "Progress",
    End = "End"
}
