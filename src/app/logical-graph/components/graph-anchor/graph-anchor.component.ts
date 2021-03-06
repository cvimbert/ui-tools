import { Component, OnInit, Input, ElementRef, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { BaseGraphItemComponent } from '../base-graph-item/base-graph-item.component';
import { AnchorItem } from '../../interfaces/anchor-item.interface';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Argument } from '../../interfaces/argument.interface';
import { Point } from 'src/app/common/geometry/interfaces/point.interface';
import { GraphService } from '../../graph.service';
import { GraphConfiguration } from '../../graph-configuration.class';

@Component({
  selector: 'graph-anchor',
  templateUrl: './graph-anchor.component.html',
  styleUrls: ['./graph-anchor.component.scss'],
  animations: [
    trigger('highlightable', [
      state('highlighted', style({
        color: "#000000",
        backgroundColor: "#ffffff"
      })),
      state('released', style({
        color: "#ffffff",
        backgroundColor: "transparent"
      })),
      transition('released => highlighted', animate('10ms linear')),
      transition('highlighted => released', animate('500ms linear')),
    ])
  ]
})
export class GraphAnchorComponent implements OnInit, OnDestroy {

  @ViewChild("banchor") bAnchor: ElementRef;
  @Input() type: string;
  @Input() data: AnchorItem;
  @Input() id: string;
  @Input() parentItem: BaseGraphItemComponent;
  highlighted = false;
  highlightedState = "released";
  highlightingTimeout: any;

  constructor(
    public element: ElementRef,
    public graphService: GraphService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.cdRef.detach();
  }

  onOver() {
    this.graphService.targetDrawAnchor = this;
  }

  onOut() {
    this.graphService.targetDrawAnchor = null;
  }

  onMouseUp() {
    if (this.graphService.tempDrawing) {
      this.graphService.stopDrawTemporaryLink();
    }
  }

  highlight() {
    this.highlighted = true;
    this.highlightedState = "highlighted";
    this.cdRef.detectChanges();

    this.highlightingTimeout = setTimeout(() => {
      this.highlighted = false;
      this.highlightedState = "released";
      this.cdRef.detectChanges();
    }, GraphConfiguration.highlightingTimeoutDelay);
  }

  breakHighlight() {
    this.highlighted = false;
    this.highlightedState = "released";
    clearTimeout(this.highlightingTimeout);
  }

  onAnchorClicked() {
    this.graphService.startDrawTemporaryLink(this);
  }

  deleteAnchor(evt: MouseEvent) {
    evt.stopPropagation();
    this.graphService.deleteAnchor(this.data, this.parentItem.data);
  }

  getClientPosition(): Point {
    let rect: DOMRect = this.bAnchor.nativeElement.getBoundingClientRect();
    
    return {
      x: rect.left + rect.width / 2 - this.graphService.canvasContainerOffset.x,
      y: rect.top + rect.height / 2 - this.graphService.canvasContainerOffset.y
    }
  }

  hasArgs(): boolean {    
    return this.data.argumentValues.length > 0;
  }

  getLabel(): string {
    if (this.data.nameGetter) {
      return (this.data.nameGetter(this.data.argumentValues));
    } else {
      return this.data.label;
    }
  }

  displayArgs(evt: MouseEvent) {
    evt.stopPropagation();

    let argsDic: { [key: string]: Argument } = this.parentItem.data.targetItem.inAnchors.find(anchor => anchor.id === this.data.type).arguments;    
    this.graphService.displayArgumentModal(argsDic, this.data.argumentValues).subscribe(args => {

      if (args) {
        this.data.argumentValues = args;

        let elem = this.parentItem.data.inActiveAnchors.find(anchor => anchor.type === this.data.type);
        elem.arguments = args;

        this.graphService.mainView.update();
      }
    });
  }
}
