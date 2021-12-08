import { AnimationName } from '../animations/animation_name';
import { CoordinateConverter } from '../converters/coordinate_converter';
import { Entity } from '../entities/entity';
import { UpwardMovement } from '../movements/upward_movement';
import { TimerService } from '../timer_service';
import { FiniteMotion } from './finite_motion';

export class UpwardMotion extends FiniteMotion {
  constructor(entity: Entity) {
    super(entity,
          AnimationName.JumpUpward,
          entity.timerService,
          new UpwardMovement(),
          false);
  }
}
