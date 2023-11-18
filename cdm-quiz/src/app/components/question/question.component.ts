import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { IAnswer } from 'src/app/models/answer.model';
import { IAnswerResult } from 'src/app/models/answerResult.model';
import { IQuestion } from 'src/app/models/question.model';
import { IQuiz } from 'src/app/models/quiz.model';

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  host: {
    class: "question"
  }
})

export class QuestionComponent implements OnChanges {

  @Input() answerResult?: IAnswerResult;//

  @Input() quiz!: IQuiz;
  @Output() public endedQuiz = new EventEmitter<number>();
  public currentQuestionsIndex: number = 0;
  public score: number = 0;

  @Output() public isRigth = new EventEmitter<IAnswer>();
  public result!: boolean;

  public ngOnChanges(changes: SimpleChanges): void {

  }

  public nextQuestion(): void {
    if (this.currentQuestionsIndex < this.quiz.questions.length) {
      this.currentQuestionsIndex++;
      if (this.currentQuestionsIndex == this.quiz.questions.length) {
        this.endedQuiz.emit(this.score);
      }
    }
  }
}
