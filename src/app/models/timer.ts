import { finalize, map, share, takeWhile } from 'rxjs/operators';
import { Observable, Subscription, timer } from 'rxjs';
import * as uuid from 'uuid';
import { ITimerData } from '../interfaces/timer';

export class Timer {
  readonly id: string;
  name: string;
  readonly duration: number;
  readonly counter$: Observable<number>;
  isActive = true;
  private remain;
  private subscription: Subscription;

  constructor(name: string, duration: number, onTimerEnd = (id: string) => undefined) {
    this.id = uuid.v4();
    this.duration = duration;
    this.name = name;
    this.remain = duration;
    this.counter$ = timer(0, 1000)
      .pipe(
        finalize(() => {
          onTimerEnd(this.id);
          this.stop();
        }),
        map(() => this.isActive ? --this.remain : this.remain),
        map(val => val * 1000),
        takeWhile(val => val >= 0),
        share(),
      );

    this.subscription = this.counter$.subscribe();
  }

  getTimeLeft(): number {
    return this.remain;
  }

  stop(): void {
    this.remain = 0;
  }

  update(timerData: ITimerData): void {
    this.name = timerData.name;
    this.remain = timerData.duration;
  }
}
