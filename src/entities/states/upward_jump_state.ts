import { UpwardMotion } from '../../motions/upward_motion';
import { StateBase } from './state_base';

export class UpwardJumpState extends StateBase {
  async promote() {
    this.motion = new UpwardMotion(this.unit);
    await this.motion.start();
  }
}
