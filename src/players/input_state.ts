import { InputEventClick } from './input_event_click';
import { InputEvent } from './input_event';
import { InputEventType } from './input_event_type';

export class InputState {
  constructor(readonly downInputEvents: InputEvent[],
              readonly fastInputEventsClicks?: InputEventClick[],
              readonly inputEvent?: InputEvent,
              readonly inputEventType?: InputEventType) {}
}
