import { InputEvent } from './input_event';

export class InputEventClick {
  constructor(readonly inputEvent: InputEvent,
              readonly clickedTime: number) {}
}
