import { FlexibleRectangle } from '../geometry/flexible-rectangle.class';
import { Rectangle } from '../geometry/interfaces/rectangle.interface';

export class BasicRectSprite extends FlexibleRectangle {

    sprite: Phaser.GameObjects.Rectangle;
    private drx: number;
    private dry: number;

    constructor(
        scene: Phaser.Scene,
        rect?: Rectangle
    ) {
        super(rect);
        
        this.sprite = scene.add.rectangle(0, 0, this.width, this.height, 0xffff00, 1).setPosition(this.x, this.y).setOrigin(0, 0);
        
        this.sprite.setInteractive({
            useHandCursor: true,
            draggable: true
        });

        scene.input.on('drag', (pointer: any, gameObject: any, dragX: number, dragY: number) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });
    }
}