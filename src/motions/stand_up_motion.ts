import { AnimationName } from '../animations/animation_name';
import { Entity } from '../entities/entity';
import { NoActionMovement } from '../movements/no_action_movement';
import { FiniteConditions } from './finite_conditions/finite_conditions';
import { FiniteMotion } from './finite_motion';

export class StandUpMotion extends FiniteMotion {
  constructor(entity: Entity) {
    super(entity,
          AnimationName.Sit,
          entity.timerService,
          new NoActionMovement(),
          true);
    this.finiteConditions = [FiniteConditions.animationIsFinished];
  }
}
