import { BackwardWalkMotion } from '../../motions/backward_walk_motion';
import { StateBase } from './state_base';
import { StateName } from './state_name';
import { StateType } from './state_type';

export class BackwardWalkState extends StateBase {
  readonly state: StateType = StateType.Stand;
  readonly name: StateName = StateName.BackwardWalk;
  readonly interruptible: boolean = true;
  async promote() {
    this.motion = new BackwardWalkMotion(this.unit);
    await this.motion.start();
  }
}
