import { Point } from './point';

export class Transform {
  position: Point;
  width: number;
  height: number;

  constructor(position: Point, width: number, height: number) {
    this.position = position;
    this.width = width;
    this.height = height;
  }
}
