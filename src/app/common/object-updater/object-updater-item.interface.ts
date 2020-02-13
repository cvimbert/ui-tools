import { ObjectUpdaterAction } from './object-updater-action.enum';

export interface ObjectUpdaterItem {
  action: ObjectUpdaterAction;
  keyName: string;
  args: any | any[] | Function;
}