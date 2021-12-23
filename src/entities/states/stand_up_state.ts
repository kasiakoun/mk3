import { StandUpMotion } from '../../motions/stand_up_motion';
import { StateBase } from './state_base';

export class StandUpState extends StateBase {
  async promote() {
    this.motion = new StandUpMotion(this.unit);
    await this.motion.start();
  }
}
