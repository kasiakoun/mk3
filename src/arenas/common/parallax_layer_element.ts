import { Point } from '../../point';
import { ArenaLayerElement } from './arena_layer_element';

export class ParallaxLayerElement {
  constructor(readonly arenaLayerElement: ArenaLayerElement,
              readonly position: Point) {}
}
