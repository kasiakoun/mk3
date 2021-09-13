import { Point } from '../point';
import { BaseMotion } from './base_motion';

export abstract class InfiniteMotion extends BaseMotion {
  protected move(startPosition: Point, endPosition: Point, resolve: (value: unknown) => void) {
    const calculatedPosition = this.movement.move(startPosition, endPosition);

    const spriteSheet = this.entity.spriteSheet;
    spriteSheet.moveToNextFrame();

    const transform = this.entity.transform;
    transform.cartesianPosition = calculatedPosition;
    transform.position = this.coordinateConverter.convertCartesianToScreen(calculatedPosition);

    this.alignPositionByDirection();
    this.alignPositionByOffset();

    if (this.isStopped) {
      this.timerService.stop();
      resolve(undefined);
    }

    this.entity.updated.fire();
  }
}
