import { FlexibleRectangle } from '../geometry/flexible-rectangle.class';
import { ComponentEditorScene } from 'src/app/component-editor/component-editor-scene.class';
import { Rectangle } from '../geometry/interfaces/rectangle.interface';

export class Image extends FlexibleRectangle {

    image: Phaser.GameObjects.Image;

    constructor(
        scene: ComponentEditorScene,
        textureId: string,
        rect?: Rectangle,
        parent?: FlexibleRectangle
    ) {
        super(rect, parent);
        this.image = scene.add.image(this.x, this.y, textureId).setOrigin(0, 0);
        this.width = this.image.width;
        this.height = this.image.height;
    }

    render() {
        this.calculate();
        this.image.x = this.x;
        this.image.y = this.y;
        this.image.rotation = this.rotation;
    }
}