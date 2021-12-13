import { ThrowWebAction } from '../../actions/throw_web_action';
import { EntityFactory } from '../../factories/entity_factory';
import { container } from '../../inversify.config';
import { ResettableState } from './resettable_state';
import { StateBase } from './state_base';

export class CyraxThrowWebState extends ResettableState {
  async promote() {
    // todo: depend on unit direction
    // todo: replace motion with action in StateBase
    const action = new ThrowWebAction(this.unit);
    await action.execute();
  }
}
