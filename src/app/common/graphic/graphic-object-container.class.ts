import { FlexibleRectangle } from '../geometry/flexible-rectangle.class';
import { Rectangle } from '../geometry/interfaces/rectangle.interface';
import { JsonObject, JsonProperty } from 'json2typescript';
import { ComponentEditorScene } from 'src/app/component-editor/component-editor-scene.class';
import { OriginDisplayer } from './origin-displayer.class';
import { AdditionnalPanel } from '../data/interfaces/aditionnal-panels/additionnal-panel.interface';
import { GraphTarget } from 'src/app/logical-graph/interfaces/graph-target.interface';
import { AnchorItem } from 'src/app/logical-graph/interfaces/anchor-item.interface';
import { GraphService } from 'src/app/logical-graph/graph.service';
import { GraphItem } from 'src/app/logical-graph/graph-item.class';
import { NodalContainer } from './nodal-container.class';
import { ArgumentType } from 'src/app/logical-graph/argument-type.class';
import { ArgumentValue } from 'src/app/logical-graph/argument-value.class';
import { ValueUnitPair } from '../geometry/value-unit-pair.class';


@JsonObject("GraphicObjectContainer")
export class GraphicObjectContainer extends FlexibleRectangle implements GraphTarget {

    graphService: GraphService;
    parentGraphItem: GraphItem;

    // pour phaser uniquement
    gameObjects: Phaser.GameObjects.GameObject[] = [];
    mainContainer: Phaser.GameObjects.Container;

    label = "";

    setPropAnchor: AnchorItem = {
        id: "setProp",
        label: "Set property",
        nameGetter: args => args.length > 0 ? `Set '${ args[0].value }' to ${ args[1].value }` : "",
        arguments: {
            propName: {
              name: "Property",
              type: ArgumentType.OBJECT_PROPERTY,
              mandatory: true,
            },
            propValue: {
                name: "Value",
                type: ArgumentType.NUMBER,
                mandatory: true
            }
        },
        callback: args => this.setObjectProperty(args)
    };

    inAnchors: AnchorItem[] = [
        this.setPropAnchor
    ];

    pointerOverItem: AnchorItem = {
        id: "onpointerover",
        label: "On pointer over",
        callback: () => this.onPointerOver()
    };

    pointerOutItem: AnchorItem = {
        id: "onpointerout",
        label: "On pointer out",
        callback: () => this.onPointerOut()
    };

    pointerDownItem: AnchorItem = {
        id: "onclick",
        label: "On pointer down",
        callback: () => this.onPointerDown()
    };

    outAnchors: AnchorItem[] = [
        this.pointerOverItem,
        this.pointerOutItem,
        this.pointerDownItem
    ];
 
    additionnalPanels: AdditionnalPanel[];

    @JsonProperty("objectType", String)
    objectType = "";
    
    @JsonProperty("visibility", Boolean)
    _visibility = true;

    // à sérialiser (ou pas)
    _depth = 1;

    // A sérialiser aussi
    @JsonProperty("parentContainerId")
    _parentContainerId = "";

    parentContainer: NodalContainer;

    // le parent devrait aussi se trouver ici
    scene: ComponentEditorScene;

    private _selected = false;
    selectionRect: Phaser.GameObjects.Rectangle;
    originDisplayer: OriginDisplayer;

    private _hitEnabled = false;
    hitZone: Phaser.GameObjects.Rectangle;

    constructor() {
        super();
    }

    init() {
        this.initLabel();
    }

    get parentContainerId(): string {
        return this._parentContainerId;
    }

    setObjectProperty(args: ArgumentValue[]) {
        let prop: any = this[args[0].value];

        if (prop instanceof ValueUnitPair) {
            prop.value = args[1].value;
        } else {
            this[args[0].value] = args[1].value;
        }
        
        this.render();
    }

    set parentContainerId(value: string) {
        if (value == "") {
            // console.log("no parent");
            
            if (this.parentContainer) {
                this.parentContainer.removeObjectFromContainer(this);
            }

            this.parentContainer = null;
        } else if (value !== this._parentContainerId) {
            this.setContainerId(value)
        }

        this._parentContainerId = value;
    }

    setContainerId(value: string) {
        this.parentContainer = <NodalContainer>this.scene.editorService.sceneObjectsBank.getItemById(value);
        
        if (this.parentContainer) {
            this.parentContainer.addObjectToContainer(this);
        } else {
            console.warn("Ce cas ne devrait pas se produire. A étudier.");
        }
    }
    
    initLabel() {
        this.label = this.name;

        if (this.graphService) {
            this.hitEnabled = true;
        }
    }

    afterInit() {
        if (this.graphService) {
            this.hitEnabled = true;
        }

        this.mainContainer = this.scene.add.container(0, 0);

        if (this._parentContainerId != "") {
            // en attente de l'initialisation de tous les objets (pourrait être fait dans une seconde passe)
            setTimeout(() => this.setContainerId(this._parentContainerId));
        }

        this.setVisibility(this._visibility);
    }

    initWithScene(
        scene: ComponentEditorScene,
        rect?: Rectangle,
        parent?: FlexibleRectangle
    ) {
        this.scene = scene;
        this.initRect(rect, parent);
    }

    get visibility(): boolean {
        return this._visibility;
    }

    setVisibility(value: boolean) {
        if (this.selectionRect) {
            this.selectionRect.visible = value;
        }

        if (this.originDisplayer) {
            this.originDisplayer.visible = value;
        }

        // if (this.mainContainer) {
            this.mainContainer.visible = value;
        // }

        this._visibility = value;
    }

    setDepth(value: number) {
        this.mainContainer.depth = value;
        this._depth = value;
    }

    toggleVisibility() {
        this.setVisibility(!this._visibility);
    }

    get selected(): boolean {
        return this._selected;
    }

    set selected(value: boolean) {        
        if (value && !this._selected) {
            this.createSelectionRect();
            this.createOriginDisplayer();
        } else if (!value && this._selected) {
            this.destroySelectionRect();
            this.destroyOriginDisplayer();
        }

        this._selected = value;

        if (value) {
            this.render();
        }
    }

    get hitEnabled(): boolean {
        return this._hitEnabled;
    }

    set hitEnabled(value: boolean) {
        if (value && !this._hitEnabled) {
            this.createHitZone();
        } else if (!value && this._hitEnabled) {
            this.destroyHitZone();
        }

        this._hitEnabled = value;
    }

    createHitZone() {
        // console.log("ici");
        
        if (!this.hitZone) {
            // console.log("create hit zone");
            

            this.hitZone = this.scene.add.rectangle(this.x.value, this.y.value, this.width.value, this.height.value, 0xff0000, 0);
            this.mainContainer.add(this.hitZone);

            this.hitZone.setInteractive({
                // useHandCursor: true
            });
            
            this.hitZone.on("pointerover", () => {
                this.graphService.playAllIn(this.pointerOverItem, this.parentGraphItem);
            }, this);

            this.hitZone.on("pointerout", () => {
                this.graphService.playAllIn(this.pointerOutItem, this.parentGraphItem);
            }, this);

            this.hitZone.on("pointerdown", () => {
                this.graphService.playAllIn(this.pointerDownItem, this.parentGraphItem);
            }, this);

            this.drawHitZone();
        }
    }

    destroyHitZone() {
        if (this.hitZone) {
            this.hitZone.destroy();
            this.hitZone = null;
        }
    }

    createSelectionRect() {
        if (!this.selectionRect) {
            this.selectionRect = this.scene.add.rectangle(this.x.value, this.y.value, this.width.value, this.height.value);
            this.mainContainer.add(this.selectionRect);
            this.selectionRect.setStrokeStyle(1, 0x000000);
            this.drawSelection();
        }
    }

    destroySelectionRect() {
        if (this.selectionRect) {
            this.selectionRect.destroy();
            this.selectionRect = null;
        }
    }

    createOriginDisplayer() {
        if (!this.originDisplayer) {
            this.originDisplayer = new OriginDisplayer(this.scene);
            this.mainContainer.add(this.originDisplayer);
        }
    }

    destroyOriginDisplayer() {        
        if (this.originDisplayer) {
            this.originDisplayer.destroy();
            this.originDisplayer = null;
        }
    }

    render() {
        super.render();

        if (this._selected) {
            this.drawSelection();
            this.drawHitZone();
            this.placeOriginDisplayer();
        }
    }

    drawSelection() {
        if (this.selectionRect) {                           
            this.selectionRect.setPosition(this.x.value, this.y.value);
            this.selectionRect.setDisplaySize(this.width.value, this.height.value);
            this.selectionRect.setOrigin(this.xOrigin.value, this.yOrigin.value);
            this.selectionRect.rotation = this.rotation.value;
        }
    }

    drawHitZone() {
        if (this.hitZone) {
            this.hitZone.setPosition(this.x.value, this.y.value);
            this.hitZone.setSize(this.width.value, this.height.value);
            this.hitZone.setOrigin(this.xOrigin.value, this.yOrigin.value);
            this.hitZone.rotation = this.rotation.value;
        }
    }

    placeOriginDisplayer() {
        if (this.originDisplayer) {            
            this.originDisplayer.setPosition(this.x.value, this.y.value);
            this.originDisplayer.rotation = this.rotation.value;
        }
    }

    destroy() {
        this.selectionRect.destroy();
        this.originDisplayer.destroy();
    }

    onPointerOver() {        
        this.graphService.playOut(this.pointerOverItem, this.parentGraphItem);
    }

    onPointerOut() {
        this.graphService.playOut(this.pointerOutItem, this.parentGraphItem);
    }

    onPointerDown() {
        this.graphService.playOut(this.pointerDownItem, this.parentGraphItem);
    }
}