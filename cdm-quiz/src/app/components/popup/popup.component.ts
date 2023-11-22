import { Component, OnInit } from '@angular/core';
import { IAnswer } from 'src/app/models/answer.model';
import { IAnswerResult } from 'src/app/models/answerResult.model';
import { IQuiz, Phase } from 'src/app/models/quiz.model';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  host: {
    class: "popup"
  }
})

export class PopupComponent implements OnInit {

  public quizzes: IQuiz[] = [];
  public currentQuiz!: IQuiz;
  public phase: Phase = Phase.Start;
  public score: number = 0;
  public answerResult?: IAnswerResult | null;

  constructor(private quizService: QuizService) { }

  public ngOnInit(): void {
    this.getQuizzes();
  }

  public startQuiz(currentQuiz: IQuiz): void {
    this.currentQuiz = currentQuiz;
    this.phase = Phase.Progress;
  }

  public endQuiz(): void {
    this.phase = Phase.End;
  }

  public restart(): void {
    this.phase = Phase.Start;
    this.score = 0;
    this.answerResult = null;
  }

  public async getQuizzes(): Promise<void> {
    this.quizzes = await this.quizService.getQuizzes();
  }

  public async chooseAnswer(answer: IAnswer): Promise<void> {
    this.answerResult = await this.quizService.chooseAnswer(answer);
    if (this.answerResult.result === true) {
      this.score++;
    }
  }
}
