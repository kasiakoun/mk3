import { Frame } from '../animations/frame';
import { Animation } from '../animations/animation';
import { SpriteSheet } from '../animations/sprite_sheet';
import { Point } from '../point';
import { DuplicatedFrame } from '../animations/duplicated_frame';

export async function convertJsonToSpriteSheet(jsonObject: any): Promise<SpriteSheet> {
  const animations = jsonObject.animations.map((animation: any) => {
    const frames: Frame[] = [];
    animation.frames.forEach((frame: any) => {
      const imageOffset = new Point(frame.x, frame.y);
      const offset = new Point(frame.offsetX, frame.offsetY);

      let newFrame = new Frame(imageOffset, offset, frame.width, frame.height);
      frames.push(newFrame);

      for (let i = 0; i < frame.duplicates; i++) {
        newFrame = new DuplicatedFrame(imageOffset, offset, frame.width, frame.height);
        frames.push(newFrame);
      }
    });

    return new Animation(animation.name, frames, animation.repeatAnimation);
  });

  const loadedImage = await import(`../assets/${jsonObject.image}`);
  const pathToImage = loadedImage.default;

  return new SpriteSheet(animations, pathToImage);
}
