import { PanelEntryType } from './panel-entry-type.enum';

export interface AdditionnalPanelEntry {
    id: string;
    name: string;
    type: PanelEntryType;
}