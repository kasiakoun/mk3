import { Point } from '../point';
import { Movement } from './movement';

export class LinearMovement implements Movement {
  private travelledLength: number = 0;
  private readonly step: number = 3.730;
  private readonly k: number = -0.098;

  get travelledLengthPercentage(): number {
    return 0;
  }

  move(startPosition: Point, endPosition: Point): Point {
    this.travelledLength += this.step;

    const x = this.travelledLength;
    const y = this.k * x;

    return new Point(x + startPosition.x, y + startPosition.y);
  }

  calculateEndPosition(startPosition: Point): Point {
    return startPosition;
  }
}
