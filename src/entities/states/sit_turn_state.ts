import { SitTurnMotion } from '../../motions/sit_turn_motion';
import { StateBase } from './state_base';
import { StateName } from './state_name';
import { StateType } from './state_type';

export class SitTurnState extends StateBase {
  readonly state: StateType = StateType.Sit;
  readonly name: StateName = StateName.SitTurn;
  readonly interruptible: boolean = false;
  async promote() {
    this.motion = new SitTurnMotion(this.unit);
    await this.motion.start();
  }
}
