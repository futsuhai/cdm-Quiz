import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  host: {
    class: "results"
  }
})
export class ResultsComponent {

  @Output() public restartedQuiz = new EventEmitter<void>();
  @Input() score!: number;
  @Input() length!: number;

  public restart(): void {
    this.restartedQuiz.emit();
  }
}
