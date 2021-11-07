import { InputEvent } from '../../players/input_event';
import { InputEventType } from '../../players/input_event_type';
import { InputState } from '../../players/input_state';
import { StateBase } from './state_base';

export class Transition {
  constructor(readonly fromState: StateBase,
              readonly toState: StateBase,
              private readonly inputStateToPromote?: InputState) {}

  canPromote(inputState: InputState): boolean {
    if (!this.inputStateToPromote) return true;
    if (!this.hasDownInputEvents(inputState)) return false;
    if (!this.hasFastInputEventsClicks(inputState)) return false;
    if (!this.equalsPressedButton(inputState.inputEvent, inputState.inputEventType)) {
      return false;
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

  private hasFastInputEventsClicks(inputState: InputState): boolean {
    const fastInputEventsClicks = this.inputStateToPromote!.fastInputEventsClicks;
    if (!fastInputEventsClicks) return true;

    const fastInputEventsClicksLength = fastInputEventsClicks.length;
    if (fastInputEventsClicksLength > 0) {
      if (fastInputEventsClicksLength > inputState.fastInputEventsClicks!.length) return false;

      const deltaLength = inputState.fastInputEventsClicks!.length - fastInputEventsClicksLength;
      const lastClicks = inputState.fastInputEventsClicks!.slice(deltaLength);
      const containClicks = lastClicks.every((p, i) => p === fastInputEventsClicks[i]);

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
