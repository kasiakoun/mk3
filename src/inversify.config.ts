import { Container, interfaces } from 'inversify';
// this import reflect-metadata row has to be after inversify and before other memebers
import 'reflect-metadata';
import { } from 'ts-nameof';
import { Game } from './game';
import { CoordinateConverter } from './converters/coordinate_converter';
import { EntityFactory } from './factories/entity_factory';
import { ArenaView } from './arenas/common/arena_view';
import { Arena } from './arenas/arena';
import { Camera } from './arenas/common/camera';
import { Parallax } from './arenas/common/parallax';
import { CameraManager } from './arenas/common/camera_manager';
import { GameTimer } from './game_timer';
import { CollisionDetector } from './entities/collision/collision_detector';
import { CollisionResolver } from './entities/collision/collision_resolver';
import { TurnDetector } from './entities/turn/turn_detector';
import { TurnResolver } from './entities/turn/turn_resolver';

export const container = new Container();
container.bind<Game>(nameof<Game>()).to(Game).inSingletonScope();
container.bind<CoordinateConverter>(nameof<CoordinateConverter>())
         .to(CoordinateConverter).inSingletonScope();
container.bind<EntityFactory>(nameof<EntityFactory>()).to(EntityFactory).inSingletonScope();
container.bind<Arena>(nameof<Arena>()).to(Arena).inSingletonScope();
container.bind<Camera>(nameof<Camera>()).to(Camera).inSingletonScope();
container.bind<Parallax>(nameof<Parallax>()).to(Parallax).inSingletonScope();
container.bind<CameraManager>(nameof<CameraManager>()).to(CameraManager).inSingletonScope();
container.bind<GameTimer>(nameof<GameTimer>()).to(GameTimer).inSingletonScope();
container.bind<CollisionDetector>(nameof<CollisionDetector>())
         .to(CollisionDetector).inSingletonScope();
container.bind<CollisionResolver>(nameof<CollisionResolver>())
         .to(CollisionResolver).inSingletonScope();
container.bind<TurnDetector>(nameof<TurnDetector>())
         .to(TurnDetector).inSingletonScope();
container.bind<TurnResolver>(nameof<TurnResolver>())
         .to(TurnResolver).inSingletonScope();

export function registerArenaView(arenaView: ArenaView) {
  container.bind<ArenaView>(nameof<ArenaView>()).toConstantValue(arenaView);
}
