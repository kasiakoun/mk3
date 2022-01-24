import { injectable } from 'inversify';
import { Entity } from '../entity';

@injectable()
export class TurnResolver {
  private readonly lastTurning: Map<Entity, boolean> = new Map();

  turnUnit(unit: Entity, turnState: boolean) {
    const lastTurnState = this.lastTurning.get(unit);
    if (this.lastTurning.has(unit) && lastTurnState !== unit.turned) return;

    this.lastTurning.set(unit, turnState);
    unit.turn(turnState);
  }
}
