import { injectable } from 'inversify';
import { CoordinateConverter } from '../converters/coordinate_converter';
import { Entity } from '../entities/entity';
import { Projectile } from '../entities/projectile';
import { ProjectileName } from '../entities/projectile_name';
import { Unit } from '../entities/unit';
import { UnitName } from '../entities/unit_name';
import { Observable } from '../observable';
import { Point } from '../point';
import { createProjectileSpriteSheet, createSpriteSheet } from './sprite_sheet_factory';

@injectable()
export class EntityFactory {
  readonly entityCreated: Observable<Entity> = new Observable();

  constructor(private readonly coordinateConverter: CoordinateConverter) {}

  async createUnit(unitName: UnitName, cartesianPosition: Point): Promise<Entity> {
    const spriteSheet = await createSpriteSheet(unitName);
    const unit = new Unit(spriteSheet, this.coordinateConverter, cartesianPosition);

    this.entityCreated.fire(unit);

    return unit;
  }

  async createProjectile(name: ProjectileName, cartesianPosition: Point): Promise<Entity> {
    const spriteSheet = await createProjectileSpriteSheet(name);
    const projectile = new Projectile(spriteSheet, this.coordinateConverter, cartesianPosition);

    this.entityCreated.fire(projectile);

    return projectile;
  }
}
