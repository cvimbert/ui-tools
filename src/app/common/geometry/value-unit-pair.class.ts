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

    clone() {
        return new ValueUnitPair(this.value, this.unity);
    }

    // TODO: à compléter, si besoin (pas besoin sur l'unité par défaut peut être mise à px)
    unityEquals(valueForComparison: ValueUnitPair): boolean {
        return;
    }

    equals(valueForComparison: ValueUnitPair): boolean {
        return this.value == valueForComparison.value && this.unity == valueForComparison.unity;
    }

    setTo(valuePair: ValueUnitPair) {
        this.value = valuePair.value;
        this.unity = valuePair.unity;
    }
}