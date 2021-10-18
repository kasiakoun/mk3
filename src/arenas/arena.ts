import { log } from 'console';
import { inject, injectable } from 'inversify';
import { Entity } from '../entities/entity';
import { Projectile } from '../entities/projectile';
import { EntityFactory } from '../factories/entity_factory';
import { Observable } from '../observable';

@injectable()
export class Arena {
  readonly entities: Entity[] = [];
  readonly entityAdded: Observable<Entity> = new Observable();
  readonly entityRemoved: Observable<Entity> = new Observable();

  constructor(@inject(nameof<EntityFactory>())
              private readonly entityFactory: EntityFactory) {
    this.entityFactory.entityCreated.subscribe(p => this.onEntityCreated(p));
  }

  private onEntityCreated(entity: Entity) {
    this.entities.push(entity);
    this.entityAdded.fire(entity);

    console.log(`Entity ${entity.name} was created`);

    // todo: temp code to know when object is needed to remove
    if (entity instanceof Projectile) {
      entity.updated.subscribe(() => this.onUpdated(entity));
    }
  }

  private onUpdated(entity: Entity) {
    const index = this.entities.indexOf(entity);
    if (index < 0) return;

    // todo: temp condition to check removing
    if (entity.transform.cartesianPosition.x < 900) return;

    this.entities.splice(index, 1);

    this.entityRemoved.fire(entity);

    console.log(`Entity ${entity.name} was removed`);
  }
}
