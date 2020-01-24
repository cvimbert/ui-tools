import { BaseDataItem } from '../../data/base-data-item.class';
import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject("SceneTransition")
export class SceneTransition extends BaseDataItem {

    @JsonProperty("targetStateId", String)
    targetStateId = "";

    @JsonProperty("duration", Number)
    duration = 0;

    @JsonProperty("easing", String)
    easing = "";

    constructor() {
        super();
    }
}