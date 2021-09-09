import { Point } from '../../point';
import { Movement } from '../movement';

export abstract class ParabolaMovement implements Movement {
  protected readonly a: number = -0.0357;
  protected readonly b: number = 4.8;
  protected readonly c: number = 0;

  protected readonly stepX: number = 3.2;

  protected travelledLength: number = 0;
  #travelledLengthPercentage: number;

  get travelledLengthPercentage(): number {
    return this.#travelledLengthPercentage;
  }

  protected set travelledLengthPercentage(value: number) {
    this.#travelledLengthPercentage = value;
  }

  protected findHighestRoot(): number {
    const d = this.calculateD();

    const x1 = (-this.b - Math.sqrt(d)) / (2 * this.a);
    const x2 = (-this.b + Math.sqrt(d)) / (2 * this.a);

    const highestX = x1 > x2 ? x1 : x2;

    return highestX;
  }

  private calculateD(): number {
    return (this.b ** 2) - 4 * this.a *  this.c;
  }

  protected calculateY(x: number): number {
    return this.a * (x ** 2) + this.b * x + this.c;
  }

  protected abstract alignPosition(x: number, y: number, start: Point, end: Point): Point;
  abstract move(startPosition: Point, endPosition: Point): Point;
  abstract calculateEndPosition(startPosition: Point): Point;
}
