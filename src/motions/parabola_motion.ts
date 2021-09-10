import { AnimationName } from '../animations/animation_name';
import { CoordinateConverter } from '../converters/coordinate_converter';
import { Entity } from '../entities/entity';
import { ForwardParabolaMovement } from '../movements/parabola_movement/forward_parabola_movement';
import { TimerService } from '../timer_service';
import { FiniteMotion } from './finite_motion';

export class ParabolaMotion extends FiniteMotion {
  constructor(entity: Entity,
              coordinateConverter: CoordinateConverter) {
    super(entity,
          coordinateConverter,
          AnimationName.ParabolaJump,
          // todo: use TimerService from Entity
          new TimerService(),
          new ForwardParabolaMovement());
  }
}
