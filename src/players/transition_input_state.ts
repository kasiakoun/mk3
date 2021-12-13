import { InputEvent } from './input_event';
import { InputEventType } from './input_event_type';

export class TransitionInputState {
  constructor(readonly downInputEvents: InputEvent[],
              readonly upInputEvents?: InputEvent[],
              readonly fastInputEventsClicks?: InputEvent[],
              readonly inputEvent?: InputEvent,
              readonly inputEventType?: InputEventType) {}
}
