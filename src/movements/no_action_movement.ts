import { Point } from '../point';
import { Movement } from './movement';

export class NoActionMovement implements Movement {
  get travelledLengthPercentage(): number {
    return 0;
  }

  move(startPosition: Point, endPosition: Point): Point {
    return startPosition;
  }

  calculateEndPosition(startPosition: Point): Point {
    return startPosition;
  }
}
