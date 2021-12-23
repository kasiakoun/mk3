import { Motion } from '../../motions/motion';
import { InputState } from '../../players/input_state';
import { Unit } from '../unit';
import { Transition } from './transition';

export abstract class StateBase {
  protected motion: Motion;
  transitions: Transition[] = [];

  constructor(protected readonly unit: Unit,
              public startState?: StateBase) {
  }

  abstract promote(): Promise<void>;

  // handle(inputState: InputState): StateBase {
  //   const firstTransition = this.transitions.find(p => p.canPromote(inputState));
  //   if (!firstTransition || firstTransition.toState === this) return this;

  //   this.runPromote(firstTransition.toState);

  //   return firstTransition.toState;
  // }

  getName(): string {
    return this.constructor.name;
  }

  // private async runPromote(toState: StateBase) {
  //   this.unit.currentState.stop();
  //   await toState.promote();
  //   this.tryToPromoteToStartState(toState);
  // }

  // private tryToPromoteToStartState(toState: StateBase) {
  //   if (!this.startState) {
  //     throw new Error(`startState ${this.getName()} is not set`);
  //   }
  //   if (!this.isRunAnotherState(toState)) {
  //     this.startState.promote();
  //     this.unit.currentState = this.startState;
  //   }
  // }

  // private isRunAnotherState(currentState: StateBase): boolean {
  //   return this.unit.currentState !== currentState;
  // }

  stop() {
    this.motion.stop();
  }
}
