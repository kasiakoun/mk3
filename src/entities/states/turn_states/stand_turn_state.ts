import { StandTurnMotion } from '../../../motions/stand_turn_motion';
import { StateBase } from '../state_base';
import { StateType } from '../state_type';

export abstract class StandTurnState extends StateBase {
  readonly state: StateType = StateType.Stand;
  readonly interruptible: boolean = false;

  protected abstract turned: boolean;
  async promote() {
    this.motion = new StandTurnMotion(this.unit, this.turned);
    await this.motion.start();
  }
}
