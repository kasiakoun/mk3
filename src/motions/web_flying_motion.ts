import { AnimationName } from '../animations/animation_name';
import { Entity } from '../entities/entity';
import { WebFlyingMovement } from '../movements/linear_movements/web_flying_movement';
import { InfiniteMotion } from './infinite_motion';

export class WebFlyingMotion extends InfiniteMotion {
  constructor(entity: Entity) {
    super(entity,
          AnimationName.Fly,
          entity.timerService,
          new WebFlyingMovement(),
          false);
  }
}
