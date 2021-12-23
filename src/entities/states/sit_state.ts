import { SitDownMotion } from '../../motions/sit_down_motion';
import { StateBase } from './state_base';

export class SitState extends StateBase {
  async promote() {
    this.motion = new SitDownMotion(this.unit);
    await this.motion.start();
  }
}
