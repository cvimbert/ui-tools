import { GraphService } from './graph.service';
import { Point } from '../common/geometry/interfaces/point.interface';

export class GraphScene extends Phaser.Scene {

  downPoint: Point;

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
    this.input.on("pointermove", this.onPointerMove, this);
    this.input.on("pointerup", this.onPointerUp, this);
  }

  onPointerUp() {
    this.input.off("pointermove", this.onPointerMove);
    this.input.off("pointerup", this.onPointerUp);
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