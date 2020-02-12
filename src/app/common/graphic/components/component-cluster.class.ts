import { ElectronService } from 'ngx-electron';
import { DataProvider } from '../../data/data-provider.class';
import { ComponentReference } from './component-reference.class';
import { DataBank } from '../../data/data-bank.class';
import { GraphicObjectContainer } from '../graphic-object-container.class';
import { BasicRectSprite } from '../basic-rect-sprite.class';
import { Image } from '../image.class';
import { NineSliceImage } from '../nine-slice-image.class';
import { Textfield } from '../textfield.class';
import { NodalContainer } from '../nodal-container.class';
import { FlexibleRectangle } from '../../geometry/flexible-rectangle.class';
import { ComponentEditorScene } from 'src/app/component-editor/component-editor-scene.class';
import { GraphItem } from 'src/app/logical-graph/graph-item.class';
import { GraphTimer } from 'src/app/logical-graph/graph-timer.class';
import { GraphTrigger } from 'src/app/logical-graph/graph-trigger.class';
import { GraphAnchor } from 'src/app/logical-graph/graph-anchor.class';
import { GraphConfiguration } from 'src/app/logical-graph/graph-configuration.class';
import { Variable } from 'src/app/logical-graph/game-structures/variable/variable.class';
import { DataConstructors } from '../../data/data-contructors.class';
import { GraphItemType } from 'src/app/logical-graph/graph-item-type.class';
import { AnchorItem } from 'src/app/logical-graph/interfaces/anchor-item.interface';
import { GraphService } from 'src/app/logical-graph/graph.service';
import { SceneTransition } from '../transitions/scene-transition.class';
import { ComponentClusterInterface } from '../../data/interfaces/component-cluster.interface';
import { GraphViewComponent } from 'src/app/logical-graph/components/graph-view/graph-view.component';

export class ComponentCluster implements ComponentClusterInterface {

  dataProvider: DataProvider;

  graphItems: DataBank<GraphItem>;
  graphTimerItems: DataBank<GraphTimer>;
  graphTriggerItems: DataBank<GraphTrigger>;
  graphAnchorItems: DataBank<GraphAnchor>;
  variableItems:DataBank<Variable>;
  transitionItems: DataBank<SceneTransition>;

  mainScene: ComponentEditorScene;

  banks: { [key: string]: DataBank<any> };
  providers: { [key: string]: DataBank<any> };

  // mainView: GraphViewComponent;

  constructor(
    private electronService: ElectronService,
    public reference: ComponentReference,
    private viewport: FlexibleRectangle,
    public scene: ComponentEditorScene,
    private graphService: GraphService
  ) {
    this.dataProvider = new DataProvider(electronService);
    this.dataProvider.loadAll(reference.componentId);
    this.mainScene = scene;

    this.graphItems = new DataBank<GraphItem>(GraphConfiguration.GRAPH_ITEMS_BIS_STORAGE_KEY, GraphItem, electronService, DataConstructors.CONSTRUCTORS);
    this.graphTimerItems = new DataBank<GraphTimer>(GraphConfiguration.GRAPH_TIMERS_STORAGE_KEY, GraphTimer, electronService, DataConstructors.CONSTRUCTORS);
    this.graphTriggerItems = new DataBank<GraphTrigger>(GraphConfiguration.GRAPH_TRIGGERS_STORAGE_KEY, GraphTrigger, electronService, DataConstructors.CONSTRUCTORS);
    this.graphAnchorItems = new DataBank<GraphAnchor>(GraphConfiguration.GRAPH_ANCHORS_STORAGE_KEY, GraphAnchor, electronService, DataConstructors.CONSTRUCTORS);
    this.variableItems = new DataBank<Variable>(GraphConfiguration.VARIABLE_STORAGE_KEY, Variable, electronService, DataConstructors.CONSTRUCTORS);
    this.transitionItems = new DataBank<SceneTransition>(GraphConfiguration.TRANSITIONS_STORAGE_KEY, SceneTransition, electronService, DataConstructors.CONSTRUCTORS);
    

    this.banks = {
      [GraphItemType.TIMER]: this.graphTimerItems,
      [GraphItemType.TRIGGER]: this.graphTriggerItems,
      [GraphItemType.ANCHOR]: this.graphAnchorItems,
      [GraphItemType.VARIABLE]: this.variableItems,
      [GraphItemType.TRANSITION]: this.transitionItems
    };
    // console.log(this.dataProvider);

    this.banks["sceneState"] = this.dataProvider.componentsBanks["scene-states"];
    this.banks["sceneObject"] = this.dataProvider.componentsBanks["scene-objects"];


    this.loadGraphItems();
    
    let bank: DataBank<GraphicObjectContainer> = this.dataProvider.getBank("scene-objects");

    bank.items.forEach(item => {
      switch (item.objectType) {
        case "baseRect":
          (<BasicRectSprite>item).initObject(scene, null, this.viewport);
          break;

        case "image":
          let im = <Image>item;
          im.initObject(im.textureId, scene, null, this.viewport);
          break;

        case "nineSliceImage":
          let nim = <NineSliceImage>item;
          nim.initObject(scene, nim.textureName, nim.sliceSize, null, this.viewport);
          break;

        case "textfield":
          let tim = <Textfield>item;
          tim.initObject(scene, tim.text, null, this.viewport);
          break;

        case "nodalContainer":
          let nodalCont = <NodalContainer>item;
          nodalCont.initObject(scene, null, this.viewport);
          break;

        // Pas de récursivité pour le moment, en attendant la fin des tests sur un niveau
        /* case "componentReference":
          let compRef = <ComponentReference>item;
          compRef.initObject(scene, null, this.viewport);
          let cluster = new ComponentCluster(this.electronService, compRef, compRef, scene);
          break; */
      }
    });

    bank.items.forEach((item: GraphicObjectContainer) => {
      if (!item.parentContainerId) {
        reference.addObjectToContainer(item);
      } else {
        let pItem = <NodalContainer>bank.getItemById(item.parentContainerId);
        pItem.addObjectToContainer(item);
      }
    });
    
    // Mise à jour des ancres du graphObject
    let inAnchors = this.graphAnchorItems.items.filter(item => item.type === "in").map((item: GraphAnchor) => <AnchorItem>{
      id: item.anchorId,
      label: item.anchorName,
      callback: () => {
        console.log("in", item);

        // Il manque le graphItem
        // ce n'est pas baseInAnchor à passer ici
        this.playAllIn(item.baseOutAnchor, item.parentGraphItem);
        // item.baseOutAnchor.callback();

      }
    });
    
    let outAnchors = this.graphAnchorItems.items.filter(item => item.type === "out").map((item: GraphAnchor) => <AnchorItem>{
      id: item.anchorId,
      label: item.anchorName,
      callback: () => item.baseInAnchor.callback()
    });

    reference.inAnchors.push(...inAnchors);
    reference.outAnchors.push(...outAnchors);

    this.graphItems.items.forEach(item => {
      this.initGraphItem(item);
    });

    this.providers = {
      transition: this.dataProvider.getBank("scene-transitions"),
      sceneState: this.dataProvider.getBank("scene-states"),
      sceneObject: this.dataProvider.getBank("scene-objects")
    };
  }

  loadGraphItems() {    
    this.graphItems.load(this.reference.componentId);
    this.graphTimerItems.load(this.reference.componentId);
    this.graphTriggerItems.load(this.reference.componentId);
    this.graphAnchorItems.load(this.reference.componentId);
    this.variableItems.load(this.reference.componentId);
    this.transitionItems.load(this.reference.componentId);
  }

  initGraphItem(item: GraphItem) {
    if (!this.banks[item.type]) {
      console.warn("ici");
    }

    let tItem = this.banks[item.type].getItemById(item.itemId);
    item.init(tItem, this);
  }

  /* playAnchor(anchor: AnchorItem, graphItem: GraphItem) {
    if (anchor.callback) {
      anchor.callback(anchor.argumentValues);
    } else {
      this.playOut(anchor, graphItem);
    }
  } */

  playOut(anchor: AnchorItem, graphItem: GraphItem) {

    let outLinks = graphItem.outLinks.filter(link => link.localProperty === anchor.id);

    console.log(anchor.id, outLinks);
    

    // UTILE ??
    // let baseItem = this.mainView.itemComponents.find(item => item.data.id === graphItem.id);

    // Inutile pour les componentReference
    // baseItem.links.filter(link => link.linkData.localProperty === anchor.id).forEach(link => link.highlight(this.graphOffset));

    outLinks.forEach(link => {
      console.log(link);
      
      let targetItem: GraphItem = this.graphItems.items.find(item => item.id === link.targetObject);      
      let targetProp = targetItem.inAnchors.find(anchor => anchor.id === link.targetProperty);

      if (!targetProp) {
        console.warn("No targetProp for", targetItem);
        return;
      }

      this.playIn(targetProp, targetItem);
    });
  }

  playAllIn(inAnchor: AnchorItem, graphItem: GraphItem) {
    // pas clean de filtrer sur les callback, on devrait le faire sur un type
    let incs = graphItem.outAnchors.filter(anchor => anchor.type === inAnchor.id);

    console.log(incs);
    
    
    incs.forEach(inc => {
      this.playIn(inc, graphItem);
      this.playOut(inc, graphItem);
    });
  }

  playIn(inAnchor: AnchorItem, graphItem: GraphItem) {
    // on doit activer tous les liens du type donné

    // UTILE ??
    // let baseItem = this.mainView.itemComponents.find(item => item.data.id === graphItem.id);
    // baseItem.getAnchor(inAnchor.id).highlight();

    if (inAnchor.callback) {
      inAnchor.callback(inAnchor.argumentValues);
    }
  }
}