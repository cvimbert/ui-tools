import { FlexibleRectangle } from '../geometry/flexible-rectangle.class';
import { Rectangle } from '../geometry/interfaces/rectangle.interface';
import { ComponentEditorScene } from 'src/app/component-editor/component-editor-scene.class';

export class BasicRectSprite extends FlexibleRectangle {

    private sprite: Phaser.GameObjects.Rectangle;
    private selectionRect: Phaser.GameObjects.Rectangle;

    private children: Phaser.GameObjects.Shape[] = [];

    constructor(
        private scene: ComponentEditorScene,
        rect?: Rectangle
    ) {
        super(rect);        
        this.sprite = this.scene.add.rectangle(this.x, this.y, this.width, this.height, 0xffff00, 1).setOrigin(0, 0);

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
                this.x = dragX;
                this.y = dragY;
                this.render();
            }
        });
        ///////

        this.children.push(this.sprite);

        this.select();
    }

    select() {
        this.selectionRect = this.scene.add.rectangle(this.x, this.y, this.width, this.height).setOrigin(0, 0);
        this.selectionRect.setStrokeStyle(1, 0x000000);

        this.children.push(this.selectionRect);
    }

    unselect() {

    }

    set resizable(value: boolean) {
        
    }

    render() {        
        this.children.forEach(child => {
            child.x = this.x;
            child.y = this.y;
        });
    }
}