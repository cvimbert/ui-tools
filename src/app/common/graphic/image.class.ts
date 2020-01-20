import { FlexibleRectangle } from '../geometry/flexible-rectangle.class';
import { ComponentEditorScene } from 'src/app/component-editor/component-editor-scene.class';
import { Rectangle } from '../geometry/interfaces/rectangle.interface';
import { GraphicObjectContainer } from './graphic-object-container.class';

export class Image extends GraphicObjectContainer {

    image: Phaser.GameObjects.Image;

    constructor(
        scene: ComponentEditorScene,
        textureId: string,
        rect?: Rectangle,
        parent?: FlexibleRectangle
    ) {
        super();
    }

    initWithScene(
        scene: ComponentEditorScene,
        rect?: Rectangle,
        parent?: FlexibleRectangle
    ) {
        this.image = scene.add.image(this.x.value, this.y.value, "").setOrigin(this.xOrigin.value, this.yOrigin.value);
        this.width.value = this.image.width;
        this.height.value = this.image.height;
    }

    render() {
        this.calculate();
        this.image.x = this.x.value;
        this.image.y = this.y.value;
        this.image.rotation = this.rotation.value;
    }
}