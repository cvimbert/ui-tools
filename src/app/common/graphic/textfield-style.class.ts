import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject("TextfieldStyle")
export class TextfieldStyle {

    @JsonProperty("fontSize", Number)
    fontSize = 20;

    @JsonProperty("fontFamily", String)
    fontFamily = "Arial";

    @JsonProperty("color", String)
    color = "#000000";

    @JsonProperty("align", String)
    align = "left";
}