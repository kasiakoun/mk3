import { Point } from '../point';
import { Movement } from './movement';

export class LinearMovement implements Movement {
  private travelledLength: number = 0;
  private readonly step: number = 5.2;

  get travelledLengthPercentage(): number {
    return 0;
  }

  move(startPosition: Point, endPosition: Point): Point {
    this.travelledLength += this.step;

    const x = this.travelledLength;
    const y = 0;

    return new Point(x + startPosition.x, y + startPosition.y);
  }

  calculateEndPosition(startPosition: Point): Point {
    return startPosition;
  }
}
