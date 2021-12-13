import { Point } from './point';

export class Transform {
  cartesianPosition: Point;
  position: Point = new Point(0, 0);
  offsetX: number = 0;
}
