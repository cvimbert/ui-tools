import { Unity } from './unity.enum';

export class ValueUnitPair {
    value: number;
    unity = Unity.POINT;

    constructor(
        value?: number
    ) {
        this.value = value;
    }
}