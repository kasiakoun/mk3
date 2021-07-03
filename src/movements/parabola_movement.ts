import { Point } from '../point';
import { Movement } from './movement';

export class ParabolaMovement implements Movement {
  private readonly a: number = -0.0357;
  private readonly b: number = 4.8;
  private readonly c: number = 0;

  private readonly stepX: number = 3.3;

  private travelledLength: number = 0;
  #travelledLengthPercentage: number;

  get travelledLengthPercentage(): number {
    return this.#travelledLengthPercentage;
  }

  move(startPosition: Point, endPosition: Point): Point {
    const x: number = this.travelledLength;
    const y: number = this.calculateY(this.travelledLength);

    this.travelledLength += this.stepX;

    const alignedPosition: Point = this.alignPosition(x, y, startPosition, endPosition);
    this.#travelledLengthPercentage =
      (alignedPosition.x - startPosition.x) / (endPosition.x - startPosition.x);

    return alignedPosition;
  }

  calculateEndPosition(startPosition: Point): Point {
    const d = this.calculateD();

    const x1 = (-this.b - Math.sqrt(d)) / (2 * this.a);
    const x2 = (-this.b + Math.sqrt(d)) / (2 * this.a);

    const highestX = x1 > x2 ? x1 : x2;

    const endPosition = new Point(highestX, 0);
    endPosition.x += startPosition.x;
    endPosition.y += startPosition.y;

    return endPosition;
  }

  private calculateD(): number {
    return (this.b ** 2) - 4 * this.a *  this.c;
  }

  private alignPosition(x: number, y: number, startPosition: Point, endPosition: Point): Point {
    let alignedX = x + startPosition.x;
    let alignedY = y + startPosition.y;

    if (alignedX > endPosition.x) alignedX = endPosition.x;
    if (alignedY < endPosition.y) alignedY = endPosition.y;

    return new Point(alignedX, alignedY);
  }

  private calculateY(x: number): number {
    return this.a * (x ** 2) + this.b * x + this.c;
  }
}
