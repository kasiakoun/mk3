import { CoordinateConverter } from '../../converters/coordinate_converter';
import { Entity } from '../../entities/entity';
import { Unit } from '../../entities/unit';
import { Arena } from '../arena';
import { Camera } from './camera';

export class CameraController {
  private readonly limitByX: number = 20;
  private readonly limitByY: number = 70;

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
    const maxFrameWidth = unit.spriteSheet.currentAnimation.maxFrameWidth;
    const maxFrameHeight = unit.spriteSheet.currentAnimation.maxFrameHeight;

    const leftDelta = this.getLeftDelta(unit.transform.position.x);
    const rightDelta = this.getRightDelta(monitorPosition.x, maxFrameWidth);
    const topDelta = this.getTopDelta(unit.transform.position.y);
    const bottomDelta = this.getBottomDelta(monitorPosition.y, maxFrameHeight);

    let shiftX = 0;
    if (leftDelta < 0) {
      shiftX = -4;
    } else if (rightDelta > 0) {
      shiftX = 4;
    }

    let shiftY = 0;
    if (topDelta < 0) {
      shiftY = -4;
    } else if (bottomDelta > 0) {
      shiftY = 4;
    }

    this.camera.shiftPosition(shiftX, shiftY);
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
