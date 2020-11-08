import { Injectable } from '@angular/core';
import { ITimerData } from '../interfaces/timer';
import { Timer } from '../models/timer';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private timers$: BehaviorSubject<Timer[]> = new BehaviorSubject<Timer[]>([]);

  constructor(private matSnackBar: MatSnackBar) {}

  get timers(): Observable<Timer[]> {
    return this.timers$.asObservable();
  }

  create(data: ITimerData): void {
    const timer = new Timer(
      data.name,
      data.duration,
      (id) => {
        this.matSnackBar.open(`Timer is over: ${data.name}`, 'close', { verticalPosition: 'top' });
        this.delete(id);
      }
    );

    this.timers$.next([...this.timers$.getValue(), timer]);
  }

  update(timerId: string, timerData: ITimerData): void {
    const timer = this.getById(timerId);

    timer.update(timerData);
  }

  delete(timerId: string): void {
    const timer = this.getById(timerId);
    timer.stop();

    this.timers$.next(this.timers$.getValue().filter(el => el.id !== timerId));
  }

  getById(timerId: string): Timer {
    return this.timers$.getValue().find(timer => timer.id === timerId);
  }

}
