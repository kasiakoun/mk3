import { Point } from '../../point';

export class ArenaLayerElement {
  constructor(readonly link: string,
              readonly width: number,
              readonly height: number,
              readonly zIndex: number,
              readonly position: Point) {}
}
