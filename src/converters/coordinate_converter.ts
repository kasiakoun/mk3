import { inject, injectable } from 'inversify';
import { Game } from '../game';
import { Point } from '../point';

@injectable()
export class CoordinateConverter {
  constructor (
    @inject(nameof<Game>()) private readonly game: Game) {
  }

  convertCartesianToScreen(caresianPoint: Point): Point {
    const screenX = caresianPoint.x;
    const screenY = -caresianPoint.y + this.game.arenaHeight;

    return new Point(screenX, screenY);
  }
}
