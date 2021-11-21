import { Point } from '../../point';
import { Movement } from '../movement';

export abstract class LinearMovement implements Movement {
  private travelledLength: number = 0;

  get travelledLengthPercentage(): number {
    return 0;
  }

  constructor(private readonly k: number,
              private readonly step: number) {}

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
