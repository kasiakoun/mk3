import { Frame } from '../frame';
import { AnimationFrameStrategy } from './animation_frame_strategy';

export class AnimationForwardFrameStrategy extends AnimationFrameStrategy {
  getNextFrame(): Frame {
    const frames = this.spriteSheet.currentAnimation?.frames;
    if (!frames) return undefined!;

    return this.getNextFrameFromArray(frames);
  }

  getRightCornerOffset(): number {
    const frames = this.spriteSheet.currentAnimation?.frames;
    if (!frames) return undefined!;

    return this.getRightCornerOffsetFromArray(frames);
  }
}
