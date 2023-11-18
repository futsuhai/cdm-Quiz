import { Component } from '@angular/core';
import { IAnswer } from 'src/app/models/answer.model';
import { IAnswerResult } from 'src/app/models/answerResult.model';
import { IQuestion } from 'src/app/models/question.model';
import { IQuiz, Phase } from 'src/app/models/quiz.model';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  host: {
    class: "popup"
  }
})

export class PopupComponent {

  public quizzes: IQuiz[] = [];
  public currentQuiz!: IQuiz;
  public phase: Phase = "Start";
  public score: number = 0;

  public answerResult?: IAnswerResult;//

  constructor(private quizService: QuizService) { 
    this.getQuizzes();
  }

  public startQuiz(currentQuiz: IQuiz): void {
    this.currentQuiz = currentQuiz;
    this.phase = "Progress";
  }

  public endQuiz(score: number): void {
    this.phase = "End"
    this.score = score
  }

  public restart(): void {
    this.phase = "Start"
    this.score = 0;
  }

  public async getQuizzes(): Promise<void> {
    this.quizzes = await this.quizService.getQuizzes();
  }

  public async getQuiz(id: string): Promise<void> {
    this.currentQuiz = await this.quizService.getQuiz(id);
  }
}
