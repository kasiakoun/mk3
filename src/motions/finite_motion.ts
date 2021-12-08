import { Point } from '../point';
import { BaseMotion } from './base_motion';
import { FiniteCondition } from './finite_conditions/finite_condition';

export abstract class FiniteMotion extends BaseMotion {
  protected finiteConditions: FiniteCondition[];

  protected move(start: Point, end: Point, resolve: (value: unknown) => void): Point {
    const calculatedPosition = super.move(start, end, resolve);

    if (!this.finiteConditions || this.finiteConditions.length === 0) {
      throw new Error(`Field finiteConditions is not set in ${this.constructor.name}`);
    }

    const canFinishMotion = this.finiteConditions
      .some(p => p.canFinish(calculatedPosition, end, this.entity));
    if (canFinishMotion) {
      this.timerService.stop();
      resolve(undefined);
    }

    return calculatedPosition;
  }
}
