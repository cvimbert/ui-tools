import { FlexibleRectangle } from '../geometry/flexible-rectangle.class';
import { Rectangle } from '../geometry/interfaces/rectangle.interface';
import { ComponentEditorScene } from 'src/app/component-editor/component-editor-scene.class';
import { GraphicObjectContainer } from './graphic-object-container.class';
import { JsonObject } from 'json2typescript';

@JsonObject("BasicRectSprite")
export class BasicRectSprite extends GraphicObjectContainer {

    private sprite: Phaser.GameObjects.Rectangle;
    scene: ComponentEditorScene;

    constructor() {
        super();
    }

    initWithScene(
        scene: ComponentEditorScene,
        rect?: Rectangle,
        parent?: FlexibleRectangle
    ) {
        super.initWithScene(scene, rect, parent);
        
        this.sprite = this.scene.add.rectangle(this.x.value, this.y.value, this.width.value, this.height.value, 0xffff00, 1).setOrigin(this.xOrigin.value, this.yOrigin.value);
        this.afterInit();
        this.render();
    }

    render() {  
        this.calculate();        

        this.sprite.x = this.x.value;
        this.sprite.y = this.y.value;
        this.sprite.rotation = this.rotation.value;
        this.sprite.setOrigin(this.xOrigin.value, this.yOrigin.value);

        this.sprite.alpha = this.alpha.value;
        this.sprite.setDisplaySize(this.width.value, this.height.value);

        super.render();
    }

    setVisibility(value: boolean) {
        this.sprite.visible = value;
        super.setVisibility(value);
    }

    destroy() {
        this.sprite.destroy();
        super.destroy();
    }
}