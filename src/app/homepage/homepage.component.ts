import { Component, OnInit } from '@angular/core';
import { TimerService } from '../timer.service';
import { ITimer } from '../timer';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.less']
})
export class HomepageComponent implements OnInit {
  timers: ITimer[] = [];

  constructor(private timerService: TimerService) {
  }

  trackByMethod(index: number, timer: ITimer): string {
    return timer.id;
  }

  removeTimer(id: string): void {
    this.timerService.delete(id);
    this.loadTimers();
  }

  ngOnInit(): void {
    this.loadTimers();
  }

  private loadTimers(): void {
    this.timers = this.timerService.getAll()
      .sort((a, b) => a.duration - b.duration);
  }
}
