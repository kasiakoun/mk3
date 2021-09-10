import { Frame } from '../frame';
import { SpriteSheet } from '../sprite_sheet';

export abstract class AnimationFrameStrategy {
  constructor (protected readonly spriteSheet: SpriteSheet) {
  }

  protected getNextFrameFromArray(frames: Frame[]): Frame {
    let nextFrameIndex;

    const currentAnimation = this.spriteSheet.currentAnimation;
    if (!currentAnimation) return undefined!;

    if (this.spriteSheet.currentFrame) {
      nextFrameIndex = frames.indexOf(this.spriteSheet.currentFrame) + 1;

      if (nextFrameIndex >= frames.length) {
        if (currentAnimation.repeat) {
          nextFrameIndex = 0;
        } else {
          return undefined!;
        }
      }
    } else {
      nextFrameIndex = 0;
    }

    return frames[nextFrameIndex];
  }

  protected getNextFrameByPercentageFromArray(percentage: number, frames: Frame[]): Frame {
    const partFramesLength = percentage * frames.length;

    const frameIndex = Math.round(partFramesLength) - 1;

    if (frameIndex >= 0) return frames[frameIndex];

    return undefined!;
  }

  abstract getNextFrame(): Frame;
  abstract getNextFrameByPercentage(percentage: number): Frame;
}
