import { createSpriteSheet } from '../factories/sprite_sheet_factory';
import { CoordinateConverter } from '../converters/coordinate_converter';
import { Entity } from '../entities/entity';
import { Unit } from '../entities/unit';
import { UnitName } from '../entities/unit_name';
import { container, coordinateConverterFactory } from '../inversify.config';
import { BackwardParabolaMotion } from '../motions/backward_parabola_motion';
import { ForwardParabolaMotion } from '../motions/forward_parabola_motion';
import { StanceMotion } from '../motions/stance_motion';
import { UpwardMotion } from '../motions/upward_motion';
import { Point } from '../point';
import { EntityFactory } from '../factories/entity_factory';
import { Arena } from '../arenas/arena';
import { ThrowWebAction } from '../actions/throw_web_action';
import { ArenaName } from '../arenas/arena_name';
import { convertJsonToArenaView } from '../converters/convert_json_to_arena_view';
import { Camera } from '../arenas/common/camera';
import { createArenaView } from '../factories/create_arena_view';
import { ParallaxLayerElement } from '../arenas/common/parallax_layer_element';
import { createCameraElement } from './create_camera_element';
import { createArenaViewElement } from './create_arena_view_element';
import { ArenaView } from '../arenas/common/arena_view';
import { createEntityElement } from './create_entity_element';
import { CameraManager } from '../arenas/common/camera_manager';

const elementDictionary = new Map<unknown, Element>();
let gameElement: HTMLElement;
let cameraElement: Element;
let arenaElement: Element;
let cameraPosition: Point;

let refreshingIsStopped: boolean = false;

export async function start() {
  initDebugTools();
  gameElement = document.getElementById('game')!;
  const entityFactory = container.get<EntityFactory>(nameof<EntityFactory>());

  const arena = new Arena(entityFactory);
  arena.entityAdded.subscribe(p => onEntityAdded(p));
  arena.entityRemoved.subscribe(p => onEntityRemoved(p));

  const arenaView = await createArenaView(ArenaName.Waterfron);
  const coordinateConverter = coordinateConverterFactory(arenaView);

  const camera = new Camera(coordinateConverter, arenaView, 400, 254);
  camera.positionChanged.subscribe((position, parallaxLayerElements) =>
    onCameraPositionChanged(position, parallaxLayerElements, camera, arenaView));
  camera.shiftPosition(0, 0);

  const cameraController = new CameraManager(camera, arena, coordinateConverter);

  // todo: replace initial point
  const firstUnit = await entityFactory.createUnit(UnitName.Cyrax, new Point(300, 150));
  const secondUnit = await entityFactory.createUnit(UnitName.Cyrax, new Point(500, 150));

  const stanceMotion21 = new StanceMotion(secondUnit, coordinateConverter);
  stanceMotion21.start();

  startRefreshElements();

  const forwardParabolaMotion1 = new ForwardParabolaMotion(firstUnit, coordinateConverter);
  await forwardParabolaMotion1.start();

  const forwardParabolaMotion2 = new ForwardParabolaMotion(firstUnit, coordinateConverter);
  await forwardParabolaMotion2.start();

  const forwardParabolaMotion3 = new ForwardParabolaMotion(firstUnit, coordinateConverter);
  await forwardParabolaMotion3.start();

  const stanceMotion1 = new StanceMotion(firstUnit, coordinateConverter);
  setTimeout(() => stanceMotion1.stop(), 500);
  await stanceMotion1.start();

  const backwardParabolaMotion1 = new BackwardParabolaMotion(firstUnit, coordinateConverter);
  await backwardParabolaMotion1.start();

  const stanceMotion2 = new StanceMotion(firstUnit, coordinateConverter);
  setTimeout(() => stanceMotion2.stop(), 500);
  await stanceMotion2.start();

  const backwardParabolaMotion2 = new BackwardParabolaMotion(firstUnit, coordinateConverter);
  await backwardParabolaMotion2.start();

  const stanceMotion3 = new StanceMotion(firstUnit, coordinateConverter);
  setTimeout(() => stanceMotion3.stop(), 500);
  await stanceMotion3.start();

  const backwardParabolaMotion3 = new BackwardParabolaMotion(firstUnit, coordinateConverter);
  await backwardParabolaMotion3.start();

  const stanceMotion4 = new StanceMotion(firstUnit, coordinateConverter);
  await stanceMotion4.start();
}

function onCameraPositionChanged(position: Point,
                                 parallaxElements: ParallaxLayerElement[],
                                 camera: Camera,
                                 arenaView: ArenaView) {
  cameraElement = createCameraElement(camera);
  arenaElement = createArenaViewElement(arenaView, parallaxElements);
  cameraElement.append(arenaElement);

  cameraPosition = position;
}

function onEntityAdded(entity: Entity) {
  // addEntityElement(entity);
  entity.updated.subscribe(() => addEntityElement(entity));
}

function onEntityRemoved(entity: Entity) {
  entity.updated.unsubscribe(() => addEntityElement(entity));
  elementDictionary.delete(entity);
}

function startRefreshElements() {
  setInterval(() => refreshGameElements(), 10);
}

function addEntityElement(entity: Entity) {
  const unitElement = createEntityElement(entity);
  elementDictionary.set(entity, unitElement);
}

function refreshGameElements() {
  if (refreshingIsStopped) return;
  if (gameElement === null) return;
  // const coordinateConverter = container.get<CoordinateConverter>(nameof<CoordinateConverter>());
  // tslint:disable-next-line:max-line-length
  // const position = coordinateConverter.convertCartesianToScreen(entity.transform.cartesianPosition);
  // const boundary = createBoundary(position);
  const duplicatedCameraElement = document.createElement('div');
  duplicatedCameraElement.innerHTML = cameraElement.outerHTML;
  const duplicatedArenaElement = duplicatedCameraElement.getElementsByClassName('arena-element')[0];
  elementDictionary.forEach((val, key) => {
    duplicatedArenaElement.append(val);
  });

  gameElement.innerHTML = duplicatedCameraElement.innerHTML;

  const currentCameraElement = gameElement.getElementsByClassName('camera-element')[0];

  currentCameraElement.scrollLeft = cameraPosition.x;
  currentCameraElement.scrollTop = cameraPosition.y;
  // gameElement.appendChild(boundary);
  // if (gameElement.childNodes.length > 1) {
  //   gameElement.removeChild(gameElement.firstChild!);
  // }
  // gameElement.appendChild(unitElement);
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

function initDebugTools() {
  const stopButton = document.getElementById('stopButton') as HTMLButtonElement;
  stopButton.onclick = () => { refreshingIsStopped = true; };

  const startButton = document.getElementById('startButton') as HTMLButtonElement;
  startButton.onclick = () => { refreshingIsStopped = false; };
}
