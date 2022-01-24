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
  #animationFinished: boolean = false;

  get currentFrame(): Frame {
    return this.#currentFrame!;
  }

  get currentAnimation(): Animation {
    return this.#currentAnimation!;
  }

  get animationFinished(): boolean {
    return this.#animationFinished;
  }

  lastMaxFrameWidth: number = 0;
  lastRightCornerOffsetX: number = 0;
  lastAnimationOffsetX: number = 0;

  constructor (readonly animations: Animation[],
               readonly image: string,
               readonly name: string) {
  }

  setCurrentFrameByIndex(index: number) {
    const frame = this.#currentAnimation?.frames[index];
    this.#currentFrame = frame;
  }

  setCurrentAnimation(animation: AnimationName, isReverseAnimation: boolean) {
    this.#currentAnimation = this.animations.find(p => p.animationName === animation);
    if (!this.#currentAnimation) throw new Error(`Animation ${animation} does not exist`);

    this.#currentFrame = undefined;
    this.#animationFinished = false;
    this.frameStrategy = isReverseAnimation
      ? this.backwardStrategy
      : this.forwardStrategy;
  }

  moveToNextFrame(): boolean {
    const nextFrame = this.frameStrategy?.getNextFrame();
    if (!nextFrame) {
      this.#animationFinished = true;
      return false;
    }

    this.#animationFinished = false;
    this.#currentFrame = nextFrame;

    return true;
  }

  getRightCornerOffset(): number {
    const result = this.frameStrategy?.getRightCornerOffset();
    return result;
  }
}
