export class OriginDisplayer extends Phaser.GameObjects.Graphics {
  
  constructor(
    scene: Phaser.Scene
  ) {
    super(scene, {
      fillStyle: {
        color: 0xffffff
      },
      lineStyle: {
        width: 2,
        color: 0x000000
      }
    });
    
    this.x = 40;
    this.y = 40;

    let elem = this.strokeCircle(0, 0, 3);
    elem.fill();

    this.lineStyle(1, 0x000000);
    this.lineBetween(-8, 0, 8, 0);

    this.lineBetween(0, -8, 0, 8);

    scene.add.existing(this);
  }
}