import { inject, injectable } from 'inversify';
import { EntityFactory } from '../../factories/entity_factory';
import { Entity } from '../entity';
import { Unit } from '../unit';
import { UpdateState } from '../update_state';
import { TurnResolver } from './turn_resolver';

@injectable()
export class TurnDetector {
  private readonly units: Unit[] = [];

  constructor(@inject(nameof<EntityFactory>())
              private readonly entityFactory: EntityFactory,
              @inject(nameof<TurnResolver>())
              private readonly turnResolver: TurnResolver) {
    this.entityFactory.entityCreated.subscribe(entity => this.onUnitCreated(entity));
  }

  private onUnitCreated(entity: Entity) {
    const unit = entity as Unit;
    if (!unit) return;

    this.units.push(unit);
    unit.updated.subscribe((updatedEntity, state) => this.onUnitUpdated(updatedEntity, state));
  }

  private onUnitUpdated(entity: Entity, updateState: UpdateState) {
    if (!updateState.position) return;

    const unit1 = entity as Unit;
    const unit2 = this.units.find(unit => unit !== unit1);
    if (!unit2) {
      throw new Error('The second Unit was not found in units');
    }

    if (unit1.turned) {
      const rectangle1 = unit1.getRectangle();
      const delta = 0;
      const middlePositionX = (rectangle1.left + rectangle1.right) / 2 + delta;
      if (unit2.transform.cartesianPosition.x > middlePositionX) {
        this.turnResolver.turnUnit(unit1, false);
        this.turnResolver.turnUnit(unit2, true);
      } else if (unit2.turned) {
        this.turnResolver.turnUnit(unit2, false);
      }
    } else {
      const rectangle2 = unit2.getRectangle();
      const delta = 0;
      const middlePositionX = (rectangle2.left + rectangle2.right) / 2 + delta;
      if (unit1.transform.cartesianPosition.x > middlePositionX) {
        this.turnResolver.turnUnit(unit1, true);
        this.turnResolver.turnUnit(unit2, false);
      } else if (!unit2.turned) {
        this.turnResolver.turnUnit(unit2, true);
      }
    }
  }
}
