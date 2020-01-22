import { FlexibleRectangle } from '../geometry/flexible-rectangle.class';
import { Rectangle } from '../geometry/interfaces/rectangle.interface';
import { JsonObject, JsonProperty } from 'json2typescript';
import { ComponentEditorScene } from 'src/app/component-editor/component-editor-scene.class';
import { OriginDisplayer } from './origin-displayer.class';
import { AdditionnalPanel } from '../data/interfaces/aditionnal-panels/additionnal-panel.interface';

@JsonObject("GraphicObjectContainer")
export class GraphicObjectContainer extends FlexibleRectangle {

    additionnalPanels: AdditionnalPanel[];

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

        if (value) {
            this.render();
        }
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
            this.selectionRect.setPosition(this.x.value, this.y.value);
            this.selectionRect.setDisplaySize(this.width.value, this.height.value);
            this.selectionRect.setOrigin(this.xOrigin.value, this.yOrigin.value);
            this.selectionRect.rotation = this.rotation.value;
        }
    }

    placeOriginDisplayer() {
        if (this.originDisplayer) {            
            this.originDisplayer.setPosition(this.x.value, this.y.value);
            this.originDisplayer.rotation = this.rotation.value;
        }
    }

    destroy() {
        this.selectionRect.destroy();
        this.originDisplayer.destroy();
    }
}