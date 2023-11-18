import { Component } from '@angular/core';
import { IQuestion } from 'src/app/models/question.model';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  host: {
    class: "popup"
  }
})

export class PopupComponent {

  public answerResult?: any = null;
  public questions: IQuestion[] = [];
  public isQuizStarted: boolean = false;
  public isProgress: boolean = false;
  public isEnd: boolean = false;
  public score: number = 0;

  constructor(private quizService: QuizService) { }

  public async startQuiz(): Promise<void> {
    this.questions = await this.quizService.getQuestions();
    this.isQuizStarted = !this.isQuizStarted;
    this.isProgress = !this.isProgress;
  }

  public endQuiz(): void {
    this.isEnd = !this.isEnd;
    this.isProgress = !this.isProgress;
  }

  public restart(): void {
    this.isQuizStarted = !this.isQuizStarted;
    this.isEnd = !this.isEnd;
    this.score = 0;
  }

  public async chooseAnswer(id: string, answer: string): Promise<void> {
    const result = await this.quizService.chooseAnswer(id, answer);
    if (result.value === true) {
      this.score++;
    }
    this.answerResult = result;
  }
}
