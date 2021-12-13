import { inject, injectable } from 'inversify';
import { SpriteSheet } from '../animations/sprite_sheet';
import { CoordinateConverter } from '../converters/coordinate_converter';
import { Cyrax } from '../entities/cyrax';
import { Entity } from '../entities/entity';
import { Projectile } from '../entities/projectile';
import { ProjectileName } from '../entities/projectile_name';
import { Unit } from '../entities/unit';
import { UnitName } from '../entities/unit_name';
import { MoveEnabler } from '../movements/move_enabler';
import { Observable } from '../observable';
import { Point } from '../point';
import { createProjectileSpriteSheet, createSpriteSheet } from './sprite_sheet_factory';

@injectable()
export class EntityFactory {
  @inject(nameof<CoordinateConverter>())
  private readonly coordinateConverter: CoordinateConverter;

  readonly entityCreated: Observable<Entity> = new Observable();

  async createUnit(unitName: UnitName, cartesianPosition: Point): Promise<Unit> {
    const spriteSheet = await createSpriteSheet(unitName);
    const unit = this.createUnitByUnitName(unitName, spriteSheet, cartesianPosition);

    this.entityCreated.fire(unit);

    return unit;
  }

  private createUnitByUnitName(unitName: UnitName,
                               spriteSheet: SpriteSheet,
                               cartesianPosition: Point): Unit {
    switch (unitName) {
      case UnitName.Cyrax:
        return new Cyrax(spriteSheet, cartesianPosition);
    }
  }

  async createProjectile(name: ProjectileName, cartesianPosition: Point): Promise<Entity> {
    const spriteSheet = await createProjectileSpriteSheet(name);
    const projectile = new Projectile(spriteSheet, cartesianPosition);

    this.entityCreated.fire(projectile);

    return projectile;
  }
}
