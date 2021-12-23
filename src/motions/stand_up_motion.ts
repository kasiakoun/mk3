import { AnimationName } from '../animations/animation_name';
import { Entity } from '../entities/entity';
import { NoActionMovement } from '../movements/no_action_movement';
import { InfiniteMotion } from './infinite_motion';

export class StandUpMotion extends InfiniteMotion {
  constructor(entity: Entity) {
    super(entity,
          AnimationName.Sit,
          entity.timerService,
          new NoActionMovement(),
          true);
  }
}
