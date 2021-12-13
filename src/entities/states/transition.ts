import { InputEvent } from '../../players/input_event';
import { InputEventClick } from '../../players/input_event_click';
import { InputEventType } from '../../players/input_event_type';
import { InputState } from '../../players/input_state';
import { TransitionInputState } from '../../players/transition_input_state';
import { StateBase } from './state_base';

export class Transition {
  constructor(readonly fromState: StateBase,
              readonly toState: StateBase,
              private readonly inputStateToPromote?: TransitionInputState) {}

  canPromote(inputState: InputState): boolean {
    if (!this.inputStateToPromote) return true;
    if (!this.hasDownInputEvents(inputState)) return false;
    if (!this.hasUpInputEvents(inputState)) return false;
    // if (!this.hasFastInputEventsClicks(inputState)) return false;
    // if (!this.equalsPressedButton(inputState.inputEvent, inputState.inputEventType)) {
    //   return false;
    // }
    if (!this.hasFastInputEventsClicksTest(inputState)) return false;

    return true;
  }

  // todo: rename this method
  // todo: make less complicated this method
  // todo: 1) place all parts in separate methods
  // todo: 2) create variables with specific name for all complicated conditions
  private hasFastInputEventsClicksTest(inputState: InputState): boolean {
    if (this.hasFastInputEventsClicks(inputState) &&
        this.equalsPressedButton(inputState.inputEvent, inputState.inputEventType)) {
      return true;
    }

    if (inputState.fastInputEventsClicks &&
        inputState.fastInputEventsClicks.length === 0) return false;

    if (!this.inputStateToPromote ||
        !this.inputStateToPromote.fastInputEventsClicks ||
        !this.inputStateToPromote.inputEvent) return false;

    const fastInputEventsClicks = [...this.inputStateToPromote.fastInputEventsClicks];
    fastInputEventsClicks.push(this.inputStateToPromote.inputEvent);
    if (!fastInputEventsClicks) return true;

    const fastInputEventsClicksLength = fastInputEventsClicks.length;
    if (fastInputEventsClicksLength > 0) {
      if (fastInputEventsClicksLength > inputState.fastInputEventsClicks!.length) return false;

      const deltaLength = inputState.fastInputEventsClicks!.length - fastInputEventsClicksLength;
      const lastClicks = inputState.fastInputEventsClicks!.slice(deltaLength);
      const containClicks = lastClicks
        .every((p, i) => p.inputEvent === fastInputEventsClicks[i]);

      if (!containClicks) return false;
    }

    return true;
  }

  private hasDownInputEvents(inputState: InputState): boolean {
    if (this.inputStateToPromote!.downInputEvents.length > 0) {
      const hasDownInputEvents = this.inputStateToPromote!.downInputEvents
        .every(p => inputState.downInputEvents.includes(p));

      if (!hasDownInputEvents) return false;
    }

    return true;
  }

  private hasUpInputEvents(inputState: InputState): boolean {
    if (!this.inputStateToPromote || !this.inputStateToPromote.upInputEvents) return true;
    if (this.inputStateToPromote.upInputEvents.length === 0) return true;

    const hasUpInputEvents = this.inputStateToPromote!.upInputEvents
      .every(p => inputState.downInputEvents.includes(p));

    if (hasUpInputEvents) return false;

    return true;
  }

  private hasFastInputEventsClicks(inputState: InputState): boolean {
    const fastInputEventsClicks = this.inputStateToPromote!.fastInputEventsClicks;
    if (!fastInputEventsClicks) return true;

    const fastInputEventsClicksLength = fastInputEventsClicks.length;
    if (fastInputEventsClicksLength > 0) {
      if (fastInputEventsClicksLength > inputState.fastInputEventsClicks!.length) return false;

      const deltaLength = inputState.fastInputEventsClicks!.length - fastInputEventsClicksLength;
      const lastClicks = inputState.fastInputEventsClicks!.slice(deltaLength);
      const containClicks = lastClicks
        .every((p, i) => p.inputEvent === fastInputEventsClicks[i]);

      if (!containClicks) return false;
    }

    return true;
  }

  private equalsPressedButton(inputEvent?: InputEvent, inputEventType?: InputEventType): boolean {
    return !this.inputStateToPromote!.inputEvent ||
           !this.inputStateToPromote!.inputEventType ||
           this.inputStateToPromote!.inputEvent === inputEvent &&
           this.inputStateToPromote!.inputEventType === inputEventType;
  }
}
