import { ArenaLayerElement } from './arena_layer_element';

export class ArenaLayer {
  constructor(readonly elements: ArenaLayerElement[],
              readonly speed: number) {}
}
