import { Container, interfaces } from 'inversify';
// this import reflect-metadata row has to be after inversify and before other memebers
import 'reflect-metadata';
import { } from 'ts-nameof';
import { Game } from './game';
import { CoordinateConverter } from './converters/coordinate_converter';
import { EntityFactory } from './factories/entity_factory';
import { ArenaView } from './arenas/common/arena_view';

export const container = new Container();
container.bind<Game>(nameof<Game>()).to(Game);

container.bind<(arenaView: ArenaView)
  => CoordinateConverter>(nameof<CoordinateConverter>())
         .toFactory<CoordinateConverter>((context: interfaces.Context) => {
           return (arenaView: ArenaView) => {
             return new CoordinateConverter(arenaView);
           };
         });
export const coordinateConverterFactory = container.get<(arenaView: ArenaView)
  => CoordinateConverter>(nameof<CoordinateConverter>());

container.bind<(сoordinateConverter: CoordinateConverter)
  => EntityFactory>(nameof<EntityFactory>())
         .toFactory<EntityFactory>((context: interfaces.Context) => {
           return (сoordinateConverter: CoordinateConverter) => {
             return new EntityFactory(сoordinateConverter);
           };
         });
export const entityFactoryFactory = container.get<(сoordinateConverter: CoordinateConverter)
  => EntityFactory>(nameof<EntityFactory>());
