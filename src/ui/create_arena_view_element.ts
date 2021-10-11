import { ArenaView } from '../arenas/common/arena_view';
import { ParallaxLayerElement } from '../arenas/common/parallax_layer_element';
import { createParallaxLayerElementElement } from './create_layer_element_element';

export function createArenaViewElement(arenaView: ArenaView,
                                       parallaxElements: ParallaxLayerElement[]): Element {
  const arenaElement = document.createElement('div');

  arenaElement.className = 'arena-element';
  arenaElement.style.width = `${arenaView.width}px`;
  arenaElement.style.height = `${arenaView.height}px`;
  arenaElement.style.background = '#303 no-repeat';
  arenaElement.style.position = 'relative';

  parallaxElements.forEach((parallaxLayerElement) => {
    const layerElementElement = createParallaxLayerElementElement(parallaxLayerElement);
    arenaElement.append(layerElementElement);
  });

  return arenaElement;
}
