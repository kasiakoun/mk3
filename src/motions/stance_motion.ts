import { AnimationName } from '../animations/animation_name';
import { CoordinateConverter } from '../converters/coordinate_converter';
import { Entity } from '../entities/entity';
import { NoActionMovement } from '../movements/no_action_movement';
import { TimerService } from '../timer_service';
import { InfiniteMotion } from './infinite_motion';

export class StanceMotion extends InfiniteMotion {
  constructor(entity: Entity) {
    super(entity,
          AnimationName.Stance,
          entity.timerService,
          new NoActionMovement(),
          false,
          false);
  }
}
