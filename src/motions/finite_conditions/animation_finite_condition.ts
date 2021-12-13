import { Entity } from '../../entities/entity';
import { Point } from '../../point';
import { FiniteCondition } from './finite_condition';

export class AnimationFiniteCondition implements FiniteCondition {
  canFinish(calculatedPosition: Point, end: Point, entity: Entity): boolean {
    return entity.spriteSheet.animationFinished;
  }
}
