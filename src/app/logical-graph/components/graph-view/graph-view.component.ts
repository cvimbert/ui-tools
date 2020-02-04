import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList, HostListener, ChangeDetectionStrategy, ChangeDetectorRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GraphScene } from '../../graph-scene.class';
import { BaseItemData } from '../../interfaces/base-item-data.interface';
import { GraphService } from '../../graph.service';
import { BaseGraphItemComponent } from '../base-graph-item/base-graph-item.component';
import { DataBank } from 'src/app/common/data/data-bank.class';
import { GraphTarget } from '../../interfaces/graph-target.interface';
import { GraphTargetSelectionModalComponent } from '../graph-target-selection-modal/graph-target-selection-modal.component';
import { GraphItemType } from '../../graph-item-type.class';
import { GraphItem } from '../../graph-item.class';
import { Point } from 'electron';

@Component({
  selector: 'graph-view',
  templateUrl: './graph-view.component.html',
  styleUrls: ['./graph-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphViewComponent implements OnInit, OnChanges {

  banks: { [key: string]: DataBank<any> } = {
    [GraphItemType.TIMER]: this.graphService.graphTimerItems,
    [GraphItemType.TRIGGER]: this.graphService.graphTriggerItems,
    [GraphItemType.ANCHOR]: this.graphService.graphAnchorItems,
    [GraphItemType.VARIABLE]: this.graphService.variableItems
  };

  @Input() width: number = 900;
  @Input() height: number = 500;
  @Input() itemsProviders: { [key: string]: DataBank<any> };
  @Input() mainScene: Phaser.Scene;
  @Input() bounds: DOMRect;

  @ViewChild("canvasElement") canvasElement: ElementRef;
  @ViewChild("canvasContainer") canvasContainer: ElementRef;
  @ViewChildren("itemComponent") itemComponents: QueryList<BaseGraphItemComponent>;

  graphScene: GraphScene;
  game: Phaser.Game;

  selectedGraphItemType = GraphItemType.ITEMS_LIST[0];

  items: BaseItemData[];

  constructor(
    public graphService: GraphService,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {

    this.graphService.loadGraphItems();

    this.graphService.mainView = this;
    this.graphService.mainScene = this.mainScene;
    this.graphScene = new GraphScene(this.graphService);
    this.graphService.scene = this.graphScene;

    
    let config: Phaser.Types.Core.GameConfig = {
      type: Phaser.WEBGL,
      width: this.width,
      height: this.height,
      scale: {
        mode: Phaser.Scale.NONE
      },
      scene: this.graphScene,
      backgroundColor: '#d3d3d3',
      parent: this.canvasElement.nativeElement
    }; 

    this.items = [];
    this.game = new Phaser.Game(config);
    
    // en attendant mieux
    setTimeout(() => {
      // attention, possibilité de fonctionnement asynchrone ici
      this.calculateOffsetContainer();

      this.setCanvasSize();
      this.loadPositions();
      this.createAllLinks();
    });

    // on set ici toutes les targets, à savoir si c'est une bonne idée...
    // effectivement non, ça ne se fait qu'à l'init...
    this.graphService.graphItems.items.forEach(item => {
      this.initGraphItem(item);
    });
  }

  calculateOffsetContainer() {
    let offsetRect: DOMRect = this.canvasContainer.nativeElement.getBoundingClientRect();

    this.graphService.canvasContainerOffset = {
      x: offsetRect.left,
      y: offsetRect.top
    };

    console.log("calculate");
    
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes);

    // Utile ???
    if (changes["itemsProviders"]) {
      this.graphService.providers = this.itemsProviders;

      for (let key in this.itemsProviders) {
        this.banks[key] = this.itemsProviders[key];
      }
    }

    if (changes["bounds"]) {
      this.setCanvasSize();
    }
  }

  initGraphItem(item: GraphItem) {
    let tItem = this.banks[item.type].getItemById(item.itemId);
    item.init(tItem, this.graphService);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
      this.setCanvasSize();
      this.calculateOffsetContainer();
  }

  setCanvasSize() {
    if (this.game) {
      this.game.scale.resize(this.bounds.width, this.bounds.height);
    }
  }

  addGraphItem() {

    let modalComponent: any = GraphItemType.ITEMS_CREATION_MODAL_COMPONENT[this.selectedGraphItemType] || GraphTargetSelectionModalComponent;

    this.dialog.open(modalComponent, {
      data: {
        type: this.selectedGraphItemType
      }
    }).afterClosed().subscribe((target: GraphTarget) => {      
      if (target) {
        let newItem = this.graphService.createGraphItem(this.selectedGraphItemType, target);
        this.initGraphItem(newItem);
        this.update();
      }
    });
  }

  update() {
    this.cdRef.detectChanges();
  }

  get graphItemsList(): string[] {
    return GraphItemType.ITEMS_LIST;
  }

  loadPositions() {
    let comps: { [key: string]: BaseGraphItemComponent } = {};

    this.itemComponents.forEach(item => {
      comps[item.data.id] = item;
    });

    this.createLinks();
  }

  createLinks() {
    /* this.testLinks.forEach(link => {
      this.graphService.createLink(link["from"], link["to"]);
    }); */
  }

  redrawAllLinks() {
    this.graphService.links.forEach(link => {
        link.drawLink(0x000000, this.graphService.graphOffset);
    });
  }

  createAllLinks() {
    this.itemComponents.forEach(item => item.drawChildrenLinks());
  }

  get graphItems(): GraphItem[] {
    return this.graphService.graphItems.items;
  }

  saveAll() {
    // bientôt plus utile (à priori)
    // this.savePositions();

    this.graphService.saveGraphItems();
  }

  startScrollGraph(x: number, y: number) {
    this.graphService.graphOffset.x += x * 10;
    this.graphService.graphOffset.y += y * 10;

    setTimeout(() => this.redrawAllLinks());
  }

  stopScrollGraph() {

  }
}
