import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IQuiz } from 'src/app/models/quiz.model';

@Component({
  selector: 'app-start',
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
  public selectedQuizIndex!: number;

  public startQuiz(currentQuiz: IQuiz): void {
    if (this.selectedQuizIndex != undefined) { // Можно немного упростить  "if (this.selectedQuizIndex)"
      this.startedQuiz.emit(currentQuiz);
    }
  }

  public selectQuiz(quiz: IQuiz, index: number): void {
    this.currentQuiz = quiz;
    this.selectedQuizIndex = index;
  }
}
