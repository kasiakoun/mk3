import { AnimationName } from '../animations/animation_name';
import { CoordinateConverter } from '../converters/coordinate_converter';
import { Entity } from '../entities/entity';
import { container } from '../inversify.config';
import { Movement } from '../movements/movement';
import { Point } from '../point';
import { TimerService } from '../timer_service';
import { Motion } from './motion';

export abstract class BaseMotion implements Motion {
  protected readonly coordinateConverter: CoordinateConverter;
  protected isStopped: boolean = false;

  constructor(protected readonly entity: Entity,
              private readonly animationName: AnimationName,
              protected readonly timerService: TimerService,
              protected readonly movement: Movement,
              protected readonly isReverseAnimation: boolean) {
    this.coordinateConverter = container.get<CoordinateConverter>(nameof<CoordinateConverter>());
  }

  start(): Promise<unknown> {
    this.entity.spriteSheet.setCurrentAnimation(this.animationName, this.isReverseAnimation);

    const startPosition: Point = this.entity.transform.cartesianPosition;
    const endPosition: Point = this.movement.calculateEndPosition(startPosition);

    return new Promise(resolve => this.timerService.start(() => {
      this.move(startPosition, endPosition, resolve);
    }));
  }

  stop() {
    this.isStopped = true;
    this.timerService.stop();
  }

  protected move(start: Point, end: Point, resolve: (value: unknown) => void): Point {
    const calculatedPosition = this.movement.move(start, end);

    const spriteSheet = this.entity.spriteSheet;
    spriteSheet.moveToNextFrame();

    this.entity.setCartesianPosition(calculatedPosition);

    this.alignPositionByDirection();
    this.alignPositionByOffset();

    if (this.isStopped) {
      this.timerService.stop();
      resolve(undefined);
    }

    this.entity.updated.fire(this.entity);

    return calculatedPosition;
  }

  protected alignPositionByOffset() {
    if (!this.entity.spriteSheet.currentFrame) return;

    const transform = this.entity.transform;
    const offset = this.entity.spriteSheet.currentFrame.offset;
    transform.position.x += this.entity.turned ? -offset.x : offset.x;
    transform.position.y += offset.y;
  }

  protected alignPositionByDirection() {
    const spriteSheet = this.entity.spriteSheet;
    if (!this.entity.turned) return;

    const rightCorenerOffset = spriteSheet.getRightCornerOffset();

    this.entity.transform.position.x += rightCorenerOffset;
  }
}
