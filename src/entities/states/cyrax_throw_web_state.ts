import { ThrowWebAction } from '../../actions/throw_web_action';
import { ResettableState } from './resettable_state';
import { StateName } from './state_name';

export class CyraxThrowWebState extends ResettableState {
  readonly name: StateName = StateName.CyraxThrowWeb;
  readonly interruptible: boolean = false;
  async promote() {
    // todo: depend on unit direction
    // todo: replace motion with action in StateBase
    const action = new ThrowWebAction(this.unit);
    await action.execute();
  }
}
