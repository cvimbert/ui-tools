import { FlexibleRectangle } from '../geometry/flexible-rectangle.class';
import { Rectangle } from '../geometry/interfaces/rectangle.interface';
import { JsonObject, JsonProperty } from 'json2typescript';
import { ComponentEditorScene } from 'src/app/component-editor/component-editor-scene.class';

@JsonObject("GraphicObjectContainer")
export class GraphicObjectContainer extends FlexibleRectangle {

    // peut être pas utile
    @JsonProperty("objectType", String)
    objectType = "";

    // le parent devrait aussi se trouver ici
    scene: ComponentEditorScene;

    constructor() {
        super();
    }

    initWithScene(
        scene: ComponentEditorScene,
        rect?: Rectangle,
        parent?: FlexibleRectangle
    ) {
        this.scene = scene;
        this.init(rect, parent);
    }
}