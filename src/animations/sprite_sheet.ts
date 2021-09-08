import { Animation } from './animation';
import { AnimationBackwardFrameStrategy } from './animation_frame_strategy/animation_backward_frame_strategy';
import { AnimationForwardFrameStrategy } from './animation_frame_strategy/animation_forward_frame_strategy';
import { AnimationFrameStrategy } from './animation_frame_strategy/animation_frame_strategy';
import { AnimationName } from './animation_name';
import { Frame } from './frame';

export class SpriteSheet {
  private readonly backwardStrategy: AnimationFrameStrategy =
    new AnimationBackwardFrameStrategy(this);
  private readonly forwardStrategy: AnimationFrameStrategy =
    new AnimationForwardFrameStrategy(this);
  private frameStrategy: AnimationFrameStrategy;

  #currentFrame?: Frame;
  #currentAnimation?: Animation;

  get currentFrame(): Frame {
    return this.#currentFrame!;
  }

  get currentAnimation(): Animation {
    return this.#currentAnimation!;
  }

  constructor (readonly animations: Animation[],
               readonly image: string) {
  }

  setCurrentFrameByIndex(index: number) {
    const frame = this.#currentAnimation?.frames[index];
    this.#currentFrame = frame;
  }

  setCurrentAnimation(animation: AnimationName, isBackwardAnimation?: boolean) {
    this.#currentAnimation = this.animations.find(p => p.animationName === animation);
    this.#currentFrame = undefined;
    this.frameStrategy = isBackwardAnimation
      ? this.backwardStrategy
      : this.forwardStrategy;
  }

  moveToNextFrame() {
    const nextFrame = this.frameStrategy?.getNextFrame();
    if (!nextFrame) return;

    this.#currentFrame = nextFrame;
  }

  setFrameByPercentage(percentage: number) {
    const frame = this.frameStrategy?.getNextFrameByPercentage(percentage);
    if (!frame) return;

    this.#currentFrame = frame;
  }
}
