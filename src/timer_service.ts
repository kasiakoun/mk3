export class TimerService {
  private timer?: NodeJS.Timeout;
  private readonly refreshTimeMs: number = 17;

  start(handler: (...args: any[]) => void) {
    this.timer = setInterval(handler, this.refreshTimeMs);
  }

  stop() {
    if (!this.timer) return;

    clearInterval(this.timer);
    this.timer = undefined;
  }
}
