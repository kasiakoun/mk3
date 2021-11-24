import { createSpriteSheet } from '../factories/sprite_sheet_factory';
import { CoordinateConverter } from '../converters/coordinate_converter';
import { Entity } from '../entities/entity';
import { Unit } from '../entities/unit';
import { UnitName } from '../entities/unit_name';
import { container, registerArenaView } from '../inversify.config';
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
import { MoveEnabler } from '../movements/move_enabler';
import { PlayerInput } from '../players/player_input';
import { InputEvent } from '../players/input_event';
import { InputEventType } from '../players/input_event_type';
import { GameTimer } from '../game_timer';

const elementDictionary = new Map<unknown, Element>();
let gameElement: HTMLElement;
let cameraElement: Element;
let arenaElement: Element;
let cameraPosition: Point;

let refreshingIsStopped: boolean = false;

const mappedInputEvents = new Map<string, InputEvent>();
mappedInputEvents.set('ArrowLeft', InputEvent.Backward);
mappedInputEvents.set('ArrowUp', InputEvent.Upward);
mappedInputEvents.set('ArrowRight', InputEvent.Forward);
mappedInputEvents.set('ArrowDown', InputEvent.Downward);
mappedInputEvents.set('Numpad3', InputEvent.Lowkick);

export async function start() {
  initDebugTools();
  const gameTimer = container.get<GameTimer>(nameof<GameTimer>());
  gameElement = document.getElementById('game')!;

  const arenaView = await createArenaView(ArenaName.Waterfron);
  registerArenaView(arenaView);

  const entityFactory = container.get<EntityFactory>(nameof<EntityFactory>());

  const arena = container.get<Arena>(nameof<Arena>());
  arena.entityAdded.subscribe(p => onEntityAdded(p));
  arena.entityRemoved.subscribe(p => onEntityRemoved(p));

  const camera = container.get<Camera>(nameof<Camera>());
  camera.positionChanged.subscribe((position, parallaxLayerElements) =>
    onCameraPositionChanged(position, parallaxLayerElements, camera, arenaView));
  camera.shiftPosition(0, 0);

  container.get<CameraManager>(nameof<CameraManager>());

  // todo: replace initial point
  const firstUnit = await entityFactory.createUnit(UnitName.Cyrax, new Point(100, 150));
  // const secondUnit = await entityFactory.createUnit(UnitName.Cyrax, new Point(500, 150));

  const firstPlayerInput = new PlayerInput(firstUnit);
  gameTimer.updated.subscribe(() => firstPlayerInput.handleInput());

  window.addEventListener('keydown', (e) => {
    e.preventDefault();
    const inputType = mappedInputEvents.get(e.code);
    if (!inputType) return;

    firstPlayerInput.fillchangeInputState(inputType, InputEventType.Down);
  });

  window.addEventListener('keyup', (e) => {
    e.preventDefault();
    const inputType = mappedInputEvents.get(e.code);
    if (!inputType) return;

    firstPlayerInput.fillchangeInputState(inputType, InputEventType.Up);
  });

  // const stanceMotion21 = new StanceMotion(secondUnit);
  // stanceMotion21.start();

  startRefreshElements();

  // const forwardParabolaMotion1 = new ForwardParabolaMotion(firstUnit);
  // await forwardParabolaMotion1.start();

  // const forwardParabolaMotion2 = new ForwardParabolaMotion(firstUnit);
  // await forwardParabolaMotion2.start();

  // const forwardParabolaMotion3 = new ForwardParabolaMotion(firstUnit);
  // await forwardParabolaMotion3.start();

  // const stanceMotion1 = new StanceMotion(firstUnit);
  // setTimeout(() => stanceMotion1.stop(), 500);
  // await stanceMotion1.start();

  // const backwardParabolaMotion1 = new BackwardParabolaMotion(firstUnit);
  // await backwardParabolaMotion1.start();

  // const action = new ThrowWebAction(firstUnit, entityFactory);
  // await action.execute();

  // const stanceMotion2 = new StanceMotion(firstUnit);
  // setTimeout(() => stanceMotion2.stop(), 500);
  // await stanceMotion2.start();

  // const backwardParabolaMotion2 = new BackwardParabolaMotion(firstUnit);
  // await backwardParabolaMotion2.start();

  // const stanceMotion3 = new StanceMotion(firstUnit);
  // setTimeout(() => stanceMotion3.stop(), 500);
  // await stanceMotion3.start();

  // const backwardParabolaMotion3 = new BackwardParabolaMotion(firstUnit);
  // await backwardParabolaMotion3.start();

  // const backwardParabolaMotion4 = new BackwardParabolaMotion(firstUnit);
  // await backwardParabolaMotion4.start();

  // const backwardParabolaMotion5 = new BackwardParabolaMotion(firstUnit);
  // await backwardParabolaMotion5.start();

  // const backwardParabolaMotion6 = new BackwardParabolaMotion(firstUnit);
  // await backwardParabolaMotion6.start();

  // const stanceMotion4 = new StanceMotion(firstUnit);
  // await stanceMotion4.start();
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
