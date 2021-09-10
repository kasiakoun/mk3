import { AnimationName } from '../animations/animation_name';
import { CoordinateConverter } from '../converters/coordinate_converter';
import { Entity } from '../entities/entity';
import { Movement } from '../movements/movement';
import { Point } from '../point';
import { TimerService } from '../timer_service';
import { Motion } from './motion';

export abstract class BaseMotion implements Motion {
  protected isStopped: boolean;

  constructor(protected readonly entity: Entity,
              protected readonly coordinateConverter: CoordinateConverter,
              private readonly animationName: AnimationName,
              protected readonly timerService: TimerService,
              protected readonly movement: Movement) {
  }

  start(): Promise<unknown> {
    this.entity.spriteSheet.setCurrentAnimation(this.animationName, false);

    const startPosition: Point = this.entity.transform.cartesianPosition;
    const endPosition: Point = this.movement.calculateEndPosition(startPosition);

    return new Promise(resolve => this.timerService.start(() => {
      this.move(startPosition, endPosition, resolve);
    }));
  }

  stop() {
    this.isStopped = true;
  }

  protected abstract move(start: Point, end: Point, resolve: (value: unknown) => void): void;

  public alignPositionByOffset() {
    if (!this.entity.spriteSheet.currentFrame) return;

    const transform = this.entity.transform;
    transform.position.x = transform.position.x + this.entity.spriteSheet.currentFrame.offset.x;
    transform.position.y = transform.position.y + this.entity.spriteSheet.currentFrame.offset.y;
  }
}
