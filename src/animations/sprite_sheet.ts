import { Animation } from './animation';
import { AnimationName } from './animation_name';
import { Frame } from './frame';

export class SpriteSheet {
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

  setCurrentAnimation(animation: AnimationName) {
    this.#currentAnimation = this.animations.find(p => p.animationName === animation);
    this.#currentFrame = undefined;
  }

  moveToNextFrame() {
    const nextFrame = this.getNextFrame();
    if (!nextFrame) return;

    this.#currentFrame = nextFrame;
  }

  // todo: move into separate class(strategy)
  private getNextFrame(): Frame {
    let nextFrameIndex;

    if (!this.#currentAnimation) return undefined!;

    if (this.#currentFrame) {
      nextFrameIndex = this.#currentAnimation.frames.indexOf(this.#currentFrame) + 1;

      if (nextFrameIndex >= this.#currentAnimation.frames.length) {
        if (this.#currentAnimation.repeat) {
          nextFrameIndex = 0;
        } else {
          return undefined!;
        }
      }
    } else {
      nextFrameIndex = 0;
    }

    return this.#currentAnimation.frames[nextFrameIndex];
  }
}
