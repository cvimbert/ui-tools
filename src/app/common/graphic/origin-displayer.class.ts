export class OriginDisplayer extends Phaser.GameObjects.Graphics {
  
  constructor(
    scene: Phaser.Scene
  ) {
    super(scene, {
      fillStyle: {
        color: 0xffffff
      },
      lineStyle: {
        width: 1,
        color: 0x000000
      }
    });

    let circle = scene.add.circle(0, 0, 8, 0xffffff);
    circle.setStrokeStyle(1, 0x000000);
  }
}