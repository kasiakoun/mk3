import { InputState } from '../../players/input_state';
import { StateBase } from './state_base';
import { StateName } from './state_name';
import { StateType } from './state_type';

export class StateMachine {
  private readonly previousStates: StateBase[] = [];
  readonly statesQueue: StateBase[] = [];

  get currentState(): StateBase {
    return this.previousStates[this.previousStates.length - 1];
  }

  constructor(readonly states: StateBase[]) {}

  handle(inputState: InputState): StateBase {
    const firstTransition = this.currentState.transitions.find(p => p.canPromote(inputState));
    if (!firstTransition || firstTransition.toState === this.currentState) return this.currentState;

    this.promote(firstTransition.toState);

    return firstTransition.toState;
  }

  async queueUpState(state: StateBase) {
    const currentState = this.currentState;
    if (currentState.interruptible) {
      await this.promote(state);
    } else {
      this.statesQueue.push(state);
    }
  }

  async promote(state: StateBase) {
    if (this.currentState && this.currentState === state) return;
    if (this.currentState) {
      this.currentState.stop();
    }
    console.log(`New state: ${state.getName()}`);
    this.previousStates.push(state);

    await state.promote();
    if (this.currentState !== state) return;

    await this.promoteToQueueState(state);
  }

  async promoteToQueueState(state: StateBase) {
    if (this.currentState !== state) return;

    let nextState: StateBase;
    if (this.statesQueue.length !== 0) {
      nextState = this.statesQueue[0];
      this.statesQueue.shift();
    } else {
      let stateName: StateName;
      if (state.state === StateType.Stand || state.state === StateType.Fly) {
        stateName = StateName.Stance;
      } else if (state.state === StateType.Sit) {
        stateName = StateName.Sit;
      }

      nextState = this.states.find(p => p.name === stateName)!;
    }

    await this.promote(nextState);
  }
}
