import { IEntry } from 'app/shared/model/entry.model';

export interface ICourse {
  id?: number;
  name?: string;
  teacher?: string;
  entries?: IEntry[];
}

export const defaultValue: Readonly<ICourse> = {};
