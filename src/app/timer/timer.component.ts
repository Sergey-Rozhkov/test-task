import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITimer } from '../timer';
import { Observable, timer } from 'rxjs';
import { filter, finalize, map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.less']
})
export class TimerComponent implements OnInit {
  @Input() timer: ITimer;
  @Output() done = new EventEmitter<void>();
  countdown: number;
  isPaused = false;
  private duration: number;
  private stream$: Observable<number>;

  toggleTimer(): void {
    this.isPaused = !this.isPaused;
  }

  ngOnInit(): void {
    const interval = 1000;
    this.duration = this.timer.duration * interval;

    this.stream$ = timer(0, interval)
      .pipe(
        finalize(() => this.removeTimer()),
        takeUntil(timer(this.duration + interval)),
        filter(() => !this.isPaused),
        map(value => this.duration - value * interval),
      );

    this.stream$.subscribe(value => this.countdown = value);
  }

  removeTimer(): void {
    if ((this.countdown > 0) && !confirm('Are your sure want to delete active timer ?')) {
      return;
    }

    this.done.emit();
  }
}
