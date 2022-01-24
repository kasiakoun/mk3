import { ForwardParabolaMotion } from '../../motions/forward_parabola_motion';
import { StateBase } from './state_base';
import { StateName } from './state_name';
import { StateType } from './state_type';

export class ForwardParabolaJumpState extends StateBase {
  readonly state: StateType = StateType.Fly;
  readonly name: StateName = StateName.ParabolaJump;
  readonly interruptible: boolean = false;
  async promote() {
    this.motion = new ForwardParabolaMotion(this.unit);
    await this.motion.start();
  }
}
