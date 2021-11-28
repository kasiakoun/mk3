import { SpriteSheet } from '../animations/sprite_sheet';
import { CoordinateConverter } from '../converters/coordinate_converter';
import { container } from '../inversify.config';
import { Observable } from '../observable';
import { Point } from '../point';
import { Rectangle } from '../rectangle';
import { TimerService } from '../timer_service';
import { Transform } from '../transform';
import { StateBase } from './states/state_base';

export class Entity {
  protected readonly coordinateConverter: CoordinateConverter;

  readonly #transform: Transform;
  #currentState: StateBase;

  readonly timerService: TimerService = new TimerService();
  readonly updated: Observable<Entity> = new Observable();

  leftDirection: boolean = false;

  get transform(): Transform {
    return this.#transform;
  }

  get name(): string {
    return this.spriteSheet.name;
  }

  get currentState(): StateBase {
    return this.#currentState;
  }

  set currentState(value: StateBase) {
    if (this.#currentState === value) return;
    this.#currentState = value;
    const timeNow = Date.now();
    console.log(`currentState: ${value.getName()} time: ${timeNow}`);
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

  getRectangle(): Rectangle {
    const monitorPosition = this.coordinateConverter
      .convertCartesianToScreen(this.transform.cartesianPosition);

    const left = monitorPosition.x;
    const right = left + this.spriteSheet.currentAnimation.maxFrameWidth;
    const top = monitorPosition.y;
    const bottom = top + this.spriteSheet.currentAnimation.maxFrameHeight;

    return new Rectangle(left, top, right, bottom);
  }
}
