import { SpriteSheet } from '../animations/sprite_sheet';
import { CoordinateConverter } from '../converters/coordinate_converter';
import { Observable } from '../observable';
import { Point } from '../point';
import { Transform } from '../transform';

export class Entity {
  readonly #transform: Transform;
  readonly #updated: Observable = new Observable();
  leftDirection: boolean = false;

  get transform(): Transform {
    return this.#transform;
  }

  get updated(): Observable {
    return this.#updated;
  }

  get name(): string {
    return this.spriteSheet.name;
  }

  constructor (readonly spriteSheet: SpriteSheet,
               readonly coordinateConverter: CoordinateConverter,
               cartesianPosition: Point) {
    this.#transform = new Transform();
    this.#transform.cartesianPosition = cartesianPosition;
  }

  setCartesianPosition(cartesianPosition: Point) {
    this.#transform.cartesianPosition = cartesianPosition;
    this.#transform.position = this.coordinateConverter.convertCartesianToScreen(cartesianPosition);
  }
}
