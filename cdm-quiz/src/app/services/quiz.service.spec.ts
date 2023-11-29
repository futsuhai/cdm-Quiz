import { TestBed } from '@angular/core/testing';
import { QuizService } from './quiz.service';
import { of, throwError } from 'rxjs';
import { IQuiz } from '../models/quiz.model';
import { IAnswer } from '../models/answer.model';
import { IAnswerResult } from '../models/answerResult.model';
import { RestService } from './rest.service';

describe('QuizService', () => {
  let quizService: QuizService;
  let restServiceSpy: jasmine.SpyObj<RestService>;
  const mockQuizzes: IQuiz[] = [
    {
      id: "1",
      name: "First Quiz",
      questions: [
        {
          id: "1",
          title: "Question 1",
          answers: ["Answ1", "Answ2", "Answ3", "Answ4"]
        },
        {
          id: "2",
          title: "Question 2",
          answers: ["Answ1", "Answ2", "Answ3", "Answ4"]
        },
      ]
    }
  ];
  const mockError: Error = new Error('Error message');
  const mockAnswer: IAnswer = {
    quizId: "1",
    questionId: "1",
    answerOption: "Answ1"
  };
  const mockResult: IAnswerResult = {
    result: true,
    index: 1
  };

  beforeEach(() => {
    const spy = jasmine.createSpyObj('RestService', ['restGET', 'restPUT']);

    TestBed.configureTestingModule({
      providers: [
        QuizService,
        { provide: RestService, useValue: spy }
      ]
    });

    quizService = TestBed.inject(QuizService);
    restServiceSpy = TestBed.inject(RestService) as jasmine.SpyObj<RestService>;
  });

  it('should be created', () => {
    expect(quizService).toBeTruthy();
  });

  it('should get quizzes', () => {
    restServiceSpy.restGET.and.returnValue(of(mockQuizzes));

    quizService.getQuizzes().subscribe(quizzes => {
      expect(quizzes).toEqual(mockQuizzes);
    });
  });

  it('should handle error when getting quizzes', () => {
    restServiceSpy.restGET.and.returnValue(throwError(() => mockError));

    quizService.getQuizzes().subscribe(
      quizzes => {
        expect(quizzes).toEqual(mockQuizzes);
      },
    );
  });

  it('should choose answer', () => {
    restServiceSpy.restPUT.and.returnValue(of(mockResult));

    quizService.chooseAnswer(mockAnswer).subscribe(
      result => {
        expect(result).toEqual(mockResult);
      });
  });

  it('should handle error when choosing answer', () => {
    restServiceSpy.restPUT.and.returnValue(throwError(() => mockError));
    quizService.chooseAnswer(mockAnswer).subscribe(
      result => {
        expect(result).toEqual(mockResult);
      });
  });
});
