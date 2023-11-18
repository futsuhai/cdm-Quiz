import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { IAnswer } from 'src/app/models/answer.model';
import { IAnswerResult } from 'src/app/models/answerResult.model';
import { IQuestion } from 'src/app/models/question.model';

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  host: {
    class: "question"
  }
})

export class QuestionComponent implements OnChanges {

  @Input() answerResult?: IAnswerResult;
  @Input() questions!: IQuestion[];
  @Output() public endedQuiz = new EventEmitter<void>();
  @Output() public isRigth = new EventEmitter<IAnswer>();
  public currentQuestionsIndex: number = 0;
  public result!: boolean;

  public ngOnChanges(changes: SimpleChanges): void {
    console.log(this.answerResult);
  }

  public nextQuestion(): void {
    if (this.currentQuestionsIndex < this.questions.length) {
      this.currentQuestionsIndex++;
      if (this.currentQuestionsIndex == this.questions.length) {
        this.endedQuiz.emit();
      }
    }
  }

  public chooseAnswer(answer: string) {
    const eventData: IAnswer = {
      questionId: this.questions[this.currentQuestionsIndex].id,
      answerString: answer
    }
    this.isRigth.emit(eventData);
  }
}
