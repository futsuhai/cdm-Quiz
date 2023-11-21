import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { IAnswer } from 'src/app/models/answer.model';
import { IAnswerResult } from 'src/app/models/answerResult.model';
import { IQuiz } from 'src/app/models/quiz.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  host: {
    class: "question"
  }
})

export class QuestionComponent implements OnChanges {

  @Input() answerResult?: IAnswerResult | null;
  @Input() quiz!: IQuiz;
  @Output() public endedQuiz = new EventEmitter<number>();
  @Output() public choosedAnswer = new EventEmitter<IAnswer>();
  public currentQuestionsIndex: number = 0;

  public userAnswerIndex!: number;

  public ngOnChanges(changes: SimpleChanges): void {

  }

  public nextQuestion(): void {
    if (this.currentQuestionsIndex < this.quiz.questions.length) {
      console.log(this.answerResult)
      this.currentQuestionsIndex++;
      if (this.currentQuestionsIndex == this.quiz.questions.length) {
        this.endedQuiz.emit();
      }
    }
    this.answerResult = null;
  }

  public chooseAnswer(quizId: string, questionId: string, answerString: string, userAnswerIndex: number) {
    const answer: IAnswer = {
      quizId: quizId,
      questionId: questionId,
      answerString: answerString
    }
    this.choosedAnswer.emit(answer);
    this.userAnswerIndex = userAnswerIndex;
  }
}
