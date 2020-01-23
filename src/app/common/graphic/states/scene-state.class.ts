import { GraphicObjectState } from './graphic-object-state.class';
import { JsonObject, JsonProperty } from 'json2typescript';
import { GraphicObjectContainer } from '../graphic-object-container.class';
import { ValueUnitPair } from '../../geometry/value-unit-pair.class';

@JsonObject("SceneState")
export class SceneState {

    @JsonProperty("states", [GraphicObjectState])
    states: GraphicObjectState[] = [];

    constructor() {

    }

    static fromObjectsArray(objects: GraphicObjectContainer[]): SceneState {
        let sceneState = new SceneState();
        sceneState.states = objects.map(item => SceneState.fromGraphicObject(item));
        return sceneState;
    }
    
    static fromGraphicObject(object: GraphicObjectContainer): GraphicObjectState {

        let state = new GraphicObjectState();

        let propertiesToClone = [
            "mode",
            "x",
            "y",
            "width",
            "height",
            "rotation",
            "scaleX",
            "scaleY",
            "alpha",
            "top",
            "right",
            "bottom",
            "left"
        ];

        propertiesToClone.forEach(prop => {
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