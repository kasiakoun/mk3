import { ArenaLayer } from './arena_layer';

export class ArenaView {
  constructor(readonly width: number,
              readonly height: number,
              readonly layers: ArenaLayer[]) {}
}
