import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { IQuiz } from 'src/app/models/quiz.model';
import { QuizState } from 'src/app/services/quiz-state.module';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
  host: {
    class: "start"
  }
})
export class StartComponent {

  @Input() quizzes$!: Observable<IQuiz[]>;
  public currentQuiz!: IQuiz;
  public selectedQuizIndex!: number;

  constructor(private quizState: QuizState) { }

  public startQuiz(currentQuiz: IQuiz): void {
    if (typeof this.selectedQuizIndex === 'number') { // "if (this.selectedQuizIndex)" не получилось потому что при индексе равном 0 условие не выполняется
      this.quizState.startQuiz(currentQuiz);
    }
  }

  public selectQuiz(quiz: IQuiz, index: number): void {
    this.currentQuiz = quiz;
    this.selectedQuizIndex = index;
  }
}
