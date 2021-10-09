import { inject, injectable } from 'inversify';
import { ArenaView } from '../arenas/common/arena_view';
import { Point } from '../point';

@injectable()
export class CoordinateConverter {
  constructor (private readonly arenaView: ArenaView) {}

  convertCartesianToScreen(caresianPoint: Point): Point {
    const screenX = caresianPoint.x;
    const screenY = -caresianPoint.y + this.arenaView.height;

    return new Point(screenX, screenY);
  }
}
