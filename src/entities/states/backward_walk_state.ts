import { BackwardWalkMotion } from '../../motions/backward_walk_motion';
import { StateBase } from './state_base';

export class BackwardWalkState extends StateBase {
  async promote() {
    this.motion = new BackwardWalkMotion(this.unit);
    await this.motion.start();
  }
}
