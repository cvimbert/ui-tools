import { FlexibleRectangle } from '../geometry/flexible-rectangle.class';
import { Rectangle } from '../geometry/interfaces/rectangle.interface';
import { ComponentEditorScene } from 'src/app/component-editor/component-editor-scene.class';
import { AnchorPosition } from './anchor-position.class';

export class ResizingOverlay extends FlexibleRectangle {

    private container: Phaser.GameObjects.Container;
    private anchors: { [key: string]: Phaser.GameObjects.Rectangle } = {};

    private XAXIS = "x";
    private YAXIS = "y";

    private POSITIONS = [
        AnchorPosition.TOP,
        AnchorPosition.TOP_RIGHT,
        AnchorPosition.RIGHT,
        AnchorPosition.BOTTOM_RIGHT,
        AnchorPosition.BOTTOM,
        AnchorPosition.BOTTOM_LEFT,
        AnchorPosition.LEFT,
        AnchorPosition.TOP_LEFT
    ];

    TOPS = [
        AnchorPosition.TOP,
        AnchorPosition.TOP_RIGHT,
        AnchorPosition.TOP_LEFT
    ];

    TOP_ANCHORS: Phaser.GameObjects.Rectangle[];

    BOTTOMS = [
        AnchorPosition.BOTTOM_RIGHT,
        AnchorPosition.BOTTOM,
        AnchorPosition.BOTTOM_LEFT,
    ];

    BOTTOM_ANCHORS: Phaser.GameObjects.Rectangle[];

    VCENTERED = [
        AnchorPosition.LEFT,
        AnchorPosition.RIGHT
    ];

    LEFTS = [
        AnchorPosition.BOTTOM_LEFT,
        AnchorPosition.LEFT,
        AnchorPosition.TOP_LEFT
    ];

    LEFT_ANCHORS: Phaser.GameObjects.Rectangle[];

    RIGHTS = [
        AnchorPosition.TOP_RIGHT,
        AnchorPosition.RIGHT,
        AnchorPosition.BOTTOM_RIGHT,
    ];

    RIGHT_ANCHORS: Phaser.GameObjects.Rectangle[];

    HCENTERED = [
        AnchorPosition.TOP,
        AnchorPosition.BOTTOM
    ];

    constructor(
        rect: FlexibleRectangle,
        private scene: ComponentEditorScene
    ) {
        super(null, rect);

        this.POSITIONS.forEach(position => {
            let rect = scene.add.rectangle(0, 0, 10, 10, 0x000000);

            rect.setInteractive({
                useHandCursor: true,
                draggable: true
            });

            rect.setStrokeStyle(1, 0xffffff);
            this.anchors[position] = rect;
        });

        scene.input.on('drag', this.onDrag, this);

        this.TOP_ANCHORS = this.getAnchors(this.TOPS);
        this.BOTTOM_ANCHORS = this.getAnchors(this.BOTTOMS);
        this.LEFT_ANCHORS = this.getAnchors(this.LEFTS);
        this.RIGHT_ANCHORS = this.getAnchors(this.RIGHTS);

        this.render();
    }

    onDrag(pointer: any, gameObject: Phaser.GameObjects.Rectangle, dragX: number, dragY: number) {

        // Pas forcément nécessaire
        if (this.TOP_ANCHORS.indexOf(gameObject) !== -1) {
            
        }

        gameObject.x = dragX;
        gameObject.y = dragY;

        // this.render();
    }
    
    getAnchors(ids: string[]): Phaser.GameObjects.Rectangle[] {
        return ids.map(id => this.anchors[id]);
    }

    render() {
        let leftX = this.x.value;
        let centerX = this.x.value + this.width .value/ 2;
        let rightX = this.x.value + this.width.value;

        let topY = this.y.value;
        let centerY = this.y.value + this.height.value / 2;
        let bottomY = this.y.value + this.height.value;

        // On X
        this.setVal(this.LEFTS, this.XAXIS, leftX);
        this.setVal(this.HCENTERED, this.XAXIS, centerX);
        this.setVal(this.RIGHTS, this.XAXIS, rightX);

        // On Y
        this.setVal(this.TOPS, this.YAXIS, topY);
        this.setVal(this.VCENTERED, this.YAXIS, centerY);
        this.setVal(this.BOTTOMS, this.YAXIS, bottomY);
    }

    setVal(anchorIds: string[], prop: string, value: number) {

        anchorIds.forEach(id => {
            switch (prop) {
                case this.XAXIS:
                    this.anchors[id].x = value;
                    break;
    
                case this.YAXIS:
                    this.anchors[id].y = value;
                    break;
            }
        });
    }

    destroy() {
        // TODO
        this.scene.input.off("drag", this.onDrag);
    }
}