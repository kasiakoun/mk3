import { convertJsonToSpriteSheet } from '../converters/convert_json_to_sprite_sheet';
import { UnitName } from '../entities/unit_name';
import { SpriteSheet } from './sprite_sheet';

export async function createSpriteSheet(unitName: UnitName): Promise<SpriteSheet> {
  const json = await import(`../assets/data/sprites/${unitName}.json`);

  return await convertJsonToSpriteSheet(json);
}
