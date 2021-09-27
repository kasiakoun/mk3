import { ArenaLayer } from '../arenas/common/arena_layer';
import { ArenaLayerElement } from '../arenas/common/arena_layer_element';
import { ArenaView } from '../arenas/common/arena_view';
import { Point } from '../point';

export async function convertJsonToArena(jsonObject: any): Promise<ArenaView> {
  const layers = jsonObject.layers.map((layer: any) => {
    const arenaLayerElements = layer.elements.map((element: any) => {
      const position = new Point(element.x, element.y);

      return new ArenaLayerElement(element.link,
                                   element.width,
                                   element.height,
                                   element.zIndex,
                                   position);
    });

    return new ArenaLayer(arenaLayerElements, layer.speed);
  });

  return new ArenaView(jsonObject.width, jsonObject.height, layers);
}
