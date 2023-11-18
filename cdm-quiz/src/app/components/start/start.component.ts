import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IQuiz } from 'src/app/models/quiz.model';

@Component({
  selector: 'start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
  host: {
    class: "start"
  }
})
export class StartComponent {

  @Output() public startedQuiz = new EventEmitter<IQuiz>();
  @Input() quizzes!: IQuiz[];
  public currentQuiz!: IQuiz;

  public startQuiz(currentQuiz: IQuiz): void {
    this.startedQuiz.emit(currentQuiz);
  }

  public selectQuiz(quiz: IQuiz): void {
    this.currentQuiz = quiz;
  }
}
