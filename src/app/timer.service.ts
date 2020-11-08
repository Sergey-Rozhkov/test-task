import { Injectable } from '@angular/core';
import { ITimer } from './timer';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private data: ITimer[] = [];

  create(timer: ITimer): void {
    this.data.push({id: uuid.v4(), ...timer});
  }

  getAll(): ITimer[] {
    return this.data;
  }

  delete(id: string): void {
    this.data = this.data.filter(el => el.id !== id);
  }
}
