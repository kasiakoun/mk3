import { StandTurnMotion } from '../../motions/stand_turn_motion';
import { StateBase } from './state_base';
import { StateName } from './state_name';

export class StandTurnState extends StateBase {
  readonly name: StateName = StateName.StandTurn;
  readonly interruptible: boolean = false;
  async promote() {
    this.motion = new StandTurnMotion(this.unit);
    await this.motion.start();
  }
}
