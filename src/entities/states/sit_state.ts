import { SitDownMotion } from '../../motions/sit_down_motion';
import { StateBase } from './state_base';
import { StateName } from './state_name';
import { StateType } from './state_type';

export class SitState extends StateBase {
  readonly state: StateType = StateType.Sit;
  readonly name: StateName = StateName.Sit;
  readonly interruptible: boolean = false;
  async promote() {
    this.motion = new SitDownMotion(this.unit);
    await this.motion.start();
  }
}
