import { FlexibleRectangle } from '../geometry/flexible-rectangle.class';
import { Rectangle } from '../geometry/interfaces/rectangle.interface';
import { ResizingOverlay } from './resizing-overlay.class';
import { ComponentEditorScene } from 'src/app/component-editor/component-editor-scene.class';

export class BasicRectSprite extends FlexibleRectangle {

    name: string;

    private sprite: Phaser.GameObjects.Rectangle;
    private selectionRect: Phaser.GameObjects.Rectangle;
    private pivotDisplay: Phaser.GameObjects.Graphics;
    private resizeOverlay: ResizingOverlay;

    private children: Phaser.GameObjects.Shape[] = [];

    constructor(
        private scene: ComponentEditorScene,
        rect?: Rectangle,
        parent?: FlexibleRectangle
    ) {
        super(rect, parent);
            
        this.sprite = this.scene.add.rectangle(this.x.value, this.y.value, this.width.value, this.height.value, 0xffff00, 1).setOrigin(this.xOrigin.value, this.yOrigin.value);

        // Only for editor mode
        this.sprite.setInteractive({
            useHandCursor: true,
            draggable: true
        });

        this.sprite.on("pointerdown", () => {
            scene.editorService.selectObject(this);
        });

        scene.input.on('drag', (pointer: any, gameObject: Phaser.GameObjects.Rectangle, dragX: number, dragY: number) => {
            if (gameObject === this.sprite) {
                this.x.value = dragX;
                this.y.value = dragY;
                this.render();
            }
        });
        ///////

        this.children.push(this.sprite);
    }

    select() {
        this.drawSelectionRect();
        this.children.push(this.selectionRect);
    }

    drawSelectionRect() {
        if (this.selectionRect) {
            this.selectionRect.destroy();
        }

        this.selectionRect = this.scene.add.rectangle(this.x.value, this.y.value, this.width.value, this.height.value).setOrigin(this.xOrigin.value, this.yOrigin.value);
        this.selectionRect.setStrokeStyle(1, 0x000000);
    }

    unselect() {
        if (this.selectionRect) {
            this.selectionRect.destroy();
            this.selectionRect = undefined;
        }
    }

    set resizable(value: boolean) {
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
    }

    set viewPivot(value: boolean) {
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
                        // console.log("hit");
                    }
                });
            }
        } else {
            if (this.pivotDisplay) {
                this.pivotDisplay.destroy();
                this.pivotDisplay = undefined;
            }
        }
    }

    render() {  
        this.calculate();

        this.children.forEach(child => {            
            child.x = this.x.value;
            child.y = this.y.value;
            child.width = this.width.value;
            child.height = this.height.value;           
        });

        this.sprite.alpha = this.alpha.value;
        this.sprite.setSize(this.width.value, this.height.value);
        this.selectionRect.setSize(this.width.value, this.height.value);
    }
}