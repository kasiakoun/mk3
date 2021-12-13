import { Entity } from '../../entities/entity';
import { Point } from '../../point';

export interface FiniteCondition {
  canFinish(calculatedPosition: Point, end: Point, entity: Entity): boolean;
}
