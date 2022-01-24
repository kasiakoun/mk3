import { BackwardParabolaMotion } from '../../motions/backward_parabola_motion';
import { StateBase } from './state_base';
import { StateName } from './state_name';
import { StateType } from './state_type';

export class BackwardParabolaJumpState extends StateBase {
  readonly state: StateType = StateType.Fly;
  readonly name: StateName = StateName.ParabolaJump;
  readonly interruptible: boolean = false;
  async promote() {
    this.motion = new BackwardParabolaMotion(this.unit);
    await this.motion.start();
  }
}
