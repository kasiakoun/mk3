import { injectable } from 'inversify';

@injectable()
export class Game {
  public readonly arenaWidth: number = 1200;
  public readonly arenaHeight: number = 300;
}
