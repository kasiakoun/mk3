import { StateName } from '../state_name';
import { StandTurnState } from './stand_turn_state';

export class StandTurnToRightState extends StandTurnState {
  readonly name: StateName = StateName.StandTurnToRight;
  protected turned: boolean = false;
}
