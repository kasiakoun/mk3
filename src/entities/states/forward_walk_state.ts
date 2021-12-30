import { ForwardWalkMotion } from '../../motions/forward_walk_motion';
import { StateBase } from './state_base';
import { StateName } from './state_name';
import { StateType } from './state_type';

export class ForwardWalkState extends StateBase {
  readonly state: StateType = StateType.Stand;
  readonly name: StateName = StateName.ForwardWalk;
  readonly interruptible: boolean = true;
  async promote() {
    this.motion = new ForwardWalkMotion(this.unit);
    await this.motion.start();
  }
}
