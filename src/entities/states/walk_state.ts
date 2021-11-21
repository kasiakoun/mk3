import { ForwardWalkMotion } from '../../motions/forward_walk_motion';
import { StateBase } from './state_base';

export class WalkState extends StateBase {
  async promote() {
    // todo: depend on unit direction
    // todo: replace motion with action in StateBase
    this.motion = new ForwardWalkMotion(this.unit);
    await this.motion.start();
  }
}
