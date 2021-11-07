import { InputEventType } from './input_event_type';
import { InputEvent } from './input_event';
import { InputEventClick } from './input_event_click';
import { InputState } from './input_state';
import { Unit } from '../entities/unit';

export class PlayerInput {
  private readonly averageMillisecondsClick: number = 150;
  private readonly storingTime: number = 1500;
  private readonly downInputEvents: Map<InputEvent, number> = new Map();
  private readonly fastInputEvents: InputEventClick[] = [];

  constructor(private readonly unit: Unit) {}

  handleInput(inputEvent: InputEvent, inputEventType: InputEventType) {
    let inputState!: InputState;
    if (inputEventType === InputEventType.Down) {
      inputState = this.handleKeyDown(inputEvent, inputEventType);
    }

    if (inputEventType === InputEventType.Up) {
      inputState = this.handleKeyUp(inputEvent, inputEventType);
    }

    if (!inputState) return;

    this.unit.currentState = this.unit.currentState.handle(inputState);
  }

  private handleKeyDown(inputEvent: InputEvent, inputEventType: InputEventType): InputState {
    const now = Date.now();

    this.downInputEvents.set(inputEvent, now);

    const inputState = this.createInputState(inputEvent, inputEventType, now);

    return inputState;
  }

  private handleKeyUp(inputEvent: InputEvent, inputEventType: InputEventType): InputState {
    const now = Date.now();
    const downInputEventTime = this.downInputEvents.get(inputEvent);
    this.downInputEvents.delete(inputEvent);

    if (downInputEventTime) {
      const spentTimeOnClick = now - downInputEventTime;
      if (spentTimeOnClick < this.averageMillisecondsClick) {
        const inputEventClick = new InputEventClick(inputEvent, now);
        this.fastInputEvents.push(inputEventClick);
      }
    }

    const inputState = this.createInputState(inputEvent, inputEventType, now);

    return inputState;
  }

  private createInputState(input: InputEvent, inputType: InputEventType, now: number): InputState {
    const recentlyFastInputClicks = this.fastInputEvents
      .filter(p => p.clickedTime + this.storingTime > now);
    const inputState = new InputState([...this.downInputEvents.keys()],
                                      recentlyFastInputClicks,
                                      input,
                                      inputType);

    return inputState;
  }
}
