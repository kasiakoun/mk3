import { convertJsonToSpriteSheet } from '../converters/convert_json_to_sprite_sheet';
import { ProjectileName } from '../entities/projectile_name';
import { UnitName } from '../entities/unit_name';
import { SpriteSheet } from '../animations/sprite_sheet';

export async function createSpriteSheet(unitName: UnitName): Promise<SpriteSheet> {
  const json = await import(`../assets/data/sprites/${unitName}.json`);

  return await convertJsonToSpriteSheet(json);
}

export async function createProjectileSpriteSheet(name: ProjectileName): Promise<SpriteSheet> {
  const json = await import(`../assets/data/sprites/${name}.json`);

  return await convertJsonToSpriteSheet(json);
}
