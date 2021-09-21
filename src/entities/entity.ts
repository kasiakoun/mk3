import { SpriteSheet } from '../animations/sprite_sheet';
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

  constructor (readonly spriteSheet: SpriteSheet,
               cartesianPosition: Point) {
    this.#transform = new Transform();
    this.#transform.cartesianPosition = cartesianPosition;
  }
}
