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
import { SitDownState } from './states/sit_down_state';
import { StandUpState } from './states/stand_up_state';
import { StateMachine } from './states/state_machine';
import { StandTurnState } from './states/turn_states/stand_turn_state';
import { StandTurnToRight } from './states/turn_states/stand_turn_to_right';
import { StandTurnToLeft } from './states/turn_states/stand_turn_to_left';

export class Cyrax extends Unit {
  constructor(spriteSheet: SpriteSheet,
              cartesianPosition: Point) {
    super(spriteSheet, cartesianPosition);

    // init states
    const stance = new StanceState(this);
    const parabolaJump = new ParabolaJumpState(this);
    const upwardJump = new UpwardJumpState(this);
    const forwardWalk = new ForwardWalkState(this);
    const backwardWalk = new BackwardWalkState(this);
    const throwWeb = new CyraxThrowWebState(this);
    const sitDown = new SitDownState(this);
    const standUp = new StandUpState(this);
    const standTurnToRight = new StandTurnToRight(this);
    const standTurnToLeft = new StandTurnToLeft(this);

    const states = [stance,
      parabolaJump,
      upwardJump,
      forwardWalk,
      backwardWalk,
      throwWeb,
      sitDown,
      standTurnToRight,
      standTurnToLeft,
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
    const stanceToSitDownState = new TransitionInputState(downInputEvents,
                                                          upInputEvents,
                                                          fastClicks);
    const stanceToSitDown = new Transition(stance, sitDown, stanceToSitDownState);

    downInputEvents = [];
    upInputEvents = [InputEvent.Downward];
    fastClicks = [];
    const sitToStandUpState = new TransitionInputState(downInputEvents,
                                                       upInputEvents,
                                                       fastClicks);
    const sitDownToStandUp = new Transition(sitDown, standUp, sitToStandUpState);
    sitDown.transitions.push(sitDownToStandUp);

    stance.transitions.push(stanceToThrowWeb);
    stance.transitions.push(stanceToParabola);
    stance.transitions.push(stanceToJumpUpward);
    stance.transitions.push(stanceToForwardWalk);
    stance.transitions.push(stanceToBackwardWalk);
    stance.transitions.push(stanceToSitDown);

    // this.currentState = stance;
    // this.currentState.promote();
    this.stateMachine.promote(stance);
  }
}
