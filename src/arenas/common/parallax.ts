import { inject, injectable } from 'inversify';
import { Point } from '../../point';
import { ArenaLayer } from './arena_layer';
import { ArenaLayerElement } from './arena_layer_element';
import { ArenaView } from './arena_view';
import { ParallaxLayerElement } from './parallax_layer_element';

@injectable()
export class Parallax {
  constructor(@inject(nameof<ArenaView>())
              private readonly arenaView: ArenaView) {}

  getParallaxElementPosition(layer: ArenaLayer, element: ArenaLayerElement, offest: Point): Point {
    const x = element.position.x + ((1 - layer.speed) * offest.x);
    const y = element.position.y;

    return new Point(x, y);
  }

  move(offest: Point): ParallaxLayerElement[] {
    const parallaxLayerElements: ParallaxLayerElement[] = [];

    this.arenaView.layers.forEach((layer: ArenaLayer) => {
      layer.elements.forEach((layerElement: ArenaLayerElement) => {
        const parallaxElementPosition = this
          .getParallaxElementPosition(layer, layerElement, offest);
        const parallaxElement = new ParallaxLayerElement(layerElement, parallaxElementPosition);

        parallaxLayerElements.push(parallaxElement);
      });
    });

    return parallaxLayerElements;
  }
}
