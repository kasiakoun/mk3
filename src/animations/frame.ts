import { Point } from '../point';

export class Frame {
  constructor (readonly imageOffset: Point,
               readonly offset: Point,
               readonly width: number,
               readonly height: number) {
  }
}
