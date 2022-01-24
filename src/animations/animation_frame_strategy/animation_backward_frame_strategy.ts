import { Frame } from '../frame';
import { AnimationFrameStrategy } from './animation_frame_strategy';

export class AnimationBackwardFrameStrategy extends AnimationFrameStrategy {
  getNextFrame(): Frame {
    const frames = this.spriteSheet.currentAnimation?.frames.map(p => p);
    if (!frames) return undefined!;

    frames.reverse();

    return this.getNextFrameFromArray(frames);
  }

  getRightCornerOffset(): number {
    const frames = this.spriteSheet.currentAnimation?.frames.map(p => p);
    if (!frames) return undefined!;

    return this.getRightCornerOffsetFromArray(frames);
  }
}
