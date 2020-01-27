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
    applyTransition(scene: Phaser.Scene, sceneObjects: GraphicObjectContainer[], sceneStates: SceneState[]) {
        this.targetSceneState = sceneStates.find(state => state.id === this.targetStateId);
        
        if (!this.targetSceneState) {
            console.warn(`Cannot play transition. No state named ${ this.targetStateId } in scene.`);
            return;
        }

        

        this.targetSceneState.states.forEach(state => {
            // state.calculate();
            let targetSceneObject = sceneObjects.find(obj => obj.id === state.targetObjectId);

            let updatedProps: {
                keyName: string,
                val: any
            }[] = [];

            GraphicObjectState.animatedProperties.forEach(prop => {
                // Pour chacune des propriétés, on vérifie si la valeur courante est différente de la valeur dans l'état
                // Si différence, on lance un tween
                // Mécanisme qui sera plus que suffisant dans un premier temps

                let propValue = targetSceneObject[prop];
                let equality: boolean;

                let key: string;
                let val: any;

                if (propValue instanceof ValueUnitPair) {                    
                    equality = propValue.value == (<ValueUnitPair>state[prop]).value;
                    key = prop + "Value";
                    val = (<ValueUnitPair>state[prop]).value;
                } else {
                    equality = propValue == state[prop];
                    key = prop;
                    val = state[prop];
                }

                if (!equality) {
                    updatedProps.push({
                        keyName: key,
                        val: val
                    });
                }
            });

            if (updatedProps.length > 0) {

                let updateIndex = 0;

                let tweenParams = {
                    duration: this.duration * 1000,
                    ease: this.easing,
                    targets: targetSceneObject,
                    onStart: () => console.log("start"),
                    onUpdate: () => {
                        updateIndex++;

                        if (updateIndex == updatedProps.length) {
                            targetSceneObject.render();
                            updateIndex = 0;
                        }
                    },
                    onComplete: () => console.log("completed")
                };

                updatedProps.forEach(updated => tweenParams[updated.keyName] = updated.val);
                scene.add.tween(tweenParams);
            }
        });
    }
}