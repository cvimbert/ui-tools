import { Injectable } from '@angular/core';
import { GraphViewComponent } from './components/graph-view/graph-view.component';
import { BaseGraphItemComponent } from './components/base-graph-item/base-graph-item.component';
import { GraphLink } from './graph-link.class';
import { Point } from '../common/geometry/interfaces/point.interface';
import { GraphScene } from './graph-scene.class';
import { DataBank } from '../common/data/data-bank.class';
import { TemporaryLink } from './temporary-link.class';
import { GraphItem } from './graph-item.class';
import { GraphConfiguration } from './graph-configuration.class';
import { GraphAnchorComponent } from './components/graph-anchor/graph-anchor.component';
import { GraphTimer } from './graph-timer.class';
import { GraphTrigger } from './graph-trigger.class';
import { GraphAnchor } from './graph-anchor.class';
import { Variable } from './game-structures/variable/variable.class';
import { MatDialog } from '@angular/material/dialog';
import { AnchorItem } from './interfaces/anchor-item.interface';
import { GraphTarget } from './interfaces/graph-target.interface';
import { GenericMessageModalComponent } from './components/generic-message-modal/generic-message-modal.component';
import { GenericModalActions } from './generic-modal-actions.class';
import { OutLink } from './out-link.class';
import { Argument } from './interfaces/argument.interface';
import { ArgumentValue } from './argument-value.class';
import { Observable } from 'rxjs';
import { AddAnchorModalComponent } from './components/add-anchor-modal/add-anchor-modal.component';
import { AddAnchorModalData } from './interfaces/add-anchor-modal-data.interface';
import { SerializableAnchorItem } from './serializable-anchor-item.class';
import { ArgumentsEditorModalComponent } from './components/arguments-editor-modal/arguments-editor-modal.component';
import { ElectronService } from 'ngx-electron';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  componentId: string;

  mainView: GraphViewComponent;
  items: { [key: string]: BaseGraphItemComponent } = {};
  links: GraphLink[] = [];
  scene: GraphScene;
  mainScene: Phaser.Scene;
  canvasContainerOffset: Point;

  tempLink: TemporaryLink;
  private pTempDrawing = false;

  graphItems: DataBank<GraphItem>;
  graphTimerItems: DataBank<GraphTimer>;
  graphTriggerItems: DataBank<GraphTrigger>;
  graphAnchorItems: DataBank<GraphAnchor>;
  variableItems:DataBank<Variable>;
  

  targetDrawAnchor: GraphAnchorComponent;
  initialDrawAnchor: GraphAnchorComponent;

  providers: { [key: string]: DataBank<any> };

  constructor(
    private dialog: MatDialog,
    electronService: ElectronService
  ) {
    this.graphItems = new DataBank<GraphItem>(GraphConfiguration.GRAPH_ITEMS_BIS_STORAGE_KEY, GraphItem, electronService);
    this.graphTimerItems = new DataBank<GraphTimer>(GraphConfiguration.GRAPH_TIMERS_STORAGE_KEY, GraphTimer, electronService);
    this.graphTriggerItems = new DataBank<GraphTrigger>(GraphConfiguration.GRAPH_TRIGGERS_STORAGE_KEY, GraphTrigger, electronService);
    this.graphAnchorItems = new DataBank<GraphAnchor>(GraphConfiguration.GRAPH_ANCHORS_STORAGE_KEY, GraphAnchor, electronService);
    this.variableItems = new DataBank<Variable>(GraphConfiguration.VARIABLE_STORAGE_KEY, Variable, electronService);
  }

  set tempDrawing(value: boolean) {
    this.pTempDrawing = value;
    this.mainView.update();
  }

  get tempDrawing(): boolean {
    return this.pTempDrawing;
  }

  addAnchor(item: GraphItem, anchors: AnchorItem[], inOut: string) {
    this.dialog.open(AddAnchorModalComponent, {
      data: <AddAnchorModalData>{
        anchors: anchors.filter(anchor => {
          return anchor.displayCondition ? anchor.displayCondition() : true;
        }),
        graphItem: item
      }
    }).afterClosed().subscribe((serializableItem: SerializableAnchorItem) => {
      if (serializableItem) {
        item.pushItem(serializableItem, inOut);

        // arguments
        let anchor = anchors.find(anchor => anchor.id === serializableItem.type);        

        if (anchor.arguments) {

          this.displayArgumentModal(anchor.arguments).subscribe(args => {
            if (args) {
              serializableItem.arguments = args;
              
              // et dans les anchors affichées
              //anchor.argumentValues = args;

              let anchorToUpdate = item.inAnchors.find(anc => anc.id === serializableItem.id);
              anchorToUpdate.argumentValues = args;

              this.mainView.update();
            }
          });
        }
      }
    });
  }

  displayArgumentModal(argsDic: { [key: string]: Argument }, values?: ArgumentValue[]): Observable<ArgumentValue[]> {

    let data: Object = {
      arguments: argsDic
    };

    if (values) {
      data["values"] = values;
    }

    return this.dialog.open(ArgumentsEditorModalComponent, {
      data: data
    }).afterClosed();
  }

  getGraphItemByTarget(target: GraphTarget) {
    return this.graphItems.items.find(item => item.targetItem === target);
  }

  registerItemComponent(id: string, item: BaseGraphItemComponent) {
    this.items[id] = item;
  }

  getItemComponent(id: string): BaseGraphItemComponent {
    return this.items[id];
  }

  createLink(from: any, to: any): GraphLink {
    let link = new GraphLink(this);
    link.fromItem = this.getItemComponent(from["item"]);
    link.fromAnchor = from["anchor"];
    link.toItem = this.getItemComponent(to["item"]);
    link.toAnchor = to["anchor"];
    link.scene = this.scene;

    link.subscribeToPositions();

    this.links.push(link);

    return link;
  }

  createLinkFromData(graphItemData: GraphItem, linkData: OutLink): GraphLink {
    let fromData: any = {
      item: graphItemData.id,
      anchor: linkData.localProperty
    };

    let toData: any = {
      item: linkData.targetObject,
      anchor: linkData.targetProperty
    };

    let link = this.createLink(fromData, toData);
    link.graphItemData = graphItemData;
    link.linkData = linkData;
    return link;
  }

  startDrawTemporaryLink(anchor: GraphAnchorComponent) {
    // console.log("start draw");
    this.tempDrawing = true;
    this.scene.input.on("pointerup", this.stopDrawTemporaryLink, this);
    this.initialDrawAnchor = anchor;

    // console.log(anchor.data.id);
    
    this.tempLink = new TemporaryLink(anchor.data.id, this.scene, anchor.getClientPosition());
  }

  stopDrawTemporaryLink() {
    if (this.tempLink) {
      this.scene.input.off("pointerup", this.stopDrawTemporaryLink);
      this.tempLink.destroy();

      if (this.targetDrawAnchor) {
        // ajout du lien au modèle

        // se fier aux tag d'anchor, in ou out pour création des datas
        let targetProp = this.targetDrawAnchor.data.id;
        let targetObject = this.targetDrawAnchor.parentItem.data.id;
        let localProp = this.initialDrawAnchor.data.id;
        
        let link = new OutLink();
        link.localProperty = localProp;
        link.targetProperty = targetProp;
        link.targetObject = targetObject;

        this.initialDrawAnchor.parentItem.data.outLinks.push(link);
        this.initialDrawAnchor.parentItem.drawChildLink(link);
      }

      this.tempLink = null;
      this.tempDrawing = false;
    }
  }

  tryDeleteLink(link: GraphLink) {
    this.dialog.open(GenericMessageModalComponent, {
      data: {
        text: "Delete this link ?"
      }
    }).afterClosed().subscribe((value: string) => {
      if (value === GenericModalActions.YES) {
        this.deleteLink(link);
      }
    });
  }

  deleteLink(link: GraphLink) {
    let index = this.links.indexOf(link);
    this.links.splice(index, 1);
    link.destroy();
  }

  tryDeleteItem(item: BaseGraphItemComponent) {
    this.dialog.open(GenericMessageModalComponent, {
      data: {
        text: "Delete item ?"
      }
    }).afterClosed().subscribe((value: string) => {
      if (value === GenericModalActions.YES) {
        this.graphItems.delete(item.data);

        // Suppression des liens inter-objets
        
        // Attention, ces suppressions mélangent modèle et display, ce qui n'est pas très clean
        // Dans l'idéal, suppression des liens du modèle, et l'affichage doit en découler
        // mais en attendant ça fera l'affaire...

        // 1- Liens au départ de l'objet
        item.links.forEach(link => link.destroy());

        // 2- Liens arrivant à l'objet
        this.links
          .filter(link => link.linkData.targetObject === item.data.id)
          .forEach(link => link.destroy());

        this.mainView.update();
      }
    });
  }

  playAnchor(anchor: AnchorItem, graphItem: GraphItem) {
    if (anchor.callback) {
      anchor.callback(anchor.argumentValues);
    } else {
      this.playOut(anchor, graphItem);
    }
  }

  playOut(anchor: AnchorItem, graphItem: GraphItem) {
    // GraphUtils.timeLog("play out: " + graphItem.id + " -> " + anchor.id);

    let outLinks = graphItem.outLinks.filter(link => link.localProperty === anchor.id);
    let baseItem = this.mainView.itemComponents.find(item => item.data.id === graphItem.id);

    // c'est ici qu'on highlight tous les graphlinks
    baseItem.links.filter(link => link.linkData.localProperty === anchor.id).forEach(link => link.highlight());

    outLinks.forEach(link => {
      let targetItem = this.graphItems.items.find(item => item.id === link.targetObject);      
      let targetProp = targetItem.inAnchors.find(anchor => anchor.id === link.targetProperty);

      if (!targetProp) {
        console.warn("No targetProp for", targetItem);
        return;
      }

      this.playIn(targetProp, targetItem);
    });
  }

  playAllIn(inAnchor: AnchorItem, graphItem: GraphItem) {
    // GraphUtils.timeLog("play in: " + graphItem.id + " -> " + inAnchor.id);

    // pas clean de filtrer sur les callback, on devrait le faire sur un type
    let incs = graphItem.outAnchors.filter(anchor => anchor.type === inAnchor.id);
    
    incs.forEach(inc => {
      this.playIn(inc, graphItem);
      this.playOut(inc, graphItem);
    });
  }

  deleteAnchor(anchor: AnchorItem, graphItem: GraphItem) {
    this.dialog.open(GenericMessageModalComponent, {
      data: {
        text: "Delete anchor ?"
      }
    }).afterClosed().subscribe((resp: string) => {
      if (resp === GenericModalActions.YES) {
        let anc = graphItem.inActiveAnchors.find(inAnchor => inAnchor.id === anchor.id);
        let prov = graphItem.inActiveAnchors;

        if (!anc) {
          anc = graphItem.outActiveAnchors.find(outAnchor => outAnchor.id === anchor.id);
          prov = graphItem.outActiveAnchors;
        }

        if (anc) {
          let index = prov.indexOf(anc);
          prov.splice(index, 1);
          graphItem.generateAnchors();
        } else {
          console.warn("No anchor to delete.");
        }
      }
    });
  }

  playIn(inAnchor: AnchorItem, graphItem: GraphItem) {
    // GraphUtils.timeLog("play in: " + graphItem.id + " -> " + inAnchor.id);

    // on doit activer tous les liens du type donné
    let baseItem = this.mainView.itemComponents.find(item => item.data.id === graphItem.id);
    
    baseItem.getAnchor(inAnchor.id).highlight();

    if (inAnchor.callback) {
      inAnchor.callback(inAnchor.argumentValues);
    }
  }

  createGraphItem(type: string, target: GraphTarget): GraphItem {
    let item = this.graphItems.createItem({
      description: "",
      name: ""
    });

    item.type = type;
    item.itemId = target.id;

    // Peut-être pas une bonne idée de passer la target dans l'objet... à voir
    // A priori plus utile, c'est fait ailleurs
    item.targetItem = target;
    item.targetItem.parentGraphItem = item;
    item.graphService = this;

    return item;
  }

  editItem(graphItem: GraphItem) {

  }

  loadGraphItems() {
    console.log(this.componentId);
    
    this.graphItems.load(this.componentId);
    this.graphTimerItems.load(this.componentId);
    this.graphTriggerItems.load(this.componentId);
    this.graphAnchorItems.load(this.componentId);
    this.variableItems.load(this.componentId);
  }

  saveGraphItems() {
    this.graphItems.save(this.componentId);
    this.graphTimerItems.save(this.componentId);
    this.graphTriggerItems.save(this.componentId);
    this.graphAnchorItems.save(this.componentId);
    this.variableItems.save(this.componentId);
  }

}
