import { injectable } from 'inversify';

@injectable()
export class Game {
  public readonly cameraWidth: number = 400;
  public readonly cameraHeight: number = 254;
}
