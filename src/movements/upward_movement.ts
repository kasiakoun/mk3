import { Point } from '../point';
import { Movement } from './movement';

export class UpwardMovement implements Movement {
  private readonly y0: number = 0;
  private readonly v0: number = 48;
  private readonly a: number = 9.8;

  private readonly stepTime: number = 0.19;

  private passedTime: number = 0;

  get travelledLengthPercentage(): number {
    const endTime = this.calculateEndTime();
    return this.passedTime / endTime;
  }

  move(startPosition: Point, endPosition: Point): Point {
    this.passedTime += this.stepTime;
    const t: number = this.passedTime;

    const x: number = 0;
    const y: number = this.calculateY(t);

    const alignedPosition: Point = this.alignPosition(x, y, startPosition, endPosition);

    return alignedPosition;
  }

  calculateEndPosition(startPosition: Point): Point {
    return new Point(startPosition.x, startPosition.y);
  }

  private calculateEndTime(): number {
    const a = -this.a / 2;
    const d = this.calculateD();

    const t1 = (-this.v0 - Math.sqrt(d)) / (2 * a);
    const t2 = (-this.v0 + Math.sqrt(d)) / (2 * a);

    const highestTime = t1 > t2 ? t1 : t2;
    return highestTime;
  }

  private calculateD(): number {
    return (this.v0 ** 2) - 4 * (-this.a / 2) *  this.y0;
  }

  private calculateY(t: number): number {
    return this.y0 + this.v0 * t - this.a * (t ** 2) / 2;
  }

  private alignPosition(x: number, y: number, startPosition: Point, endPosition: Point): Point {
    let alignedX = x + startPosition.x;
    let alignedY = y + startPosition.y;

    if (alignedX > endPosition.x) alignedX = endPosition.x;
    if (alignedY < endPosition.y) alignedY = endPosition.y;

    return new Point(alignedX, alignedY);
  }
}
