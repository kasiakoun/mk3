import { ForwardParabolaMotion } from '../../motions/forward_parabola_motion';
import { StateBase } from './state_base';
import { StateName } from './state_name';

export class ParabolaJumpState extends StateBase {
  readonly name: StateName = StateName.ParabolaJump;
  readonly interruptible: boolean = false;
  async promote() {
    // todo: depend on unit direction
    this.motion = new ForwardParabolaMotion(this.unit);
    await this.motion.start();
  }
}
