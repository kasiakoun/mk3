import { AnimationName } from '../animations/animation_name';
import { Entity } from '../entities/entity';
import { NoActionMovement } from '../movements/no_action_movement';
import { FiniteConditions } from './finite_conditions/finite_conditions';
import { FiniteMotion } from './finite_motion';

export class SitTurnMotion extends FiniteMotion {
  constructor(entity: Entity,
              private readonly turned: boolean) {
    super(entity,
          AnimationName.SitTurn,
          entity.timerService,
          new NoActionMovement(),
          false);

    this.finiteConditions = [FiniteConditions.animationIsFinished];
  }

  onMotionFinished() {
    this.entity.turned = this.turned;
  }
}
