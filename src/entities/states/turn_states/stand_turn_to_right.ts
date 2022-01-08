import { StateName } from '../state_name';
import { StandTurnState } from './stand_turn_state';

export class StandTurnToRight extends StandTurnState {
  readonly name: StateName = StateName.StandTurnToRight;
  protected turned: boolean = false;
}
