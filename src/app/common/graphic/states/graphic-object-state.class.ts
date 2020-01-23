import { FlexibleRectangle } from '../../geometry/flexible-rectangle.class';
import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject("GraphicObjectState")
export class GraphicObjectState extends FlexibleRectangle {

    @JsonProperty("targetObjectId", String)
    targetObjectId = "";
}