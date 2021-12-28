import { StanceMotion } from '../../motions/stance_motion';
import { StateBase } from './state_base';
import { StateName } from './state_name';

export class StanceState extends StateBase {
  readonly name: StateName = StateName.Stance;
  readonly interruptible: boolean = true;
  async promote() {
    this.motion = new StanceMotion(this.unit);
    await this.motion.start();
  }
}
