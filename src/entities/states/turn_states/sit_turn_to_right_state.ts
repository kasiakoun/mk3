import { StateName } from '../state_name';
import { SitTurnState } from './sit_turn_state';

export class SitTurnToRightState extends SitTurnState {
  readonly name: StateName = StateName.SitTurnToRight;
  protected turned: boolean = false;
}
