import { Entity } from '../entities/entity';
import { ProjectileName } from '../entities/projectile_name';
import { ThrowMotion } from '../motions/throw_motion';
import { EntityFactory } from '../factories/entity_factory';
import { container } from '../inversify.config';
import { WebFlyingMotion } from '../motions/web_flying_motion';

export class ThrowWebAction {
  private readonly entityFactory: EntityFactory;
  constructor (private readonly entity: Entity) {
    this.entityFactory = container.get<EntityFactory>(nameof<EntityFactory>());
  }

  async execute() {
    const cartesianPosition = this.entity.transform.cartesianPosition;
    const projectile = await this.entityFactory
      .createProjectile(ProjectileName.CyraxWeb, cartesianPosition);

    const flyingMotion = new WebFlyingMotion(projectile);
    flyingMotion.start();

    const throwMotion = new ThrowMotion(this.entity);
    await throwMotion.start();
  }
}
