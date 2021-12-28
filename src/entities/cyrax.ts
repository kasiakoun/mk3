import { SpriteSheet } from '../animations/sprite_sheet';
import { InputEvent } from '../players/input_event';
import { InputEventClick } from '../players/input_event_click';
import { InputEventType } from '../players/input_event_type';
import { InputState } from '../players/input_state';
import { TransitionInputState } from '../players/transition_input_state';
import { Point } from '../point';
import { CyraxThrowWebState } from './states/cyrax_throw_web_state';
import { ParabolaJumpState } from './states/parabola_jump_state';
import { StanceState } from './states/stance_state';
import { Transition } from './states/transition';
import { UpwardJumpState } from './states/upward_jump_state';
import { ForwardWalkState } from './states/forward_walk_state';
import { Unit } from './unit';
import { BackwardWalkState } from './states/backward_walk_state';
import { SitState } from './states/sit_state';
import { StandUpState } from './states/stand_up_state';
import { StateMachine } from './states/state_machine';

export class Cyrax extends Unit {
  constructor(spriteSheet: SpriteSheet,
              cartesianPosition: Point) {
    super(spriteSheet, cartesianPosition);

    // init states
    const stance = new StanceState(this);
    stance.startState = stance;
    const parabolaJump = new ParabolaJumpState(this, stance);
    const upwardJump = new UpwardJumpState(this, stance);
    const forwardWalk = new ForwardWalkState(this, stance);
    const backwardWalk = new BackwardWalkState(this, stance);
    const throwWeb = new CyraxThrowWebState(this, stance);
    const sit = new SitState(this, stance);
    const standUp = new StandUpState(this, stance);
    const states = [stance,
      parabolaJump,
      upwardJump,
      forwardWalk,
      backwardWalk,
      throwWeb,
      sit,
      standUp];
    this.stateMachine = new StateMachine(states);

    let downInputEvents: InputEvent[];
    let upInputEvents: InputEvent[];
    let fastClicks: InputEvent[];

    // init transitions
    downInputEvents = [InputEvent.Upward, InputEvent.Forward];
    const stanceToParabolaState = new TransitionInputState(downInputEvents);
    const stanceToParabola = new Transition(stance, parabolaJump, stanceToParabolaState);

    downInputEvents = [InputEvent.Upward];
    const stanceToJumpUpwardState = new TransitionInputState(downInputEvents);
    const stanceToJumpUpward = new Transition(stance, upwardJump, stanceToJumpUpwardState);

    downInputEvents = [InputEvent.Upward, InputEvent.Forward];
    upInputEvents = [];
    fastClicks = [];
    const forwardWalkToParabolaState = new TransitionInputState(downInputEvents,
                                                                upInputEvents,
                                                                fastClicks);
    const forwardWalkToParabola = new Transition(forwardWalk,
                                                 parabolaJump,
                                                 forwardWalkToParabolaState);
    forwardWalk.transitions.push(forwardWalkToParabola);

    downInputEvents = [];
    upInputEvents = [InputEvent.Forward];
    fastClicks = [];
    const forwardWalkToStanceState = new TransitionInputState(downInputEvents,
                                                              upInputEvents,
                                                              fastClicks);
    const forwardWalkToStance = new Transition(forwardWalk,
                                               stance,
                                               forwardWalkToStanceState);
    forwardWalk.transitions.push(forwardWalkToStance);

    downInputEvents = [InputEvent.Forward];
    upInputEvents = [];
    fastClicks = [];
    const stanceToForwardWalkState = new TransitionInputState(downInputEvents,
                                                              upInputEvents,
                                                              fastClicks);
    const stanceToForwardWalk = new Transition(stance, forwardWalk, stanceToForwardWalkState);

    downInputEvents = [];
    upInputEvents = [InputEvent.Backward];
    fastClicks = [];
    const backwardWalkToStanceState = new TransitionInputState(downInputEvents,
                                                               upInputEvents,
                                                               fastClicks);
    const backwardWalkToStance = new Transition(backwardWalk,
                                                stance,
                                                backwardWalkToStanceState);
    backwardWalk.transitions.push(backwardWalkToStance);

    downInputEvents = [InputEvent.Backward];
    upInputEvents = [];
    fastClicks = [];
    const stanceToBackwardWalkState = new TransitionInputState(downInputEvents,
                                                               upInputEvents,
                                                               fastClicks);
    const stanceToBackwardWalk = new Transition(stance, backwardWalk, stanceToBackwardWalkState);

    downInputEvents = [];
    upInputEvents = [];
    fastClicks = [InputEvent.Backward, InputEvent.Backward];
    const stanceToThrowWebState = new TransitionInputState(downInputEvents,
                                                           upInputEvents,
                                                           fastClicks,
                                                           InputEvent.Lowkick,
                                                           InputEventType.Down);
    const stanceToThrowWeb = new Transition(stance, throwWeb, stanceToThrowWebState);

    downInputEvents = [InputEvent.Downward];
    upInputEvents = [];
    fastClicks = [];
    const stanceToSitState = new TransitionInputState(downInputEvents,
                                                      upInputEvents,
                                                      fastClicks);
    const stanceToSit = new Transition(stance, sit, stanceToSitState);

    downInputEvents = [];
    upInputEvents = [InputEvent.Downward];
    fastClicks = [];
    const sitToStandUpState = new TransitionInputState(downInputEvents,
                                                       upInputEvents,
                                                       fastClicks);
    const sitToStandUp = new Transition(sit, standUp, sitToStandUpState);
    sit.transitions.push(sitToStandUp);

    stance.transitions.push(stanceToThrowWeb);
    stance.transitions.push(stanceToParabola);
    stance.transitions.push(stanceToJumpUpward);
    stance.transitions.push(stanceToForwardWalk);
    stance.transitions.push(stanceToBackwardWalk);
    stance.transitions.push(stanceToSit);

    // this.currentState = stance;
    // this.currentState.promote();
    this.stateMachine.promote(stance);
  }
}
