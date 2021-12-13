import { inject, injectable } from 'inversify';
import { Entity } from '../entity';
import { ForwardWalkState } from '../states/forward_walk_state';
import { StanceState } from '../states/stance_state';
import { CollisionDetector } from './collision_detector';

@injectable()
export class CollisionResolver {
  constructor(@inject(nameof<CollisionDetector>())
              private readonly collisionDetector: CollisionDetector) {
    this.collisionDetector.collided
      .subscribe((entity1, entity2) => this.onCollided(entity1, entity2));
  }

  private onCollided(entity1: Entity, entity2: Entity) {
    const state1 = entity1.currentState;
    const isWalk1 = state1 instanceof ForwardWalkState;
    const isStance1 = state1 instanceof StanceState;

    const state2 = entity2.currentState;
    const isStance2 = state2 instanceof StanceState;

    if ((isWalk1) && isStance2) {
      // todo: add more flexible mechanism instead of static value
      entity2.transform.offsetX += 4;
    }
  }
}
