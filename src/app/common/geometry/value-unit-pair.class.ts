import { Unity } from './unity.enum';
import { JsonProperty, JsonObject, Any } from 'json2typescript';

@JsonObject("ValueUnitPair")
export class ValueUnitPair {

    @JsonProperty("value", Number)
    value: number;

    @JsonProperty("unity", Any)
    unity = Unity.PIXEL;

    constructor(
        value?: number
    ) {
        this.value = value;
    }
}