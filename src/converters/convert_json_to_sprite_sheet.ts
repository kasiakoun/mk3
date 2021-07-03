import { Frame } from '../animations/frame';
import { Animation } from '../animations/animation';
import { SpriteSheet } from '../animations/sprite_sheet';
import { Point } from '../point';

export function convertJsonToSpriteSheet(jsonObject: any) {
  const animations = jsonObject.animations.map((animation: any) => {
    const frames = animation.frames.map((frame: any) => {
      const offset = new Point(frame.x, frame.y);

      return new Frame(offset, frame.width, frame.height);
    });

    return new Animation(animation.name, frames, animation.repeatAnimation);
  });

  // todo: TEMP there is necessary to replace this method with something
  // todo: to avoid such errors
  const loadedImage = require(`../${jsonObject.image}`);
  const pathToImage = loadedImage.default;

  return new SpriteSheet(animations, pathToImage);
}
