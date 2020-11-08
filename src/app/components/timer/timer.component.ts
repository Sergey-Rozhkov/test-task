import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Timer } from '../../models/timer';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.less']
})
export class TimerComponent {
  @Input() timer: Timer;
  @Output() done = new EventEmitter<void>();

  toggleTimer(): void {
    this.timer.isActive = !this.timer.isActive;
  }

  removeTimer(): void {
    this.done.emit();
  }
}
