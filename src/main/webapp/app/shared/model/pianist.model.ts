import { IScore } from 'app/shared/model/score.model';
import { IEntry } from 'app/shared/model/entry.model';

export interface IPianist {
  id?: number;
  number?: number;
  scores?: IScore[];
  entries?: IEntry[];
}

export const defaultValue: Readonly<IPianist> = {};
