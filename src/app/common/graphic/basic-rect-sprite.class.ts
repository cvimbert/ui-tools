import { FlexibleRectangle } from '../geometry/flexible-rectangle.class';
import { Rectangle } from '../geometry/interfaces/rectangle.interface';

export class BasicRectSprite extends FlexibleRectangle {

    sprite: Phaser.GameObjects.Rectangle;

    constructor(
        scene: Phaser.Scene,
        rect?: Rectangle
    ) {
        super(rect);
        console.log(this.x);
        
        this.sprite = scene.add.rectangle(0, 0, this.width, this.height, 0xffff00, 0.5).setPosition(this.x, this.y);
    }
}