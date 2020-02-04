import { BaseGraphItemComponent } from './components/base-graph-item/base-graph-item.component';
import { GraphScene } from './graph-scene.class';
import { OutLink } from './out-link.class';
import { GraphItem } from './graph-item.class';
import { Subscription, from } from 'rxjs';
import { GraphService } from './graph.service';
import { Point } from '../common/geometry/interfaces/point.interface';
import { GraphConfiguration } from './graph-configuration.class';

export class GraphLink {

  fromItem: BaseGraphItemComponent;
  fromAnchor: string;
  toItem: BaseGraphItemComponent;
  toAnchor: string;
  scene: GraphScene;
  baseRect: Phaser.Geom.Rectangle;
  triangleRect: Phaser.Geom.Rectangle;
  linkData: OutLink;
  graphItemData: GraphItem;

  private lineGraphics: Phaser.GameObjects.Graphics;
  private arrow: Phaser.GameObjects.Graphics;

  fromSubscription: Subscription;
  toSubscription: Subscription;

  private destroyed = false;

  constructor(
    private graphService: GraphService
  ) {

  }

  drawLink(color = 0x000000, offset?: Point) {
    if (!this.scene || !this.scene.add) return;

    if (!this.lineGraphics) {
      this.lineGraphics = this.scene.add.graphics();
    } else {
      this.lineGraphics.clear();
    }

    this.lineGraphics.lineStyle(2, color);

    let fromPoint = this.fromItem.getAnchorComponentPosition(this.fromAnchor);
    let toPoint = this.toItem.getAnchorComponentPosition(this.toAnchor);

    /* if (offset) {
      fromPoint.x += offset.x;
      toPoint.x += offset.x;

      fromPoint.y += offset.y;
      toPoint.y += offset.y;
    } */

    let points = GraphLink.getSplinePoints(toPoint, fromPoint);

    let curve = new Phaser.Curves.Spline(points);
    curve.draw(this.lineGraphics);

    let tPoint = curve.getPoint(0.5);
    let tTangent = curve.getTangent(0.5);
    let angle = Math.atan2(tTangent.y, tTangent.x);

    this.drawArrow(tPoint.x, tPoint.y, angle, color);
  }

  drawArrow(x: number, y: number, rotation: number, color = 0xffffff) {
    if (!this.arrow) {
      this.arrow = this.scene.add.graphics();
      this.scene.input.on("pointerup", this.clickOnScene, this);
    } else {
      this.arrow.clear();
    }

    this.arrow.fillStyle(color);
    this.arrow.fillTriangle(10, -6, 10, 6, -10, 0);
    this.baseRect = new Phaser.Geom.Rectangle(-10, -10, 20, 20);

    this.triangleRect = this.baseRect.setPosition(x - 10, y - 10);
    this.arrow.x = x;
    this.arrow.y = y;
    this.arrow.rotation = rotation;
  }

  clickOnScene(pointer: Phaser.Input.Pointer) {        
    if (
      pointer.x > this.triangleRect.left &&
      pointer.x < this.triangleRect.right &&
      pointer.y > this.triangleRect.top &&
      pointer.y < this.triangleRect.bottom
    ) {
      this.graphService.tryDeleteLink(this);
    }
  }

  highlight(offset: Point) {
    // console.log("Graphlink highlight", this);
    // un simple effet sur l'alpha ou un effet de couleur, avec tween, devraient suffire
    this.applyHighlightFx(offset);

    setTimeout(() => {
      this.removeHighlightFx(offset);
    }, GraphConfiguration.highlightingTimeoutDelay);
  }

  applyHighlightFx(offset?: Point) {
    this.drawLink(0xcc0000, offset);
  }

  removeHighlightFx(offset?: Point) {
    this.drawLink(0x000000, offset);
  }

  static getSplinePoints(from: Point, to: Point): Phaser.Math.Vector2[] {
    
    let xBat = to.x - from.x;
    let yBat = to.y - from.y;

    let yMini = yBat / 8;
    let xQuarter = xBat / 3.5;

    let points: Point[] = [
      { x: from.x, y: from.y },
      { x: from.x + xQuarter, y: from.y + yMini },
      { x: to.x - xQuarter, y: to.y - yMini },
      { x: to.x, y: to.y }
    ];

    return points.map(point => new Phaser.Math.Vector2(point.x, point.y));
  }

  subscribeToPositions() {
    this.fromSubscription = this.fromItem.positionSubject.subscribe(() => {
      this.onMove();
    });
    this.toSubscription = this.toItem.positionSubject.subscribe(() => {
      this.onMove();
    });
  }

  onMove(offset?: Point) {
    this.drawLink(0x000000, offset);
  }

  destroy() {
    if (!this.destroyed) {
      this.lineGraphics.destroy();
      this.lineGraphics = null;
      this.arrow.destroy();
      this.arrow = null;
      this.fromSubscription.unsubscribe();
      this.toSubscription.unsubscribe();
  
      this.graphItemData.removeLink(this.linkData);
    }

    this.destroyed = true;
  }
}