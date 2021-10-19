import { SpriteSheet } from '../animations/sprite_sheet';
import { CoordinateConverter } from '../converters/coordinate_converter';
import { container } from '../inversify.config';
import { MoveEnabler } from '../movements/move_enabler';
import { Observable } from '../observable';
import { Point } from '../point';
import { Transform } from '../transform';

export class Entity {
  protected readonly coordinateConverter: CoordinateConverter;

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
               cartesianPosition: Point) {
    this.coordinateConverter = container.get<CoordinateConverter>(nameof<CoordinateConverter>());
    this.#transform = new Transform();
    this.#transform.cartesianPosition = cartesianPosition;
  }

  setCartesianPosition(cartesianPosition: Point) {
    this.#transform.cartesianPosition = cartesianPosition;
    this.#transform.position = this.coordinateConverter.convertCartesianToScreen(cartesianPosition);
  }
}
