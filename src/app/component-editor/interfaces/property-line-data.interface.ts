import { Unity } from 'src/app/common/geometry/unity.enum';

export interface PropertyLineData {
    id: string;
    name: string;
    step?: number;
    availableUnities?: Unity[];
}