import { AnimationName } from './animation_name';
import { Frame } from './frame';

export class Animation {
  readonly maxFrameWidth: number;
  readonly maxFrameHeight: number;
  constructor (readonly animationName: AnimationName,
               readonly frames: Frame[],
               readonly repeat: boolean) {
    this.maxFrameWidth = Math.max(...frames.map(p => p.width));
    this.maxFrameHeight = Math.max(...frames.map(p => p.height));
  }
}
