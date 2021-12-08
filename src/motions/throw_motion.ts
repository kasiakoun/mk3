import { AnimationName } from '../animations/animation_name';
import { CoordinateConverter } from '../converters/coordinate_converter';
import { Entity } from '../entities/entity';
import { NoActionMovement } from '../movements/no_action_movement';
import { TimerService } from '../timer_service';
import { FiniteMotion } from './finite_motion';

export class ThrowMotion extends FiniteMotion {
  constructor(entity: Entity) {
    super(entity,
          AnimationName.Throw,
          entity.timerService,
          new NoActionMovement(),
          false);
  }
}
