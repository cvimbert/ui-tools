import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject("ComponentSettings")
export class ComponentSettings {

    @JsonProperty("sceneWidth", Number)
    sceneWidth = 400;

    @JsonProperty("sceneHeight", Number)
    sceneHeight = 200;
}