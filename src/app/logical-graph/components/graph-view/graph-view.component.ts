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
import { SimpleRectangle } from 'src/app/common/geometry/interfaces/simple-rectangle.class';
import { GraphicObjectContainer } from 'src/app/common/graphic/graphic-object-container.class';

@Component({
  selector: 'graph-view',
  templateUrl: './graph-view.component.html',
  styleUrls: ['./graph-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphViewComponent implements OnInit, OnChanges {

  banks: { [key: string]: DataBank<any> } = {
    // [GraphItemType.TRANSITION]: this.transitionsService,
    [GraphItemType.TIMER]: this.graphService.graphTimerItems,
    [GraphItemType.TRIGGER]: this.graphService.graphTriggerItems,
    [GraphItemType.ANCHOR]: this.graphService.graphAnchorItems,
    [GraphItemType.VARIABLE]: this.graphService.variableItems
  };

  @Input() width: number = 600;
  @Input() height: number = 300;
  @Input() itemsProviders: { [key: string]: GraphicObjectContainer };

  @ViewChild("canvasElement") canvasElement: ElementRef;
  @ViewChild("canvasContainer") canvasContainer: ElementRef;
  @ViewChildren("itemComponent") itemComponents: QueryList<BaseGraphItemComponent>;

  graphScene: GraphScene;
  game: Phaser.Game;
  bounds = new SimpleRectangle(0, 0, 1024, 600);

  //positionsDictionary: DataDictionary<SerializablePoint>;
  selectedGraphItemType = GraphItemType.ITEMS_LIST[0];

  items: BaseItemData[];

  constructor(
    private graphService: GraphService,

    // private cloudService: CloudService,
    // private transitionsService: TransitionsService,

    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef
  ) {
    //this.positionsDictionary = new DataDictionary<SerializablePoint>(Configuration.GRAPH_ITEMS_STORAGE_KEY, SerializablePoint);
  }

  /* @HostListener("document:mouseup", ["$event"])
  onDocumentMouseUp() {
    this.graphService.stopDrawTemporaryLink();
  } */

  ngOnInit() {
    this.graphService.mainView = this;
    this.graphScene = new GraphScene();
    this.graphService.scene = this.graphScene;

    let offsetRect: DOMRect = this.canvasContainer.nativeElement.getBoundingClientRect();

    this.graphService.canvasContainerOffset = {
      x: offsetRect.left,
      y: offsetRect.top
    };

    // console.log(offsetRect, this.graphService.canvasContainerOffset);
    
    let config: Phaser.Types.Core.GameConfig = {
      type: Phaser.WEBGL,
      width: this.width,
      height: this.height,
      scale: {
        mode: Phaser.Scale.NONE
      },
      scene: this.graphScene,
      backgroundColor: '#ffffff',
      parent: this.canvasElement.nativeElement
    }; 

    this.items = [];
    this.game = new Phaser.Game(config);
    
    // en attendant mieux
    setTimeout(() => {
      // attention, possibilité de fonctionnement asynchrone ici
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

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  initGraphItem(item: GraphItem) {
    let tItem = this.banks[item.type].getItemById(item.itemId);

    item.init(tItem, this.graphService);

    // attention, cas particulier
    if (item.type === GraphItemType.TRANSITION) {
      // (<Transition>item.targetItem).cloudService = this.cloudService;
      // (<Transition>item.targetItem).transitionsService = this.transitionsService;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
      this.setCanvasSize();
  }

  setCanvasSize() {
    // this.game.scale.resize(document.body.clientWidth, 600);
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
        link.drawLink();
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
}
