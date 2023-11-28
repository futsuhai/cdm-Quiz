import { Injectable } from "@angular/core";
import { IQuiz, Phase } from "../models/quiz.model";
import { IAnswerResult } from "../models/answerResult.model";
import { BehaviorSubject, take } from "rxjs";
import { IAnswer } from "../models/answer.model";
import { QuizService } from "./quiz.service";
import { IQuestion } from "../models/question.model";

@Injectable({
  providedIn: 'root'
})
export class QuizState {

  public phaseSubject = new BehaviorSubject<Phase>(Phase.Start);
  public answerResultSubject = new BehaviorSubject<IAnswerResult | null>(null);
  public currentQuiz!: IQuiz;
  public score: number = 0;
  public currentQuestionsIndex: number = 0;

  constructor(private quizService: QuizService) { }

  public startQuiz(currentQuiz: IQuiz): void {
    this.currentQuiz = currentQuiz;
    this.phaseSubject.next(Phase.Progress);
  }

  public endQuiz(): void {
    this.phaseSubject.next(Phase.End);
    this.currentQuestionsIndex = 0;
  }

  public restart(): void {
    this.phaseSubject.next(Phase.Start);
    this.score = 0;
    this.answerResultSubject.next(null);
  }

  public nextQuestion(): void {
    if (this.currentQuestionsIndex < this.currentQuiz.questions.length) {
      this.currentQuestionsIndex++;
      if (this.currentQuestionsIndex == this.currentQuiz.questions.length) {
        this.endQuiz();
      }
    }
    this.answerResultSubject.next(null);
  }

  public get currentQuestion(): IQuestion {
    return this.currentQuiz.questions[this.currentQuestionsIndex];
  }

  public get questionTitle(): string {
    return this.currentQuiz?.questions && this.currentQuestionsIndex < this.currentQuiz.questions.length
      ? this.currentQuiz.questions[this.currentQuestionsIndex].title
      : '';
  }


  public chooseAnswer(answer: IAnswer): void {
    this.quizService.chooseAnswer(answer).pipe(take(1)).subscribe(
      (result: IAnswerResult) => {
        this.answerResultSubject.next(result);
        if (result.result === true) {
          this.score++;
        }
      }
    );
  }
}
