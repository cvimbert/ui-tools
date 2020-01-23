import { PanelEntryType } from './panel-entry-type.enum';

export interface AdditionnalPanelEntry {
    name: string;
    type: PanelEntryType;
    selectValues?: string[];
    getter: () => any;
    setter: (value: any) => void;
}