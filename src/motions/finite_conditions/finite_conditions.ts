import { AnimationFiniteCondition } from './animation_finite_condition';
import { FiniteCondition } from './finite_condition';
import { PositionFiniteCondition } from './position_finite_condition';

export class FiniteConditions {
  static readonly animationIsFinished: FiniteCondition = new AnimationFiniteCondition();
  static readonly endPositionIsReached: FiniteCondition = new PositionFiniteCondition();
}
