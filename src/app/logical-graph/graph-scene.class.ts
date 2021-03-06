import { GraphService } from './graph.service';
import { Point } from '../common/geometry/interfaces/point.interface';

export class GraphScene extends Phaser.Scene {

  private downPoint: Point;
  private isDown = false;

  constructor(
    public graphService: GraphService
  ) {
    super({
      key: "GraphScene"
    });
  }

  preload() {

  }

  create() {
    this.input.on("pointerdown", this.onPointerDown, this);
  }

  onPointerDown(pointer: Phaser.Input.Pointer) {
    this.downPoint = { x: pointer.downX, y: pointer.downY };

    if (!this.isDown) {
      this.input.on("pointermove", this.onPointerMove, this);
      this.isDown = true;
    }
  }

  onPointerUp() {    
    if (this.isDown) {
      this.input.off("pointermove", this.onPointerMove);
      this.isDown = false;
    }
  }

  onPointerMove(pointer: Phaser.Input.Pointer) {
    let xv = pointer.worldX - this.downPoint.x;
    let yv = pointer.worldY - this.downPoint.y;

    this.downPoint.x += xv;
    this.downPoint.y += yv;

    this.graphService.graphOffset.x += xv;
    this.graphService.graphOffset.y += yv;

    this.graphService.mainView.update();

    this.graphService.mainView.redrawAllLinks();
  }
}