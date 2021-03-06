import { FlexibleRectangle } from '../geometry/flexible-rectangle.class';
import { Rectangle } from '../geometry/interfaces/rectangle.interface';
import { JsonObject, JsonProperty } from 'json2typescript';
import { ComponentEditorScene } from 'src/app/component-editor/component-editor-scene.class';
import { OriginDisplayer } from './origin-displayer.class';
import { AdditionnalPanel } from '../data/interfaces/aditionnal-panels/additionnal-panel.interface';
import { GraphTarget } from 'src/app/logical-graph/interfaces/graph-target.interface';
import { AnchorItem } from 'src/app/logical-graph/interfaces/anchor-item.interface';
import { GraphItem } from 'src/app/logical-graph/graph-item.class';
import { NodalContainer } from './nodal-container.class';
import { ArgumentType } from 'src/app/logical-graph/argument-type.class';
import { ArgumentValue } from 'src/app/logical-graph/argument-value.class';
import { ValueUnitPair } from '../geometry/value-unit-pair.class';
import { ComponentCluster } from './components/component-cluster.class';
import { GraphicObjectStyle } from '../geometry/graphic-object-style.class';
import { PanelEntryType } from '../data/interfaces/aditionnal-panels/panel-entry-type.enum';
import { StyleDisplayer } from './style-displayer.class';


@JsonObject("GraphicObjectContainer")
export class GraphicObjectContainer extends FlexibleRectangle implements GraphTarget {

    graphService: ComponentCluster;
    parentGraphItem: GraphItem;

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
 
    additionnalPanels: AdditionnalPanel[] = [
        {
            name: "Debug",
            entries: [
                {
                    name: "Debug display",
                    type: PanelEntryType.BOOLEAN,
                    getter: () => this.debugDisplay,
                    setter: (value: boolean) => this.debugDisplay = value
                }
            ]
        },
        {
            name: "Padding",
            entries: [
                {
                    name: "Padding",
                    type: PanelEntryType.NUMBER,
                    getter: () => this.objectStyle.padding,
                    setter: (value: number) => {
                        this.objectStyle.padding = value;
                        this.updateStyle();
                    }
                },
                {
                    name: "Padding top",
                    type: PanelEntryType.NUMBER,
                    getter: () => this.objectStyle.paddingTop,
                    setter: (value: number) => {
                        this.objectStyle.paddingTop = value;
                        this.updateStyle();
                    }
                },
                {
                    name: "Padding right",
                    type: PanelEntryType.NUMBER,
                    getter: () => this.objectStyle.paddingRight,
                    setter: (value: number) => {
                        this.objectStyle.paddingRight = value;
                        this.updateStyle();
                    }
                },
                {
                    name: "Padding bottom",
                    type: PanelEntryType.NUMBER,
                    getter: () => this.objectStyle.paddingBottom,
                    setter: (value: number) => {
                        this.objectStyle.paddingBottom = value;
                        this.updateStyle();
                    }
                },
                {
                    name: "Padding left",
                    type: PanelEntryType.NUMBER,
                    getter: () => this.objectStyle.paddingLeft,
                    setter: (value: number) => {
                        this.objectStyle.paddingLeft = value;
                        this.updateStyle();
                    }
                }
            ]
        },
        {
            name: "Margin",
            entries: [
                {
                    name: "Margin",
                    type: PanelEntryType.NUMBER,
                    getter: () => this.objectStyle.margin,
                    setter: (value: number) => {
                        this.objectStyle.margin = value;
                        this.updateStyle();
                    }
                },
                {
                    name: "Margin top",
                    type: PanelEntryType.NUMBER,
                    getter: () => this.objectStyle.marginTop,
                    setter: (value: number) => {
                        this.objectStyle.marginTop = value;
                        this.updateStyle();
                    }
                },
                {
                    name: "Margin right",
                    type: PanelEntryType.NUMBER,
                    getter: () => this.objectStyle.marginRight,
                    setter: (value: number) => {
                        this.objectStyle.marginRight = value;
                        this.updateStyle();
                    }
                },
                {
                    name: "Margin bottom",
                    type: PanelEntryType.NUMBER,
                    getter: () => this.objectStyle.marginBottom,
                    setter: (value: number) => {
                        this.objectStyle.marginBottom = value;
                        this.updateStyle();
                    }
                },
                {
                    name: "Margin left",
                    type: PanelEntryType.NUMBER,
                    getter: () => this.objectStyle.marginLeft,
                    setter: (value: number) => {
                        this.objectStyle.marginLeft = value;
                        this.updateStyle();
                    }
                }
            ]
        }
    ];

    @JsonProperty("objectType", String)
    objectType = "";
    
    @JsonProperty("visibility", Boolean)
    _visibility = true;

    @JsonProperty("depth", Number, true)
    depth = 1;

    @JsonProperty("parentContainerId", String)
    _parentContainerId = "";

    @JsonProperty("objectStyle", GraphicObjectStyle, true)
    objectStyle = new GraphicObjectStyle();

    _debugDisplay = false;

    parentContainer: NodalContainer;
    scene: ComponentEditorScene;

    private _selected = false;
    selectionRect: Phaser.GameObjects.Rectangle;
    originDisplayer: OriginDisplayer;
    styleDisplayer: StyleDisplayer;

    private _hitEnabled = false;
    hitZone: Phaser.GameObjects.Rectangle;

    constructor() {
        super();
    }

    init() {
        this.initLabel();
        this.createStyleDisplayer();
        
    }

    pushPanels(panels: AdditionnalPanel[]) {
        this.additionnalPanels.push(...panels);
    }

    unshiftPanels(panels: AdditionnalPanel[]) {
        this.additionnalPanels.unshift(...panels);
    }

    get parentContainerId(): string {
        return this._parentContainerId;
    }

    updateStyle() {
        this.drawStyleDisplayer();
        this.render();
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
        this.depth = value;
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

    get debugDisplay(): boolean {
        return this._debugDisplay;
    }

    set debugDisplay(value: boolean) {
        if (value && !this._debugDisplay) {
            this.createStyleDisplayer();
        } else if (!value && this._debugDisplay) {
            this.destroyStyleDisplayer();
        }

        this._debugDisplay = value;

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
        
        if (!this.hitZone) {
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

    createStyleDisplayer() {
        if (!this.styleDisplayer) {
            this.styleDisplayer = new StyleDisplayer(this.scene, this, this.mainContainer);
        }
    }

    destroyStyleDisplayer() {
        if (this.styleDisplayer) {
            this.styleDisplayer.destroy();
            this.styleDisplayer = null;
        }
    }

    render() {
        super.render();

        if (this._selected) {
            this.drawSelection();
            this.drawHitZone();
            this.placeOriginDisplayer();
            this.drawStyleDisplayer();
        }
    }

    drawStyleDisplayer() {
        if (this.styleDisplayer) {
            this.styleDisplayer.setPosition(this.x.value, this.y.value);
            this.styleDisplayer.rotation = this.rotation.value;
            this.styleDisplayer.draw();
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