import { StanceMotion } from '../../motions/stance_motion';
import { StateBase } from './state_base';
import { StateName } from './state_name';
import { StateType } from './state_type';

export class StanceState extends StateBase {
  readonly state: StateType = StateType.Stand;
  readonly name: StateName = StateName.Stance;
  readonly interruptible: boolean = true;
  async promote() {
    this.motion = new StanceMotion(this.unit);
    await this.motion.start();
  }
}
