import { AnimationName } from '../animations/animation_name';
import { Frame } from '../animations/frame';
import { CoordinateConverter } from '../converters/coordinate_converter';
import { Entity } from '../entities/entity';
import { Movement } from '../movements/movement';
import { ParabolaMovement } from '../movements/parabola_movement';
import { Point } from '../point';
import { TimerService } from '../timer_service';

export class ParabolaMotion {
  private readonly animationName: AnimationName = AnimationName.ParabolaJump;
  private readonly timerService: TimerService = new TimerService();
  private readonly movement: Movement = new ParabolaMovement();

  constructor(private readonly entity: Entity,
              private readonly coordinateConverter: CoordinateConverter) {
  }

  start() {
    this.entity.spriteSheet.setCurrentAnimation(this.animationName);

    const startPosition: Point = this.entity.transform.cartesianPosition;
    const endPosition: Point = this.movement.calculateEndPosition(startPosition);

    const promise = new Promise(resolve => this.timerService.start(() => {
      this.move(startPosition, endPosition, resolve);
    }));
  }

  private move(startPosition: Point, endPosition: Point, resolve: (value: unknown) => void) {
    const calculatedPosition = this.movement.move(startPosition, endPosition);

    this.setCurrentFrameIfPossible(this.movement.travelledLengthPercentage);

    const transform = this.entity.transform;
    transform.cartesianPosition = calculatedPosition;
    transform.position = this.coordinateConverter.convertCartesianToScreen(calculatedPosition);

    this.alignPositionByCenter();

    this.entity.updated.fire();
    if (endPosition.x === calculatedPosition.x &&
        endPosition.y === calculatedPosition.y) {
      this.timerService.stop();
      resolve(undefined);
    }
  }

  private setCurrentFrameIfPossible(travelledLengthPercentage: number) {
    const spriteSheet = this.entity.spriteSheet;
    const partFramesLength = travelledLengthPercentage * spriteSheet.currentAnimation.frames.length;
    const frameIndex = Math.floor(partFramesLength) - 1;
    if (frameIndex >= 0) spriteSheet.setCurrentFrameByIndex(frameIndex);
  }

  private alignPositionByCenter() {
    const transform = this.entity.transform;
    transform.position.x = transform.position.x - this.entity.spriteSheet.currentFrame.width / 2;
    transform.position.y = transform.position.y - this.entity.spriteSheet.currentFrame.height / 2;
  }
}
