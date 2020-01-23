import { FlexibleRectangle } from '../../geometry/flexible-rectangle.class';
import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject("GraphicObjectState")
export class GraphicObjectState extends FlexibleRectangle {

    static stateCloneProperties = [
        "mode",
        "x",
        "y",
        "width",
        "height",
        "rotation",
        "scaleX",
        "scaleY",
        "alpha",
        "top",
        "right",
        "bottom",
        "left"
    ];

    static animatedProperties = [
        "mode",
        "x",
        "y",
        "width",
        "height",
        "rotation",
        "scaleX",
        "scaleY",
        "alpha"
    ];

    @JsonProperty("targetObjectId", String)
    targetObjectId = "";
}