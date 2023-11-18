import { Injectable, NgZone } from '@angular/core';
import { IQuestion } from '../models/question.model';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../app.config';
import { IAnswerResult } from '../models/answerResult.model';
import { IAnswer } from '../models/answer.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService extends BaseService {

  constructor(
    http: HttpClient,
    zone: NgZone,
    protected config: AppConfig
  ) { super(http, zone) }

  public getQuestions(): Promise<IQuestion[]> {
    return this.get(`${this.config.questionsApi}/GetQuestions`);
  }

  public chooseAnswer(answer: IAnswer): Promise<IAnswerResult> {
    return this.put(`${this.config.questionsApi}/ChooseAnswer`, answer);
  }
}
