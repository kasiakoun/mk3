import { Observable } from './observable';
import { TimerService } from './timer_service';
import { injectable } from 'inversify';

@injectable()
export class GameTimer {
  private readonly updatedTime: number = 4;
  private readonly timerService: TimerService = new TimerService(this.updatedTime);
  private passedTime: number = 0;

  readonly updated: Observable<number> = new Observable();

  constructor() {
    this.timerService.start(() => this.onUpdated());
  }

  private onUpdated() {
    this.passedTime += this.updatedTime;
    this.updated.fire(this.passedTime);
  }
}
