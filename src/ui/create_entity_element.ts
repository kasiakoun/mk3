import { Entity } from '../entities/entity';

export function createEntityElement(entity: Entity): Element {
  const entityElement = document.createElement('div');

  entityElement.style.background = `url(${entity.spriteSheet.image}) no-repeat`;
  entityElement.style.position = 'absolute';
  entityElement.style.zIndex = '10000000';
  if (entity.spriteSheet.currentFrame) {
    entityElement.style.width = `${entity.spriteSheet.currentFrame.width}px`;
    entityElement.style.height = `${entity.spriteSheet.currentFrame.height}px`;
    entityElement.style.backgroundPosition = `-${entity.spriteSheet.currentFrame.imageOffset.x}px -${entity.spriteSheet.currentFrame.imageOffset.y}px`;
  }

  if (entity.turned) {
    entityElement.style.transform = 'scaleX(-1)';
  }

  // unitElement.style.width = '1px';
  // unitElement.style.height = '1px';
  // unitElement.style.backgroundColor = 'black';

  // entityElement.style.border = '1px solid red';

  entityElement.style.marginLeft = `${entity.transform.position.x}px`;
  entityElement.style.marginTop = `${entity.transform.position.y}px`;

  // entityElement.innerHTML = `${entity.transform.position.x}`;

  return entityElement;
}
