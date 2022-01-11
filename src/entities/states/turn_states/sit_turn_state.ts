import { SitTurnMotion } from '../../../motions/sit_turn_motion';
import { StateBase } from '../state_base';
import { StateType } from '../state_type';

export abstract class SitTurnState extends StateBase {
  readonly state: StateType = StateType.Sit;
  readonly interruptible: boolean = false;

  protected abstract turned: boolean;
  async promote() {
    this.motion = new SitTurnMotion(this.unit, this.turned);
    await this.motion.start();
  }
}
