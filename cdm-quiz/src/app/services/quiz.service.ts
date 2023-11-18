import { Injectable, NgZone } from '@angular/core';
import { IQuestion } from '../models/question.model';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../app.config';

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

  public chooseAnswer(id: string, answer: string): Promise<any> {
    const data = {
      QuestionId: id,
      AnswerString: answer
    }
    return this.post(`${this.config.questionsApi}/ChooseAnswer`, data);
  }
}
