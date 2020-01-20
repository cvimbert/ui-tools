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
        super();
    }

    render() {
        this.calculate();

        this.image.x = this.x.value;
        this.image.y = this.y.value;
        this.image.rotation = this.rotation.value;

        this.image.resize(this.width.value, this.height.value);
    }
}