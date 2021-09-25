import { createSpriteSheet } from '../factories/sprite_sheet_factory';
import { CoordinateConverter } from '../converters/coordinate_converter';
import { Entity } from '../entities/entity';
import { Unit } from '../entities/unit';
import { UnitName } from '../entities/unit_name';
import { container } from '../inversify.config';
import { BackwardParabolaMotion } from '../motions/backward_parabola_motion';
import { ForwardParabolaMotion } from '../motions/forward_parabola_motion';
import { StanceMotion } from '../motions/stance_motion';
import { UpwardMotion } from '../motions/upward_motion';
import { Point } from '../point';
import { EntityFactory } from '../factories/entity_factory';
import { Arena } from '../arenas/arena';
import { ThrowWebAction } from '../actions/throw_web_action';

const elementDictionary = new Map<Entity, Element>();
let gameElement: HTMLElement;

export async function start() {
  gameElement = document.getElementById('game')!;
  const entityFactory = container.get<EntityFactory>(nameof<EntityFactory>());

  const arena = new Arena(entityFactory);
  arena.entityAdded.subscribe(p => onEntityAdded(p));
  arena.entityRemoved.subscribe(p => onEntityRemoved(p));

  // todo: replace initial point
  const entity = await entityFactory.createUnit(UnitName.Cyrax, new Point(400, 50));

  const coordinateConverter = container.get<CoordinateConverter>(nameof<CoordinateConverter>());

  // const forwardParabolaMotion1 = new ForwardParabolaMotion(entity, coordinateConverter);
  // await forwardParabolaMotion1.start();

  const stanceMotion1 = new StanceMotion(entity, coordinateConverter);
  setTimeout(() => stanceMotion1.stop(), 2000);
  await stanceMotion1.start();

  const action = new ThrowWebAction(entity, coordinateConverter, entityFactory);
  await action.execute();

  // const backwardParabolaMotion1 = new BackwardParabolaMotion(entity, coordinateConverter);
  // await backwardParabolaMotion1.start();

  // const upwardMotion1 = new UpwardMotion(entity, coordinateConverter);
  // await upwardMotion1.start();

  // // const parabolaMotion2 = new ParabolaMotion(entity, coordinateConverter);
  // // await parabolaMotion2.start();

  // // const upwardMotion2 = new UpwardMotion(entity, coordinateConverter);
  // // await upwardMotion2.start();

  // entity.leftDirection = true;

  // const stanceMotion4 = new StanceMotion(entity, coordinateConverter);
  // setTimeout(() => stanceMotion4.stop(), 1000);
  // await stanceMotion4.start();

  // const backwardParabolaMotion2 = new BackwardParabolaMotion(entity, coordinateConverter);
  // await backwardParabolaMotion2.start();

  const stanceMotion2 = new StanceMotion(entity, coordinateConverter);
  // setTimeout(() => stanceMotion2.stop(), 2000);
  await stanceMotion2.start();

  // const forwardParabolaMotion2 = new ForwardParabolaMotion(entity, coordinateConverter);
  // await forwardParabolaMotion2.start();

  // const stanceMotion3 = new StanceMotion(entity, coordinateConverter);
  // await stanceMotion3.start();
}

function onEntityAdded(entity: Entity) {
  entity.updated.subscribe(() => refreshGameElement(entity));
}

function onEntityRemoved(entity: Entity) {
  entity.updated.unsubscribe(() => refreshGameElement(entity));
  elementDictionary.delete(entity);
}

function refreshGameElement(entity: Entity) {
  // const coordinateConverter = container.get<CoordinateConverter>(nameof<CoordinateConverter>());
  // tslint:disable-next-line:max-line-length
  // const position = coordinateConverter.convertCartesianToScreen(entity.transform.cartesianPosition);
  // const boundary = createBoundary(position);
  const unitElement = createEntityElement(entity);
  elementDictionary.set(entity, unitElement);
  if (gameElement !== null) {
    let elementsString = '';
    elementDictionary.forEach((val, key) => {
      elementsString += val.outerHTML;
    });
    gameElement.innerHTML = elementsString;
    // gameElement.appendChild(boundary);
    // if (gameElement.childNodes.length > 1) {
    //   gameElement.removeChild(gameElement.firstChild!);
    // }
    // gameElement.appendChild(unitElement);
  }
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

function createEntityElement(entity: Entity): Element {
  const entityElement = document.createElement('div');

  entityElement.style.background = `url(${entity.spriteSheet.image}) no-repeat`;
  entityElement.style.position = 'absolute';
  if (entity.spriteSheet.currentFrame) {
    entityElement.style.width = `${entity.spriteSheet.currentFrame.width}px`;
    entityElement.style.height = `${entity.spriteSheet.currentFrame.height}px`;
    entityElement.style.backgroundPosition = `-${entity.spriteSheet.currentFrame.imageOffset.x}px -${entity.spriteSheet.currentFrame.imageOffset.y}px`;
  }

  if (entity.leftDirection) {
    entityElement.style.transform = 'scaleX(-1)';
  }

  // unitElement.style.width = '1px';
  // unitElement.style.height = '1px';
  // unitElement.style.backgroundColor = 'black';

  // unitElement.style.border = '1px solid red';

  entityElement.style.marginLeft = `${entity.transform.position.x}px`;
  entityElement.style.marginTop = `${entity.transform.position.y}px`;

  return entityElement;
}
