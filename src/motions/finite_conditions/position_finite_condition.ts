import { Entity } from '../../entities/entity';
import { Point } from '../../point';
import { FiniteCondition } from './finite_condition';

export class PositionFiniteCondition implements FiniteCondition {
  canFinish(calculatedPosition: Point, end: Point, entity: Entity): boolean {
    return end.x === calculatedPosition.x && end.y === calculatedPosition.y;
  }
}
