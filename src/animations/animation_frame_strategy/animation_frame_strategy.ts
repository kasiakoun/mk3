import { DuplicatedFrame } from '../duplicated_frame';
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

  protected getRightCornerOffsetFromArray(frames: Frame[]): number {
    const currentFrame = this.spriteSheet.currentFrame;

    if (!frames) return 0;
    if (!currentFrame) return 0;
    if (!frames.some(p => p === currentFrame)) return 0;

    const takenFrames: Frame[] = this.takeArrayUntilCurrentFrame(frames);
    const framesWithoutDuplicates = takenFrames.filter(p => !(p instanceof DuplicatedFrame));

    let offset = 0;
    framesWithoutDuplicates.forEach((frame, i) => {
      offset += i > 0
      ? framesWithoutDuplicates[i - 1].width - frame.width
      : 0;
    });

    return offset;
  }

  private takeArrayUntilCurrentFrame(frames: Frame[]): Frame[] {
    const currentFrame = this.spriteSheet.currentFrame;
    const takenFrames: Frame[] = [];
    frames.every((p) => {
      takenFrames.push(p);
      if (p === currentFrame) return false;

      return true;
    });

    return takenFrames;
  }

  abstract getNextFrame(): Frame;
  abstract getNextFrameByPercentage(percentage: number): Frame;
  abstract getRightCornerOffset(): number;
}
