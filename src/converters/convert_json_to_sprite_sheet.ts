import { Frame } from '../animations/frame';
import { Animation } from '../animations/animation';
import { SpriteSheet } from '../animations/sprite_sheet';
import { Point } from '../point';

export async function convertJsonToSpriteSheet(jsonObject: any): Promise<SpriteSheet> {
  const animations = jsonObject.animations.map((animation: any) => {
    const frames = animation.frames.map((frame: any) => {
      const imageOffset = new Point(frame.x, frame.y);
      const offset = new Point(frame.offsetX, frame.offsetY);

      return new Frame(imageOffset, offset, frame.width, frame.height);
    });

    return new Animation(animation.name, frames, animation.repeatAnimation);
  });

  const loadedImage = await import(`../assets/${jsonObject.image}`);
  const pathToImage = loadedImage.default;

  return new SpriteSheet(animations, pathToImage);
}
