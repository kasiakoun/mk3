import { InputEventType } from './input_event_type';
import { InputEvent } from './input_event';
import { InputEventClick } from './input_event_click';
import { InputState } from './input_state';
import { Unit } from '../entities/unit';
import { ResettableState } from '../entities/states/resettable_state';

export class PlayerInput {
  private readonly averageMillisecondsClick: number = 150;
  private readonly storingTime: number = 3000;
  private readonly downInputEvents: Map<InputEvent, number> = new Map();
  private fastInputEvents: InputEventClick[] = [];

  private inputState: InputState = new InputState([], []);

  constructor(private readonly unit: Unit) {}

  fillchangeInputState(inputEvent: InputEvent, inputEventType: InputEventType) {
    if (inputEventType === InputEventType.Down) {
      this.inputState = this.createKeyDown(inputEvent, inputEventType);
    }

    if (inputEventType === InputEventType.Up) {
      this.inputState = this.createKeyUp(inputEvent, inputEventType);
    }
  }

  handleInput() {
    const newState = this.unit.stateMachine.handle(this.inputState);
    const resetInputEvents = this.unit.stateMachine.currentState !== newState &&
                             newState instanceof ResettableState;
    if (resetInputEvents) {
      this.fastInputEvents = [];
      this.inputState = this.createInputState(this.inputState.inputEvent!,
                                              this.inputState.inputEventType!, 0);
    }
    // this.unit.currentState = newState;
  }

  private createKeyDown(inputEvent: InputEvent, inputEventType: InputEventType): InputState {
    const now = Date.now();

    this.downInputEvents.set(inputEvent, now);

    const inputState = this.createInputState(inputEvent, inputEventType, now);

    return inputState;
  }

  private createKeyUp(inputEvent: InputEvent, inputEventType: InputEventType): InputState {
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
