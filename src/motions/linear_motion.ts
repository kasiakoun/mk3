import { AnimationName } from '../animations/animation_name';
import { CoordinateConverter } from '../converters/coordinate_converter';
import { Entity } from '../entities/entity';
import { LinearMovement } from '../movements/linear_movement';
import { TimerService } from '../timer_service';
import { InfiniteMotion } from './infinite_motion';

export class LinearMotion extends InfiniteMotion {
  constructor(entity: Entity) {
    super(entity,
          AnimationName.Fly,
          // todo: use TimerService from Entity
          new TimerService(),
          new LinearMovement(),
          false,
          false);
  }
}
