import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

  public getQuizzes(): void {
    // Вот тут я настоятельно рекомендую почитать про отписки в ангуляре
    // https://blog.bitsrc.io/6-ways-to-unsubscribe-from-observables-in-angular-ab912819a78f?gi=550ab047c3d8
    // в данном случае обрати внимание на async пайп
    this.quizService.getQuizzes().subscribe(
      (quizzes: IQuiz[]) => {
        this.quizzes = quizzes;
      }
    )
  }

  public chooseAnswer(answer: IAnswer): void {
    this.quizService.chooseAnswer(answer).subscribe(
      (result: IAnswerResult) => {
        this.answerResult = result;
        if (this.answerResult.result) {
          this.score++;
        }
      }
    );
  }
}
