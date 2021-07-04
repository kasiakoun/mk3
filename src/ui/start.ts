import { createSpriteSheet } from '../animations/sprite_sheet_factory';
import { CoordinateConverter } from '../converters/coordinate_converter';
import { Entity } from '../entities/entity';
import { UnitName } from '../entities/unit_name';
import { container } from '../inversify.config';
import { ParabolaMotion } from '../motions/parabola_motion';

export async function start() {
  const gameElement = document.getElementById('game');
  // todo: TEMP init constructor by converter
  const spriteSheet = await createSpriteSheet(UnitName.Cyrax);
  const entity = new Entity(spriteSheet);
  entity.updated.subscribe(() => {
    const unitElement = createUnitElement(entity);
    if (gameElement !== null) {
      gameElement.innerHTML = unitElement.outerHTML;
      // gameElement.appendChild(unitElement);
    }
  });
  const coordinateConverter = container.get<CoordinateConverter>(nameof<CoordinateConverter>());
  const motion = new ParabolaMotion(entity, coordinateConverter);
  motion.start();
}

function createUnitElement(entity: Entity): Element {
  const unitElement = document.createElement('div');

  unitElement.style.background = `url(${entity.spriteSheet.image}) no-repeat`;
  unitElement.style.position = 'absolute';
  unitElement.style.width = `${entity.spriteSheet.currentFrame.width}px`;
  unitElement.style.height = `${entity.spriteSheet.currentFrame.height}px`;
  unitElement.style.backgroundPosition = `-${entity.spriteSheet.currentFrame.offset.x}px -${entity.spriteSheet.currentFrame.offset.y}px`;

  unitElement.style.marginLeft = `${entity.transform.position.x}px`;
  unitElement.style.marginTop = `${entity.transform.position.y}px`;

  return unitElement;
}
