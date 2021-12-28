import { UpwardMotion } from '../../motions/upward_motion';
import { StateBase } from './state_base';
import { StateName } from './state_name';

export class UpwardJumpState extends StateBase {
  readonly name: StateName = StateName.UpwardJump;
  readonly interruptible: boolean = false;
  async promote() {
    this.motion = new UpwardMotion(this.unit);
    await this.motion.start();
  }
}
