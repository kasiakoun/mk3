import { ForwardWalkMotion } from '../../motions/forward_walk_motion';
import { StateBase } from './state_base';

export class ForwardWalkState extends StateBase {
  async promote() {
    this.motion = new ForwardWalkMotion(this.unit);
    await this.motion.start();
  }
}
