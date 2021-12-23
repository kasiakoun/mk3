import { InputState } from '../../players/input_state';
import { StateBase } from './state_base';

export class StateMachine {
  private readonly stackStates: StateBase[] = [];

  get currentState(): StateBase {
    return this.stackStates[this.stackStates.length - 1];
  }

  handle(inputState: InputState): StateBase {
    const firstTransition = this.currentState.transitions.find(p => p.canPromote(inputState));
    if (!firstTransition || firstTransition.toState === this.currentState) return this.currentState;

    this.promote(firstTransition.toState);

    return firstTransition.toState;
  }

  async promote(state: StateBase) {
    if (this.currentState && this.currentState === state) return;
    if (this.currentState) {
      this.currentState.stop();
    }
    console.log(`New state: ${state.getName()}`);
    this.stackStates.push(state);

    await state.promote();
    // this.tryToPromoteToStartState(state);
  }

  // private tryToPromoteToStartState(toState: StateBase) {
  //   if (!this.startState) {
  //     // throw new Error(`startState ${this.getName()} is not set`);
  //   }

  //   if (!this.isRunAnotherState(toState)) {
  //     this.startState.promote();
  //     this.unit.currentState = this.startState;
  //   }
  // }
}
