import { Observable } from './observable';
import { TimerService } from './timer_service';
import { injectable } from 'inversify';

@injectable()
export class GameTimer {
  private readonly updatedTime: number = 4;
  private readonly startedDate: number;

  readonly updated: Observable<number> = new Observable();

  constructor() {
    this.startedDate = Date.now();
    this.update();
  }

  private update() {
    this.onUpdated();
    setTimeout(() => this.update(), this.updatedTime);
  }

  private onUpdated() {
    const passedTime = Date.now() - this.startedDate;
    this.updated.fire(passedTime);
  }
}
