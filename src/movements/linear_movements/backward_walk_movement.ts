import { LinearMovement } from './linear_movement';

export class BackwardWalkMovement extends LinearMovement {
  constructor() {
    super(0, -2);
  }
}
