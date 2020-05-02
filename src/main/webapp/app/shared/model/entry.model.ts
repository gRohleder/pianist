import { IPianist } from 'app/shared/model/pianist.model';
import { ICourse } from 'app/shared/model/course.model';

export interface IEntry {
  id?: number;
  name?: string;
  pianist?: IPianist;
  course?: ICourse;
}

export const defaultValue: Readonly<IEntry> = {};
