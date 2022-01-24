import { LinearMovement } from './linear_movement';

export class BackwardWalkMovement extends LinearMovement {
  constructor(leftDirection: boolean) {
    super(0, leftDirection ? 2 : -2);
  }
}
