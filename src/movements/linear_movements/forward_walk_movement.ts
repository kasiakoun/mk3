import { LinearMovement } from './linear_movement';

export class ForwardWalkMovement extends LinearMovement {
  constructor(leftDirection: boolean) {
    super(0, leftDirection ? -2.666 : 2.666);
  }
}
