import { FlexibleRectangle } from '../geometry/flexible-rectangle.class';
import { Rectangle } from '../geometry/interfaces/rectangle.interface';
import { JsonObject, JsonProperty } from 'json2typescript';
import { ComponentEditorScene } from 'src/app/component-editor/component-editor-scene.class';
import { OriginDisplayer } from './origin-displayer.class';

@JsonObject("GraphicObjectContainer")
export class GraphicObjectContainer extends FlexibleRectangle {

    @JsonProperty("objectType", String)
    objectType = "";

    // le parent devrait aussi se trouver ici
    scene: ComponentEditorScene;

    private _selected = false;
    selectionRect: Phaser.GameObjects.Rectangle;
    originDisplayer: OriginDisplayer;

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
            this.createSelectionRect();
            this.createOriginDisplayer();
        } else if (!value && this._selected) {
            this.destroySelectionRect();
            this.destroyOriginDisplayer();
        }

        this._selected = value;
    }

    createSelectionRect() {
        if (!this.selectionRect) {
            this.selectionRect = this.scene.add.rectangle(this.x.value, this.y.value, this.width.value, this.height.value);
            this.selectionRect.setStrokeStyle(1, 0x000000);
            this.drawSelection();
        }
    }

    destroySelectionRect() {
        if (this.selectionRect) {
            this.selectionRect.destroy();
            this.selectionRect = null;
        }
    }

    createOriginDisplayer() {
        if (!this.originDisplayer) {
            this.originDisplayer = new OriginDisplayer(this.scene);
        }
    }

    destroyOriginDisplayer() {
        if (this.originDisplayer) {
            this.originDisplayer.destroy();
            this.originDisplayer = null;
        }
    }

    render() {
        super.render();

        if (this._selected) {
            this.drawSelection();
            this.placeOriginDisplayer();
        }
    }

    drawSelection() {
        if (this.selectionRect) {
            // console.log("draw selection");
                        
            this.selectionRect.setPosition(this.x.value, this.y.value);
            this.selectionRect.setSize(this.width.value, this.height.value);

            // console.log(this.width.value);

            this.selectionRect.width = this.width.value;
            this.selectionRect.height = this.height.value;
            

            this.selectionRect.setOrigin(this.xOrigin.value, this.yOrigin.value);
            this.selectionRect.rotation = this.rotation.value;
            this.selectionRect.setScale(this.scaleX.value, this.scaleY.value);

            this.selectionRect.update();
        }
    }

    placeOriginDisplayer() {
        if (this.originDisplayer) {
            // console.log("yep");
            let x = this.x.value + this.width.value * this.xOrigin.value;
            let y = this.y.value + this.height.value + this.yOrigin.value;

            // console.log(x);
            
            this.originDisplayer.setPosition(x, y);
            
            this.originDisplayer.x = x;
            this.originDisplayer.y = y;
        }
    }
}