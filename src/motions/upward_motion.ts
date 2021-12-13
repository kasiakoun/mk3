import { AnimationName } from '../animations/animation_name';
import { Entity } from '../entities/entity';
import { UpwardMovement } from '../movements/upward_movement';
import { FiniteConditions } from './finite_conditions/finite_conditions';
import { FiniteMotion } from './finite_motion';

export class UpwardMotion extends FiniteMotion {
  constructor(entity: Entity) {
    super(entity,
          AnimationName.JumpUpward,
          entity.timerService,
          new UpwardMovement(),
          false);

    this.finiteConditions = [FiniteConditions.endPositionIsReached];
  }
}
