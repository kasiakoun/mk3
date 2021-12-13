import { StanceMotion } from '../../motions/stance_motion';
import { StateBase } from './state_base';

export class StanceState extends StateBase {
  async promote() {
    this.motion = new StanceMotion(this.unit);
    await this.motion.start();
  }
}
