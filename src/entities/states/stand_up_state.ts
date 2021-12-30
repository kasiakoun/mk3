import { StandUpMotion } from '../../motions/stand_up_motion';
import { StateBase } from './state_base';
import { StateName } from './state_name';
import { StateType } from './state_type';

export class StandUpState extends StateBase {
  readonly state: StateType = StateType.Stand;
  readonly name: StateName = StateName.StandUp;
  readonly interruptible: boolean = false;
  async promote() {
    this.motion = new StandUpMotion(this.unit);
    await this.motion.start();
  }
}
