import { FlexibleRectangle } from '../geometry/flexible-rectangle.class';
import { ComponentEditorScene } from 'src/app/component-editor/component-editor-scene.class';
import { Rectangle } from '../geometry/interfaces/rectangle.interface';
import { NineSlice } from 'phaser3-nineslice';

export class NineSliceImage extends FlexibleRectangle {

    image: NineSlice;

    constructor(
        private scene: ComponentEditorScene,
        textureName: string,
        sliceSize: number,
        rect?: Rectangle,
        parent?: FlexibleRectangle
    ) {
        super(rect, parent);

        this.image = scene.add.nineslice(
            this.x, this.y,
            this.width, this.height,
            textureName,
            sliceSize, sliceSize
        );
    }

    render() {
        this.calculate();

        this.image.x = this.x;
        this.image.y = this.y;
        this.image.rotation = this.rotation;

        this.image.resize(this.width, this.height);
    }
}