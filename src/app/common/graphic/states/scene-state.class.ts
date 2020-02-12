import { GraphicObjectState } from './graphic-object-state.class';
import { JsonObject, JsonProperty } from 'json2typescript';
import { GraphicObjectContainer } from '../graphic-object-container.class';
import { ValueUnitPair } from '../../geometry/value-unit-pair.class';
import { BaseGameStructure } from 'src/app/logical-graph/base-game-structure.class';
import { GraphTarget } from 'src/app/logical-graph/interfaces/graph-target.interface';
import { AnchorItem } from 'src/app/logical-graph/interfaces/anchor-item.interface';
import { ComponentEditorScene } from 'src/app/component-editor/component-editor-scene.class';

@JsonObject("SceneState")
export class SceneState extends BaseGameStructure implements GraphTarget {

    basicSet: AnchorItem = {
        id: "basicSet",
        label: "Basic set",
        callback: () => this.setToState()
    }

    inAnchors: AnchorItem[] = [
        this.basicSet
    ];

    outAnchors: AnchorItem[] = [];

    @JsonProperty("states", [GraphicObjectState])
    states: GraphicObjectState[] = [];

    constructor() {
        super();
    }

    init() {
        this.initLabel();
    }

    initLabel() {
        this.label = this.name;
    }

    setToState() {
        let scene: ComponentEditorScene = <ComponentEditorScene>this.graphService.mainScene;
        this.graphService.applySceneState(this);
    }

    static fromObjectsArray(objects: GraphicObjectContainer[]): SceneState {
        let sceneState = new SceneState();
        sceneState.states = objects.map(item => SceneState.fromGraphicObject(item));
        return sceneState;
    }
    
    static fromGraphicObject(object: GraphicObjectContainer): GraphicObjectState {

        let state = new GraphicObjectState();

        GraphicObjectState.stateCloneProperties.forEach(prop => {
            let item = object[prop];

            if (item instanceof ValueUnitPair) {
                state[prop] = item.clone();
            } else {
                state[prop] = item;
            }
        });

        state.targetObjectId = object.id;

        return state;
    }
}