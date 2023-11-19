import { Component } from '@angular/core';
import { IAnswer } from 'src/app/models/answer.model';
import { IAnswerResult } from 'src/app/models/answerResult.model';
import { IQuestion } from 'src/app/models/question.model';
import { IQuiz, Phase } from 'src/app/models/quiz.model';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'popup', // В ангуляре (да и не только) принято добавлять префикс app- в к тегу компоненту (app-popup). Это делают для того, чтобы не было конфликтов имен со сторонними библиотеками
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  host: {
    class: "popup"
  }
})

export class PopupComponent {

  public quizzes: IQuiz[] = []; // эта переменная нужна только для того, чтобы её передали внутрь start. Можно её инициализацию туда и перенести
  public currentQuiz!: IQuiz;
  public phase: Phase = "Start";
  public score: number = 0;
  public answerResult?: IAnswerResult | null;

  constructor(private quizService: QuizService) {
    this.getQuizzes(); // В конструкторе очень редко пишут какую-то логику. Для этого есть lifecycle хук OnInit. Вся логика, которая должна быть выполнена во время инициализации, прописывается там
  }

  public startQuiz(currentQuiz: IQuiz): void {
    this.currentQuiz = currentQuiz;
    this.phase = "Progress";
  }

  public endQuiz(): void {
    this.phase = "End"
  }

  public restart(): void {
    this.phase = "Start"
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
