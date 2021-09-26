import { Point } from '../point';
import { BaseMotion } from './base_motion';

export abstract class FiniteMotion extends BaseMotion {
  protected move(start: Point, end: Point, resolve: (value: unknown) => void): Point {
    const calculatedPosition = super.move(start, end, resolve);

    if (this.changeByPassedPercetange &&
        end.x === calculatedPosition.x &&
        end.y === calculatedPosition.y) {
      this.timerService.stop();
      resolve(undefined);
    }

    if (this.animationFinished) {
      this.timerService.stop();
      resolve(undefined);
    }

    return calculatedPosition;
  }
}
