import { CameraManager } from '../arenas/common/camera_manager';
import { Unit } from '../entities/unit';
import { container } from '../inversify.config';

export class MoveEnabler {
  private readonly cameraManager: CameraManager;
  constructor(private readonly unit: Unit) {
    this.cameraManager = container.get<CameraManager>(nameof<CameraManager>());
  }

  canMoveByX(positionX: number) {
    return this.cameraManager.isAllowChangePositionByX(this.unit, positionX);
  }
}
