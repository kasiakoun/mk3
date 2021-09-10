import { SpriteSheet } from '../animations/sprite_sheet';
import { Observable } from '../observable';
import { Point } from '../point';
import { Transform } from '../transform';

export class Entity {
  readonly #transform: Transform;
  readonly #updated: Observable = new Observable();

  get transform(): Transform {
    return this.#transform;
  }

  get updated(): Observable {
    return this.#updated;
  }

  // todo: TEMP consturctor
  constructor (readonly spriteSheet: SpriteSheet) {
    this.#transform = new Transform();
    this.#transform.cartesianPosition = new Point(400, 50);
  }
}
