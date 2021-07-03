import { convertJsonToSpriteSheet } from '../converters/convert_json_to_sprite_sheet';
import { UnitName } from '../entities/unit_name';
import { SpriteSheet } from './sprite_sheet';

export function createSpriteSheet(unitName: UnitName): SpriteSheet {
  const json = require(`../assets/data/sprites/${unitName}.json`);

  return convertJsonToSpriteSheet(json);
}
