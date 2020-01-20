import { Unity } from './unity.enum';
import { JsonProperty, JsonObject, Any } from 'json2typescript';

@JsonObject("ValueUnitPair")
export class ValueUnitPair {

    @JsonProperty("value", Number)
    value: number = null;

    @JsonProperty("unity", Any)
    unity: Unity = null;

    constructor(
        value: number = null,
        unity: Unity = null
    ) {
        this.value = value;
        this.unity = unity;
    }
}