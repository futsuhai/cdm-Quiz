import { Injectable, NgZone } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../app.config';
import { IQuiz } from '../models/quiz.model';
import { IAnswer } from '../models/answer.model';
import { IAnswerResult } from '../models/answerResult.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService extends BaseService {

  constructor(
    http: HttpClient,
    zone: NgZone,
    protected config: AppConfig
  ) { super(http, zone) }

  public getQuizzes(): Promise<IQuiz[]> {
    return this.get(`${this.config.quizzesApi}/GetQuizzes`);
  }

  public chooseAnswer(answer: IAnswer): Promise<IAnswerResult> {
    return this.put(`${this.config.quizzesApi}/ChooseAnswer`, answer);
  }

}
