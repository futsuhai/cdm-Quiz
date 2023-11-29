import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopupComponent } from './popup.component';
import { QuizService } from 'src/app/services/quiz.service';
import { IQuiz, Phase } from 'src/app/models/quiz.model';
import { BehaviorSubject, of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { StartComponent } from '../start/start.component';
import { QuestionsComponent } from '../questions/questions.component';
import { ResultsComponent } from '../results/results.component';

describe('PopupComponent', () => {
  let component: PopupComponent;
  let fixture: ComponentFixture<PopupComponent>;
  let mockQuizService: jasmine.SpyObj<QuizService>;
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
  const mockPhase: BehaviorSubject<Phase> = new BehaviorSubject<Phase>(Phase.Start);

  beforeEach(() => {
    mockQuizService = jasmine.createSpyObj('QuizService', ['getQuizzes']);

    TestBed.configureTestingModule({
      declarations: [PopupComponent, StartComponent, QuestionsComponent, ResultsComponent],
      providers: [
        { provide: QuizService, useValue: mockQuizService }
      ]
    });

    fixture = TestBed.createComponent(PopupComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize quizzes$', () => {
    mockQuizService.getQuizzes.and.returnValue(of(mockQuizzes));

    component.ngOnInit();

    component.quizzes$.subscribe(quizzes => {
      expect(quizzes).toEqual(mockQuizzes);
    });
  });

  it('should initialize phase$', () => {

    component.ngOnInit();

    expect(component.phase$).toEqual(mockPhase);

  });

  it('should display app-start component when phase is Start', () => {

    fixture.detectChanges(); 

    const startComponent: DebugElement = fixture.debugElement.query(By.css('.container__start'));

    expect(startComponent).toBeTruthy();
  });
});
