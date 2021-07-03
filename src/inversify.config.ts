import { Container } from 'inversify';
// this import reflect-metadata row has to be after inversify and before other memebers
import 'reflect-metadata';
import { } from 'ts-nameof';
import { Game } from './game';
import { CoordinateConverter } from './converters/coordinate_converter';

export const container = new Container();
container.bind<Game>(nameof<Game>()).to(Game);
container.bind<CoordinateConverter>(nameof<CoordinateConverter>()).to(CoordinateConverter);
