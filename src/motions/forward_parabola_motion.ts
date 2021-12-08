import { AnimationName } from '../animations/animation_name';
import { Entity } from '../entities/entity';
// tslint:disable-next-line:max-line-length
import { BackwardParabolaMovement } from '../movements/parabola_movement/backward_parabola_movement';
import { ForwardParabolaMovement } from '../movements/parabola_movement/forward_parabola_movement';
import { FiniteConditions } from './finite_conditions/finite_conditions';
import { FiniteMotion } from './finite_motion';

export class ForwardParabolaMotion extends FiniteMotion {
  constructor(entity: Entity) {
    const animation = entity.leftDirection
      ? new BackwardParabolaMovement()
      : new ForwardParabolaMovement();
    const isReverseAnimation = entity.leftDirection;
    super(entity,
          AnimationName.ParabolaJump,
          entity.timerService,
          animation,
          isReverseAnimation);

    this.finiteConditions = [FiniteConditions.endPositionIsReached];
  }
}
