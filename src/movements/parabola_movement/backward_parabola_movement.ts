import { Point } from '../../point';
import { ParabolaMovement } from './parabola_movement';

export class BackwardParabolaMovement extends ParabolaMovement {
  move(startPosition: Point, endPosition: Point): Point {
    const x: number = -this.travelledLength;
    const y: number = this.calculateY(this.travelledLength);

    this.travelledLength += this.stepX;

    const alignedPosition: Point = this.alignPosition(x, y, startPosition, endPosition);
    this.travelledLengthPercentage =
      (startPosition.x - alignedPosition.x) / (startPosition.x - endPosition.x);

    return alignedPosition;
  }

  calculateEndPosition(startPosition: Point): Point {
    const highestX = this.findHighestRoot();

    const endPosition = new Point(-highestX, 0);
    endPosition.x += startPosition.x;
    endPosition.y += startPosition.y;

    return endPosition;
  }

  protected alignPosition(x: number, y: number, startPosition: Point, endPosition: Point): Point {
    let alignedX = x + startPosition.x;
    let alignedY = y + startPosition.y;

    if (alignedX < endPosition.x) alignedX = endPosition.x;
    if (alignedY < endPosition.y) alignedY = endPosition.y;

    return new Point(alignedX, alignedY);
  }
}
