import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { IQuestion } from 'src/app/models/question.model';

interface AnswerEventData {
  id: string;
  answer: string;
}

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  host: {
    class: "question"
  }
})

export class QuestionComponent implements OnChanges {

  @Input() answerResult?: any;
  @Input() questions!: IQuestion[];
  @Output() public endedQuiz = new EventEmitter<void>();
  @Output() public isRigth = new EventEmitter<AnswerEventData>();
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
    const eventData: AnswerEventData = {
      id: this.questions[this.currentQuestionsIndex].id,
      answer: answer
    }
    this.isRigth.emit(eventData);
  }
}
