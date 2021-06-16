import { Observable } from '../observable';
import { Transform } from '../transform';

export interface Entity {
  transform: Transform;
  updated: Observable;
}
