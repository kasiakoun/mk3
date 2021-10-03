import { ArenaName } from '../arenas/arena_name';
import { ArenaView } from '../arenas/common/arena_view';
import { convertJsonToArenaView } from '../converters/convert_json_to_arena_view';

export async function createArenaView(name: ArenaName): Promise<ArenaView> {
  const json = await import(`../assets/data/arenas/${name}.json`);

  return await convertJsonToArenaView(json);
}
