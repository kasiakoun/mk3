import { inject, injectable } from 'inversify';
import { EntityFactory } from '../../factories/entity_factory';
import { Observable } from '../../observable';
import { Entity } from '../entity';

@injectable()
export class CollisionDetector {
  private readonly entities: Entity[] = [];
  readonly collided: Observable<Entity, Entity> = new Observable();

  constructor(@inject(nameof<EntityFactory>())
              private readonly entityFactory: EntityFactory) {
    this.entityFactory.entityCreated.subscribe(entity => this.onEntityCreated(entity));
  }

  private onEntityCreated(entity: Entity) {
    this.entities.push(entity);
    entity.updated.subscribe(updatedEntity => this.onDetectCollision(updatedEntity));
  }

  private onDetectCollision(updatedEntity: Entity) {
    if (this.entities.indexOf(updatedEntity) < 0) return;

    this.entities.forEach((entity) => {
      const collisitionDetected = this.detectCollision(updatedEntity, entity);
      if (collisitionDetected) {
        this.collided.fire(updatedEntity, entity);
        console.log(`collision detected: ${updatedEntity.name} with ${entity.name}`);
      }
    });
  }

  private detectCollision(entity1: Entity, entity2: Entity) {
    if (entity1 === entity2) return false;

    const entityCoordinates1 = entity1.getRectangle();
    const entityCoordinates2 = entity2.getRectangle();

    const delta = 25;

    if (entityCoordinates1.bottom < entityCoordinates2.top + delta) return false;
    if (entityCoordinates1.top > entityCoordinates2.bottom - delta) return false;
    if (entityCoordinates1.right < entityCoordinates2.left + delta) return false;
    if (entityCoordinates1.left > entityCoordinates2.right - delta) return false;

    return true;
  }
}
