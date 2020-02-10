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
        "width",
        "height",
        "rotation",
        "scaleX",
        "scaleY",
        "alpha",
        "x",
        "y",
        "top",
        "right",
        "bottom",
        "left"
    ];

    static XYProperties = [
        
    ];

    static TRBLProperties = [
        
    ];

    @JsonProperty("targetObjectId", String)
    targetObjectId = "";
}