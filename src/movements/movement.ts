import { Point } from '../point';

export interface Movement {
  get travelledLengthPercentage(): number;
  move(startPosition: Point, endPosition: Point): Point;
  calculateEndPosition(startPosition: Point): Point;
}
