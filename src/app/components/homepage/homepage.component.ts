import { Component, OnInit } from '@angular/core';
import { TimerService } from '../../services/timer.service';
import { Timer } from '../../models/timer';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.less']
})
export class HomepageComponent implements OnInit {
  timers: Observable<Timer[]>;

  constructor(private timerService: TimerService) {
  }

  trackByMethod(index: number, timer: Timer): string {
    return timer.id;
  }

  deleteTimer(id: string): void {
    this.timerService.delete(id);
  }

  ngOnInit(): void {
    this.timers = this.timerService.timers
      .pipe(
        map(timers => timers.sort(this.timerSorter)),
        tap(console.log),
      );
  }

  private timerSorter(a: Timer, b: Timer): number {
    return a.getTimeLeft() - b.getTimeLeft() || a.name.localeCompare(b.name);
  }
}
