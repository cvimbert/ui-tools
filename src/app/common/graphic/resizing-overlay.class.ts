import { FlexibleRectangle } from '../geometry/flexible-rectangle.class';
import { Rectangle } from '../geometry/interfaces/rectangle.interface';
import { ComponentEditorScene } from 'src/app/component-editor/component-editor-scene.class';
import { AnchorPosition } from './anchor-position.class';

export class ResizingOverlay extends FlexibleRectangle {

    private container: Phaser.GameObjects.Container;
    private anchors: { [key: string]: Phaser.GameObjects.Rectangle } = {};

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

    BOTTOMS = [
        AnchorPosition.BOTTOM_RIGHT,
        AnchorPosition.BOTTOM,
        AnchorPosition.BOTTOM_LEFT,
    ];

    VCENTERED = [
        AnchorPosition.LEFT,
        AnchorPosition.RIGHT
    ];

    LEFTS = [
        AnchorPosition.BOTTOM_LEFT,
        AnchorPosition.LEFT,
        AnchorPosition.TOP_LEFT
    ];

    RIGHTS = [
        AnchorPosition.TOP_RIGHT,
        AnchorPosition.RIGHT,
        AnchorPosition.BOTTOM_RIGHT,
    ];

    HCENTERED = [
        AnchorPosition.TOP,
        AnchorPosition.BOTTOM
    ];

    constructor(
        rect: Rectangle,
        private scene: ComponentEditorScene
    ) {
        super(rect);

        this.POSITIONS.forEach(position => {
            this.anchors[position] = scene.add.rectangle(0, 0, 10, 10, 0x000000);
        });
    }

    render() {
        let leftX = this.x;
        let centerX = this.x + this.width / 2;
        let rightX = this.x + this.width;

        let topY = this.y;
        let centerY = this.y + this.height / 2;
        let bottomY = this.y + this.height;
    }

    setVal(anchorIds: string[], prop: string, value: number) {
        
    }
}