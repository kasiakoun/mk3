import { ForwardParabolaMotion } from '../../motions/forward_parabola_motion';
import { StateBase } from './state_base';

export class ParabolaJumpState extends StateBase {
  async promote() {
    // todo: depend on unit direction
    this.motion = new ForwardParabolaMotion(this.unit);
    await this.motion.start();
  }
}
