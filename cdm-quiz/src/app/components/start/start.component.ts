import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
  host: {
    class: "start"
  }
})
export class StartComponent {

  @Output() public startedQuiz = new EventEmitter<void>();

  public startQuiz(): void {
    this.startedQuiz.emit();
  }
}
