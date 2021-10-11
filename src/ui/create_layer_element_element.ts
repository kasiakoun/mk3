import { ParallaxLayerElement } from '../arenas/common/parallax_layer_element';

export function createParallaxLayerElementElement(parallaxLayerElement: ParallaxLayerElement) {
  const layerElementElement = document.createElement('div');

  const layerElement = parallaxLayerElement.arenaLayerElement;

  layerElementElement.style.background = `url(${layerElement.link}) no-repeat`;
  layerElementElement.style.width = `${layerElement.width}px`;
  layerElementElement.style.height = `${layerElement.height}px`;
  layerElementElement.style.top = `${layerElement.position.y}px`;
  layerElementElement.style.left = `${layerElement.position.x}px`;
  layerElementElement.style.position = 'absolute';
  layerElementElement.style.zIndex = `${layerElement.zIndex}`;

  layerElementElement.style.top = `${parallaxLayerElement.position.y}px`;
  layerElementElement.style.left = `${parallaxLayerElement.position.x}px`;

  return layerElementElement;
}
