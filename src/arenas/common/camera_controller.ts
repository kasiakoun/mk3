import { CoordinateConverter } from '../../converters/coordinate_converter';
import { Entity } from '../../entities/entity';
import { Unit } from '../../entities/unit';
import { Arena } from '../arena';
import { Camera } from './camera';

export class CameraController {
  private readonly limit: number = 20;

  constructor(private readonly camera: Camera,
              private readonly arena: Arena,
              private readonly coordinateConverter: CoordinateConverter) {
    this.arena.entityAdded.subscribe(p => this.onUnitAdded(p));
  }

  private onUnitAdded(entity: Entity) {
    if (!(entity instanceof Unit)) return;

    entity.updated.subscribe(() => this.onUnitPositionChange(entity));
  }

  private onUnitPositionChange(unit: Unit) {
    const monitorPosition = this.coordinateConverter
      .convertCartesianToScreen(unit.transform.cartesianPosition);
    const leftDelta = this.getLeftDelta(unit.transform.position.x);

    if (leftDelta < 0) {
      this.camera.shiftPosition(-4, 0);
    }

    const maxFrameWidth = unit.spriteSheet.currentAnimation.maxFrameWidth;
    const rightDelta = this.getRightDelta(monitorPosition.x, maxFrameWidth);

    if (rightDelta > 0) {
      this.camera.shiftPosition(4, 0);
    }
  }

  private getLeftDelta(unitPositionX: number): number {
    const leftBorder = this.camera.position.x + this.limit;
    const leftUnit = unitPositionX;

    return leftUnit - leftBorder;
  }

  private getRightDelta(unitPositionX: number, unitWidth: number): number {
    const rightBorder = this.camera.position.x + this.camera.width - this.limit;
    const rightUnit = unitPositionX + unitWidth;

    return rightUnit - rightBorder;
  }
}
