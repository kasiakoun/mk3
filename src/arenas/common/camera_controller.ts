import { CoordinateConverter } from '../../converters/coordinate_converter';
import { Delta } from '../../delta';
import { Entity } from '../../entities/entity';
import { Unit } from '../../entities/unit';
import { TimerService } from '../../timer_service';
import { Arena } from '../arena';
import { Camera } from './camera';

export class CameraController {
  private readonly limitByX: number = 20;
  private readonly limitByY: number = 70;
  private readonly stepShift: number = 4;

  private readonly units: Unit[] = [];
  private readonly timer: TimerService = new TimerService();

  constructor(private readonly camera: Camera,
              private readonly arena: Arena,
              private readonly coordinateConverter: CoordinateConverter) {
    this.arena.entityAdded.subscribe(p => this.onUnitAdded(p));
    this.timer.start(() => this.update());
  }

  private onUnitAdded(entity: Entity) {
    if (!(entity instanceof Unit)) return;

    this.units.push(entity);
  }

  private update() {
    if (this.units.length === 0) return;

    const firstUnitDelta = this.getUnityDelta(this.units[0]);
    const maxDelta: Delta = Object.assign({}, firstUnitDelta);

    for (const unit of this.units) {
      const unitDelta = this.getUnityDelta(unit);
      if (maxDelta.left > unitDelta.left) maxDelta.left = unitDelta.left;
      if (maxDelta.top > unitDelta.top) maxDelta.top = unitDelta.top;
      if (maxDelta.right < unitDelta.right) maxDelta.right = unitDelta.right;
      if (maxDelta.bottom < unitDelta.bottom) maxDelta.bottom = unitDelta.bottom;
    }

    const shiftX = this.getShiftX(maxDelta);
    const shiftY = this.getShiftY(maxDelta);

    this.camera.shiftPosition(shiftX, shiftY);
  }

  private getShiftX(delta: Delta) {
    if (delta.left < 0 && delta.right > 0) return 0;
    if (delta.left < 0) return -this.stepShift;
    if (delta.right > 0) return this.stepShift;

    return 0;
  }

  private getShiftY(delta: Delta) {
    // if (delta.top < 0 && delta.bottom > 0) return 0;
    if (delta.top < 0) return -this.stepShift;
    if (delta.bottom > 0) return this.stepShift;

    return 0;
  }

  private getUnityDelta(unit: Unit) {
    const monitorPosition = this.coordinateConverter
      .convertCartesianToScreen(unit.transform.cartesianPosition);
    const maxFrameWidth = unit.spriteSheet.currentAnimation.maxFrameWidth;
    const maxFrameHeight = unit.spriteSheet.currentAnimation.maxFrameHeight;

    const leftDelta = this.getLeftDelta(unit.transform.position.x);
    const rightDelta = this.getRightDelta(monitorPosition.x, maxFrameWidth);
    const topDelta = this.getTopDelta(unit.transform.position.y);
    const bottomDelta = this.getBottomDelta(monitorPosition.y, maxFrameHeight);

    return new Delta(leftDelta, topDelta, rightDelta, bottomDelta);
  }

  private getLeftDelta(unitPositionX: number): number {
    const leftBorder = this.camera.position.x + this.limitByX;
    const leftUnit = unitPositionX;

    return leftUnit - leftBorder;
  }

  private getRightDelta(unitPositionX: number, unitWidth: number): number {
    const rightBorder = this.camera.position.x + this.camera.width - this.limitByX;
    const rightUnit = unitPositionX + unitWidth;

    return rightUnit - rightBorder;
  }

  private getTopDelta(unitPositionY: number): number {
    const topBorder = this.camera.position.y + this.limitByY;
    const topUnit = unitPositionY;

    return topUnit - topBorder;
  }

  private getBottomDelta(unitPositionY: number, unitHeight: number): number {
    const bottomBorder = this.camera.position.y + this.camera.height - this.limitByY;
    const bottomUnit = unitPositionY + unitHeight;

    return bottomUnit - bottomBorder;
  }
}
