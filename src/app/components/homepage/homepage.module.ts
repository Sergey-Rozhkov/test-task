import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { TimerModule } from '../timer/timer.module';

@NgModule({
  declarations: [HomepageComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    TimerModule,
  ]
})
export class HomepageModule {
}
