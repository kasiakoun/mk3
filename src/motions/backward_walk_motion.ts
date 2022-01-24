import { AnimationName } from '../animations/animation_name';
import { Entity } from '../entities/entity';
import { BackwardWalkMovement } from '../movements/linear_movements/backward_walk_movement';
import { ForwardWalkMovement } from '../movements/linear_movements/forward_walk_movement';
import { InfiniteMotion } from './infinite_motion';

export class BackwardWalkMotion extends InfiniteMotion {
  constructor(entity: Entity) {
    const movement = new BackwardWalkMovement(entity.turned);
    super(entity,
          AnimationName.Walk,
          entity.timerService,
          movement,
          true);
  }
}
