import { Unity } from './unity.enum';

export class ValueUnitPair {
    value: number;
    unity = Unity.PIXEL;

    constructor(
        value?: number
    ) {
        this.value = value;
    }
}