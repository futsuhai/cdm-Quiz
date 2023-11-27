import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IQuiz, Phase } from 'src/app/models/quiz.model';
import { QuizState } from 'src/app/services/quiz-state.module';
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

  public quizzes$!: Observable<IQuiz[]>;
  public phase$!: Observable<Phase>;

  constructor(
    private quizService: QuizService,
    private quizState: QuizState) { }

  public ngOnInit(): void {
    this.quizzes$ = this.quizService.getQuizzes();
    this.phase$ = this.quizState.phaseSubject;
  }
}
