import { FlexibleRectangle } from '../geometry/flexible-rectangle.class';
import { Rectangle } from '../geometry/interfaces/rectangle.interface';
import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject("GraphicObjectContainer")
export class GraphicObjectContainer extends FlexibleRectangle {

    // peut être pas utile
    @JsonProperty("objectType", String)
    objectType = "";

    // le parent devrait aussi se trouver ici

    constructor(
        rect?: Rectangle,
        parent?: FlexibleRectangle
    ) {
        super(rect, parent);
    }
}