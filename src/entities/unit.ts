import { SpriteSheet } from '../animations/sprite_sheet';
import { MoveEnabler } from '../movements/move_enabler';
import { Point } from '../point';
import { Entity } from './entity';

export abstract class Unit extends Entity {
  private readonly moveEnabler: MoveEnabler;

  constructor(spriteSheet: SpriteSheet,
              cartesianPosition: Point) {
    super(spriteSheet, cartesianPosition);
    this.moveEnabler = new MoveEnabler(this);
  }

  setCartesianPosition(cartesianPosition: Point) {
    const duplicatedCartesianPosition = Object.assign({}, cartesianPosition);
    duplicatedCartesianPosition.x += this.transform.offsetX;

    if (!this.moveEnabler.canMoveByX(duplicatedCartesianPosition.x)) {
      duplicatedCartesianPosition.x = this.transform.cartesianPosition.x;
    }

    super.setCartesianPosition(duplicatedCartesianPosition);
  }
}
