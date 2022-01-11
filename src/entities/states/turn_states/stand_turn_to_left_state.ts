import { StateName } from '../state_name';
import { StandTurnState } from './stand_turn_state';

export class StandTurnToLeftState extends StandTurnState {
  readonly name: StateName = StateName.StandTurnToLeft;
  protected turned: boolean = true;
}
