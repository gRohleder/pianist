import { IPianist } from 'app/shared/model/pianist.model';
import { LEVEL } from 'app/shared/model/enumerations/level.model';

export interface IScore {
  id?: number;
  name?: string;
  creator?: string;
  howToPlay?: boolean;
  level?: LEVEL;
  pianist?: IPianist;
}

export const defaultValue: Readonly<IScore> = {
  howToPlay: false
};
