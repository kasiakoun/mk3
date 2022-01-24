import { StateName } from '../state_name';
import { SitTurnState } from './sit_turn_state';

export class SitTurnToLeftState extends SitTurnState {
  readonly name: StateName = StateName.SitTurnToLeft;
  protected turned: boolean = true;
}
