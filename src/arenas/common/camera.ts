import { inject, injectable } from 'inversify';
import { CoordinateConverter } from '../../converters/coordinate_converter';
import { Observable } from '../../observable';
import { Point } from '../../point';
import { ArenaView } from './arena_view';
import { Parallax } from './parallax';
import { ParallaxLayerElement } from './parallax_layer_element';

@injectable()
export class Camera {
  readonly width: number = 400;
  readonly height: number = 254;
  readonly positionChanged: Observable<Point, ParallaxLayerElement[]> = new Observable();

  #cartesianPosition: Point;
  #position: Point;

  get position(): Point {
    return this.#position;
  }

  private set position(val: Point) {
    this.#position = this.alignPosition(val);
    const parallaxElements = this.parallax.move(this.position);
    this.positionChanged.fire(this.position, parallaxElements);
  }

  get cartesianPosition(): Point {
    return this.#cartesianPosition;
  }

  set cartesianPosition(val: Point) {
    this.#cartesianPosition = val;
    const screenPosition = this.coordinateConverter.convertCartesianToScreen(val);
    this.position = screenPosition;
  }

  constructor(@inject(nameof<CoordinateConverter>())
              readonly coordinateConverter: CoordinateConverter,
              @inject(nameof<ArenaView>())
              readonly arenaView: ArenaView,
              @inject(nameof<Parallax>())
              readonly parallax: Parallax) {
    this.cartesianPosition = new Point(0, 0);
  }

  private alignPosition(position: Point): Point {
    const clonedPosition = Object.assign({}, position);

    const maxCameraPositionX = this.arenaView.width - this.width;
    const maxCameraPositionY = this.arenaView.height - this.height;

    if (position.x > maxCameraPositionX) clonedPosition.x = maxCameraPositionX;
    if (position.x < 0) clonedPosition.x = 0;

    if (position.y > maxCameraPositionY) clonedPosition.y = maxCameraPositionY;
    if (position.y < 0) clonedPosition.y = 0;

    return clonedPosition;
  }

  shiftPosition(x: number, y: number) {
    this.position.x += x;
    this.position.y += y;

    this.position = this.position;
  }
}
