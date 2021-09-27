import { Observable } from '../../observable';
import { Point } from '../../point';
import { ArenaView } from './arena_view';
import { Parallax } from './parallax';
import { ParallaxLayerElement } from './parallax_layer_element';

export class Camera {
  private readonly parallax: Parallax;
  private readonly positionChanged: Observable<Point, ParallaxLayerElement[]> = new Observable();

  #position: Point = new Point(0, 0);

  get position(): Point {
    return this.#position;
  }

  set position(val: Point) {
    this.#position = this.alignPosition(val);
    const parallaxElements = this.parallax.move(this.position);
    this.positionChanged.fire(this.position, parallaxElements);
  }

  constructor(private readonly arena: ArenaView,
              private readonly width: number,
              private readonly height: number) {
    this.parallax = new Parallax(arena);
  }

  private alignPosition(position: Point): Point {
    const clonedPosition = Object.assign({}, position);
    const maxCameraPositionX = this.arena.width - this.width;

    if (position.x > maxCameraPositionX) clonedPosition.x = maxCameraPositionX;
    if (position.x < 0) clonedPosition.x = 0;

    return clonedPosition;
  }

  shiftPosition(x: number, y: number) {
    this.position.x += x;
    this.position.y += y;

    this.position = this.position;
  }
}
