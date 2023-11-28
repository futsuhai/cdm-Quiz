import { Injectable } from '@angular/core';
import { IQuiz } from '../models/quiz.model';
import { IAnswer } from '../models/answer.model';
import { IAnswerResult } from '../models/answerResult.model';
import { RestService } from './rest.service';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  get api(): string {
    return `/api/quizzes`;
  }

  constructor(private restService: RestService) { }

  public getQuizzes(): Observable<IQuiz[]> {
    const endpoint: string = `${this.api}/GetQuizzes`;
    return this.restService.restGET<IQuiz[]>(endpoint).pipe(
      catchError((error: unknown) => {
        console.log('An error occurred while fetching quizzes:', error);
        return [];
      })
    );
  }

  public chooseAnswer(body: IAnswer): Observable<IAnswerResult> {
    const endpoint: string = `${this.api}/ChooseAnswer`;
    return this.restService.restPUT<IAnswerResult>(endpoint, body).pipe(
      catchError((error: unknown) => {
        console.log('An error occurred while choosing an answer:', error);
        return [];
      })
    );
  }
}
