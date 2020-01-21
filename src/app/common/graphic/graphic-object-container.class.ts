import { FlexibleRectangle } from '../geometry/flexible-rectangle.class';
import { Rectangle } from '../geometry/interfaces/rectangle.interface';
import { JsonObject, JsonProperty } from 'json2typescript';
import { ComponentEditorScene } from 'src/app/component-editor/component-editor-scene.class';

@JsonObject("GraphicObjectContainer")
export class GraphicObjectContainer extends FlexibleRectangle {

    @JsonProperty("objectType", String)
    objectType = "";

    // le parent devrait aussi se trouver ici
    scene: ComponentEditorScene;

    private _selected = false;
    selectionRect: Phaser.GameObjects.Rectangle;

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

    get selected(): boolean {
        return this._selected;
    }

    set selected(value: boolean) {

        if (value && !this._selected) {
            if (!this.selectionRect) {
                this.selectionRect = this.scene.add.rectangle(this.x.value, this.y.value, this.width.value, this.height.value);
                this.selectionRect.setStrokeStyle(1, 0x000000);
            } 
        } else if (!value && this._selected) {
            if (this.selectionRect) {
                this.selectionRect.destroy();
                this.selectionRect = null;
            }
        }

        this._selected = value;
    }

    render() {
        super.render();

        if (this._selected) {
            this.drawSelection();
        }
    }

    drawSelection() {
        if (this.selectionRect) {
            this.selectionRect.setPosition(this.x.value, this.y.value);
            this.selectionRect.setSize(this.width.value, this.height.value);
            this.selectionRect.setOrigin(this.xOrigin.value, this.yOrigin.value);
            this.selectionRect.rotation = this.rotation.value;
            this.selectionRect.setScale(this.scaleX.value, this.scaleX.value);
        }
    }
}