import { SpriteSheet } from '../animations/sprite_sheet';
import { InputEvent } from '../players/input_event';
import { InputState } from '../players/input_state';
import { Point } from '../point';
import { ParabolaJumpState } from './states/parabola_jump_state';
import { StanceState } from './states/stance_state';
import { Transition } from './states/transition';
import { UpwardJumpState } from './states/upward_jump_state';
import { Unit } from './unit';

export class Cyrax extends Unit {
  constructor(spriteSheet: SpriteSheet,
              cartesianPosition: Point) {
    super(spriteSheet, cartesianPosition);

    // init states
    const stance = new StanceState(this);
    stance.startState = stance;
    const parabolaJump = new ParabolaJumpState(this, stance);
    const upwardJump = new UpwardJumpState(this, stance);

    // init transitions
    let downInputEvents = [InputEvent.Upward, InputEvent.Forward];
    const stanceToParabolaState = new InputState(downInputEvents);
    const stanceToParabola = new Transition(stance, parabolaJump, stanceToParabolaState);

    downInputEvents = [InputEvent.Upward];
    const stanceToJumpUpwardState = new InputState(downInputEvents);
    const stanceToJumpUpward = new Transition(stance, upwardJump, stanceToJumpUpwardState);

    stance.transitions.push(stanceToParabola);
    stance.transitions.push(stanceToJumpUpward);

    this.currentState = stance;
    this.currentState.promote();
  }
}
