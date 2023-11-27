import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IAnswer } from 'src/app/models/answer.model';
import { IAnswerResult } from 'src/app/models/answerResult.model';
import { IQuestion } from 'src/app/models/question.model';
import { IQuiz } from 'src/app/models/quiz.model';
import { QuizState } from 'src/app/services/quiz-state.module';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
  host: {
    class: "questions"
  }
})

export class QuestionsComponent {

  public answerResult$!: Observable<IAnswerResult | null>;
  public currentQuiz!: IQuiz;
  public currentQuestionsIndex: number = 0;
  public userAnswerIndex!: number | null;

  constructor(private quizState: QuizState) { 
    this.currentQuiz = quizState.currentQuiz;
    this.answerResult$ = this.quizState.answerResultSubject;
  }

  public get currentQuestion(): IQuestion {
    return this.quizState.currentQuestion;
  }

  public get questionTitle(): string {
    return this.quizState.questionTitle;
  }

  public nextQuestion(): void {
    this.quizState.nextQuestion();
    this.userAnswerIndex = null;
  }

  public chooseAnswer(quizId: string, questionId: string, answerOption: string, userAnswerIndex: number) {
    const answer: IAnswer = {
      quizId: quizId,
      questionId: questionId,
      answerOption: answerOption
    }
    this.quizState.chooseAnswer(answer);
    this.userAnswerIndex = userAnswerIndex;
  }
}
