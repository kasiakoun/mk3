import { AnimationName } from './animation_name';
import { Frame } from './frame';

export class Animation {
  constructor (readonly animationName: AnimationName,
               readonly frames: Frame[],
               readonly repeat: boolean) {
  }
}
