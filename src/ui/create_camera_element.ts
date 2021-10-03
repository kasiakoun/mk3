import { Camera } from '../arenas/common/camera';

export function createCameraElement(camera: Camera): Element {
  const cameraElement = document.createElement('div');

  cameraElement.className = 'camera-element';
  cameraElement.style.width = `${camera.width}px`;
  cameraElement.style.height = `${camera.height}px`;
  cameraElement.style.overflow = 'hidden';
  cameraElement.style.position = 'relative';

  return cameraElement;
}
