import { createProjectileSpriteSheet } from '../factories/sprite_sheet_factory';
import { CoordinateConverter } from '../converters/coordinate_converter';
import { Entity } from '../entities/entity';
import { Projectile } from '../entities/projectile';
import { ProjectileName } from '../entities/projectile_name';
import { LinearMotion } from '../motions/linear_motion';
import { ThrowMotion } from '../motions/throw_motion';
import { EntityFactory } from '../factories/entity_factory';

export class ThrowWebAction {
  constructor (private readonly entity: Entity,
               private readonly coordinateConverter: CoordinateConverter,
               private readonly entityFactory: EntityFactory) {}

  async execute() {
    const cartesianPosition = this.entity.transform.cartesianPosition;
    const projectile = await this.entityFactory
      .createProjectile(ProjectileName.CyraxWeb, cartesianPosition);

    const linearMotion = new LinearMotion(projectile, this.coordinateConverter);
    linearMotion.start();

    const throwMotion = new ThrowMotion(this.entity, this.coordinateConverter);
    await throwMotion.start();
  }
}
