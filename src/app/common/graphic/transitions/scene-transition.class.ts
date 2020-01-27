import { BaseDataItem } from '../../data/base-data-item.class';
import { JsonObject, JsonProperty } from 'json2typescript';
import { GraphicObjectContainer } from '../graphic-object-container.class';
import { SceneState } from '../states/scene-state.class';
import { GraphicObjectState } from '../states/graphic-object-state.class';
import { ValueUnitPair } from '../../geometry/value-unit-pair.class';

@JsonObject("SceneTransition")
export class SceneTransition extends BaseDataItem {

    private targetSceneState: SceneState;

    @JsonProperty("targetStateId", String)
    targetStateId = "";

    @JsonProperty("duration", Number)
    duration = 0;

    @JsonProperty("easing", String)
    easing = "";

    constructor() {
        super();
    }

    // Peut-être pas très judicieux de passer les objects et les states comme arguments de la fonction
    applyTransition(sceneObjects: GraphicObjectContainer[], sceneStates: SceneState[]) {
        this.targetSceneState = sceneStates.find(state => state.id === this.targetStateId);
        
        if (!this.targetSceneState) {
            console.warn(`Cannot play transition. No state named ${ this.targetStateId } in scene.`);
            return;
        }

        this.targetSceneState.states.forEach(state => {
            // console.log(state);
            let targetSceneObject = sceneObjects.find(obj => obj.id === state.targetObjectId);

            GraphicObjectState.animatedProperties.forEach(prop => {
                // Pour chacune des propriétés, on vérifie si la valeur courante est différente de la valeur dans l'état
                // Si différence, on lance un tween
                // Mécanisme qui sera plus que suffisant dans un premier temps

                let propValue = targetSceneObject[prop];
                let equality: boolean;

                if (propValue instanceof ValueUnitPair) {
                    equality = propValue.value === (<ValueUnitPair>this.targetSceneState[prop]).value;
                } else {
                    equality = propValue === this.targetSceneState[prop];
                }

                if (!equality) {
                    // let's play a tween !!
                }
            });
        });
    }
}