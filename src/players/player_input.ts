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

  constructor(private readonly unit: Unit) {
    unit.entityTurned.subscribe(turned => this.onEntityTurned(turned));
  }

  private onEntityTurned(turned: boolean) {
    const fastInputEventsClicks = this.inputState.fastInputEventsClicks;
    fastInputEventsClicks?.splice(0, fastInputEventsClicks?.length);
    this.fastInputEvents.splice(0, this.fastInputEvents.length);

    this.clearDownInputEventsByEntityTurn(turned);
    this.clearInputStateByEntityTurn(turned);
  }

  private clearDownInputEventsByEntityTurn(turned: boolean) {
    const keys = [...this.downInputEvents.keys()];
    this.downInputEvents.clear();

    const expiredTime = Date.now() - this.storingTime;
    keys.forEach((key) => {
      let downInputEvent = key;
      if (key === InputEvent.Forward) downInputEvent = InputEvent.Backward;
      if (key === InputEvent.Backward) downInputEvent = InputEvent.Forward;

      this.downInputEvents.set(downInputEvent, expiredTime);
    });
  }

  private clearInputStateByEntityTurn(turned: boolean) {
    const keys = [...this.inputState.downInputEvents];
    this.inputState.downInputEvents.splice(0, this.inputState.downInputEvents.length);

    keys.forEach((key) => {
      let downInputEvent = key;
      if (key === InputEvent.Forward) downInputEvent = InputEvent.Backward;
      if (key === InputEvent.Backward) downInputEvent = InputEvent.Forward;

      this.inputState.downInputEvents.push(downInputEvent);
    });
  }

  fillchangeInputState(inputEvent: InputEvent, inputEventType: InputEventType) {
    const newInputEvent = this.reverseInputEventByUnitTurn(inputEvent);
    if (inputEventType === InputEventType.Down) {
      this.inputState = this.createKeyDown(newInputEvent, inputEventType);
    }

    if (inputEventType === InputEventType.Up) {
      this.inputState = this.createKeyUp(newInputEvent, inputEventType);
    }
  }

  reverseInputEventByUnitTurn(inputEvent: InputEvent): InputEvent {
    if (!this.unit.turned) return inputEvent;

    if (inputEvent === InputEvent.Forward) return InputEvent.Backward;
    if (inputEvent === InputEvent.Backward) return InputEvent.Forward;

    return inputEvent;
  }

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
