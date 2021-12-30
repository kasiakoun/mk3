import { Motion } from '../../motions/motion';
import { InputState } from '../../players/input_state';
import { Unit } from '../unit';
import { StateName } from './state_name';
import { Transition } from './transition';

export abstract class StateBase {
  protected motion: Motion;
  transitions: Transition[] = [];
  abstract readonly interruptible: boolean;
  abstract readonly name: StateName;

  constructor(protected readonly unit: Unit) {}

  abstract promote(): Promise<void>;

  getName(): string {
    return this.constructor.name;
  }

  stop() {
    this.motion.stop();
  }
}
