import { ArenaLayer } from '../arenas/common/arena_layer';
import { ArenaLayerElement } from '../arenas/common/arena_layer_element';
import { ArenaView } from '../arenas/common/arena_view';
import { Point } from '../point';

export async function convertJsonToArenaView(jsonObject: any): Promise<ArenaView> {
  const layers: ArenaLayer[] = [];
  const marginTop = jsonObject.marginTop;
  for (const layer of jsonObject.layers) {
    const arenaLayerElements: ArenaLayerElement[] = [];

    for (const element of layer.elements) {
      const position = new Point(element.x, element.y + marginTop);

      const loadedImage = await import(`../assets/${element.link}`);
      const pathToImage = loadedImage.default;

      const arenaLayerElement = new ArenaLayerElement(pathToImage,
                                                      element.width,
                                                      element.height,
                                                      element.zIndex,
                                                      position);
      arenaLayerElements.push(arenaLayerElement);
    }

    const arenaLayer = new ArenaLayer(arenaLayerElements, layer.speed);
    layers.push(arenaLayer);
  }

  return new ArenaView(jsonObject.width, jsonObject.height + marginTop, layers);
}
