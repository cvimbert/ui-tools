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

        // Only for editor mode
        this.sprite.setInteractive({
            useHandCursor: true,
            draggable: true
        });

        this.sprite.on("pointerdown", () => {
            this.scene.editorService.selectObject(this);
        });

        /*this.scene.input.on('drag', (pointer: any, gameObject: Phaser.GameObjects.Rectangle, dragX: number, dragY: number) => {
            if (gameObject === this.sprite) {
                this.x.value = dragX;
                this.y.value = dragY;
                this.render();
            }
        });*/
        ///////

        // this.children.push(this.sprite);

        // super.init(rect, parent);

        this.render();
    }

    /*select() {
        this.drawSelectionRect();
        this.children.push(this.selectionRect);
    }*/

    /*drawSelectionRect() {
        if (this.selectionRect) {
            this.selectionRect.destroy();
        }

        this.selectionRect = this.scene.add.rectangle(this.x.value, this.y.value, this.width.value, this.height.value).setOrigin(this.xOrigin.value, this.yOrigin.value);
        this.selectionRect.setStrokeStyle(1, 0x000000);
    }*/

    /*unselect() {
        if (this.selectionRect) {
            this.selectionRect.destroy();
            this.selectionRect = undefined;
        }
    }*/

    /*set resizable(value: boolean) {
        if (value) {
            if (!this.resizeOverlay) {
                this.resizeOverlay = new ResizingOverlay(this, this.scene);
            }
        } else {
            if (this.resizeOverlay) {
                this.resizeOverlay.destroy();
                this.resizeOverlay = undefined;
            }
        }
    }*/

    /*set viewPivot(value: boolean) {
        if (value) {
            if (!this.pivotDisplay) {
                this.pivotDisplay = this.scene.add.graphics({
                    fillStyle: {
                        color: 0x000000
                    }
                });

                this.pivotDisplay.fillCircle(0, 0, 5);

                this.pivotDisplay.setInteractive({
                    useHandCursor: true,
                    draggable: true,
                    hitArea: new Phaser.Geom.Circle(0, 0, 5),
                    hitAreaCallback: () => {
                    }
                });
            }
        } else {
            if (this.pivotDisplay) {
                this.pivotDisplay.destroy();
                this.pivotDisplay = undefined;
            }
        }
    }*/

    render() {  
        this.calculate();        

        this.sprite.x = this.x.value;
        this.sprite.y = this.y.value;
        this.sprite.rotation = this.rotation.value;
        this.sprite.setOrigin(this.xOrigin.value, this.yOrigin.value);

        this.sprite.alpha = this.alpha.value;
        this.sprite.setDisplaySize(this.width.value, this.height.value);
        // this.sprite.setScale(this.scaleX.value, this.scaleY.value);

        super.render();
    }

    destroy() {
        this.sprite.destroy();
        super.destroy();
    }
}