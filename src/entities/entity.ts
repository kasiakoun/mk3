import { SpriteSheet } from '../animations/sprite_sheet';
import { CoordinateConverter } from '../converters/coordinate_converter';
import { container } from '../inversify.config';
import { Observable } from '../observable';
import { Point } from '../point';
import { Rectangle } from '../rectangle';
import { TimerService } from '../timer_service';
import { Transform } from '../transform';
import { StateBase } from './states/state_base';
import { StateMachine } from './states/state_machine';
import { StateName } from './states/state_name';
import { StateType } from './states/state_type';
import { UpdateState } from './update_state';

export class Entity {
  protected readonly coordinateConverter: CoordinateConverter;

  readonly #transform: Transform;
  #stateMachine: StateMachine;
  // #currentState: StateBase;

  readonly timerService: TimerService = new TimerService();
  readonly updated: Observable<Entity, UpdateState> = new Observable();

  turned: boolean = false;

  get transform(): Transform {
    return this.#transform;
  }

  get name(): string {
    return this.spriteSheet.name;
  }

  get stateMachine(): StateMachine {
    return this.#stateMachine;
  }

  protected set stateMachine(stateMachine: StateMachine) {
    this.#stateMachine = stateMachine;
  }

  constructor (readonly spriteSheet: SpriteSheet,
               cartesianPosition: Point) {
    this.coordinateConverter = container.get<CoordinateConverter>(nameof<CoordinateConverter>());
    this.#transform = new Transform();
    this.transform.cartesianPosition = cartesianPosition;
  }

  setCartesianPosition(cartesianPosition: Point) {
    this.transform.cartesianPosition = cartesianPosition;
    this.transform.position = this.coordinateConverter.convertCartesianToScreen(cartesianPosition);
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

  async turn(turned: boolean) {
    let stateName: StateName;
    if (this.stateMachine.currentState.state === StateType.Stand ||
        this.stateMachine.currentState.state === StateType.Fly) {
      stateName = turned
        ? StateName.StandTurnToLeft
        : StateName.StandTurnToRight;
    } else if (this.stateMachine.currentState.state === StateType.Sit) {
      stateName = turned
        ? StateName.SitTurnToLeft
        : StateName.SitTurnToRight;
    }

    const state = this.stateMachine.states.find(p => p.name === stateName);

    if (this.stateMachine.statesQueue.some(p => p === state) ||
        this.stateMachine.currentState === state) return;

    console.log(`turned: ${turned}`);

    await this.stateMachine.queueUpState(state!);
  }
}
