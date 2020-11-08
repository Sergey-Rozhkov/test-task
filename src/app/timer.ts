export interface ITimer extends ITimerData {
  id: string;
}

export interface ITimerData {
  name: string;
  duration: number;
}
