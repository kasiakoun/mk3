import { createSpriteSheet } from '../animations/sprite_sheet_factory';
import { CoordinateConverter } from '../converters/coordinate_converter';
import { Entity } from '../entities/entity';
import { UnitName } from '../entities/unit_name';
import { container } from '../inversify.config';
import { ParabolaMotion } from '../motions/parabola_motion';
import { StanceMotion } from '../motions/stance_motion';
import { UpwardMotion } from '../motions/upward_motion';
import { UpwardMovement } from '../movements/upward_movement';
import { Point } from '../point';

export async function start() {
  const gameElement = document.getElementById('game');
  // todo: TEMP init constructor by converter
  const spriteSheet = await createSpriteSheet(UnitName.Cyrax);
  const entity = new Entity(spriteSheet);

  const coordinateConverter = container.get<CoordinateConverter>(nameof<CoordinateConverter>());

  const position = coordinateConverter.convertCartesianToScreen(entity.transform.cartesianPosition);
  const boundary = createBoundary(position);

  entity.updated.subscribe(() => {
    const unitElement = createUnitElement(entity);
    if (gameElement !== null) {
      gameElement.innerHTML = unitElement.outerHTML;
      gameElement.appendChild(boundary);
      // if (gameElement.childNodes.length > 1) {
      //   gameElement.removeChild(gameElement.firstChild!);
      // }
      gameElement.appendChild(unitElement);
    }
  });
  const parabolaMotion1 = new ParabolaMotion(entity, coordinateConverter);
  await parabolaMotion1.start();

  const stanceMotion1 = new StanceMotion(entity, coordinateConverter);
  setTimeout(() => stanceMotion1.stop(), 2000);
  await stanceMotion1.start();

  const upwardMotion1 = new UpwardMotion(entity, coordinateConverter);
  await upwardMotion1.start();

  const parabolaMotion2 = new ParabolaMotion(entity, coordinateConverter);
  await parabolaMotion2.start();

  const upwardMotion2 = new UpwardMotion(entity, coordinateConverter);
  await upwardMotion2.start();

  const stanceMotion2 = new StanceMotion(entity, coordinateConverter);
  await stanceMotion2.start();
}

function createBoundary(position: Point): Element {
  const boundaryElement = document.createElement('div');
  boundaryElement.style.position = 'absolute';
  boundaryElement.style.backgroundColor = 'red';

  boundaryElement.style.width = '100%';
  boundaryElement.style.height = '1px';

  boundaryElement.style.marginLeft = `${position.x}px`;
  boundaryElement.style.marginTop = `${position.y}px`;

  return boundaryElement;
}

function createUnitElement(entity: Entity): Element {
  const unitElement = document.createElement('div');

  unitElement.style.background = `url(${entity.spriteSheet.image}) no-repeat`;
  unitElement.style.position = 'absolute';
  if (entity.spriteSheet.currentFrame) {
    unitElement.style.width = `${entity.spriteSheet.currentFrame.width}px`;
    unitElement.style.height = `${entity.spriteSheet.currentFrame.height}px`;
    unitElement.style.backgroundPosition = `-${entity.spriteSheet.currentFrame.imageOffset.x}px -${entity.spriteSheet.currentFrame.imageOffset.y}px`;
  }

  // unitElement.style.width = '1px';
  // unitElement.style.height = '1px';
  // unitElement.style.backgroundColor = 'black';

  // unitElement.style.border = '1px solid red';

  unitElement.style.marginLeft = `${entity.transform.position.x}px`;
  unitElement.style.marginTop = `${entity.transform.position.y}px`;

  return unitElement;
}
