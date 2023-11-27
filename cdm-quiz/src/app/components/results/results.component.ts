import { Component, OnInit } from '@angular/core';
import { QuizState } from 'src/app/services/quiz-state.module';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  host: {
    class: "results"
  }
})
export class ResultsComponent implements OnInit {

  public score!: number;
  public length!: number;

  constructor(private quizState: QuizState) { }

  public ngOnInit(): void {
    this.length = this.quizState.currentQuiz.questions.length;
    this.score = this.quizState.score;
  }

  public restart(): void {
    this.quizState.restart()
  }
}
