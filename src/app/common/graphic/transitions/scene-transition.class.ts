import { BaseDataItem } from '../../data/base-data-item.class';
import { JsonObject, JsonProperty } from 'json2typescript';
import { GraphicObjectContainer } from '../graphic-object-container.class';
import { SceneState } from '../states/scene-state.class';
import { GraphicObjectState } from '../states/graphic-object-state.class';
import { ValueUnitPair } from '../../geometry/value-unit-pair.class';
import { GraphTarget } from 'src/app/logical-graph/interfaces/graph-target.interface';
import { AnchorItem } from 'src/app/logical-graph/interfaces/anchor-item.interface';
import { BaseGameStructure } from 'src/app/logical-graph/base-game-structure.class';
import { CoordinatesMode } from '../../geometry/coordinates-modes.enum';

@JsonObject("SceneTransition")
export class SceneTransition extends BaseGameStructure implements GraphTarget {

    private targetSceneState: SceneState;

    playItem: AnchorItem = {
        id: "play",
        label: "Play",
        callback: () => this.play()
      };
    
      stopItem: AnchorItem = {
        id: "stop",
        label: "Stop",
        callback: () => this.stop()
      };
    
      resetItem = {
        id: "reset",
        label: "Reset",
        callback: () => this.reset()
      };
    
      inAnchors: AnchorItem[] = [
        this.playItem,
        this.stopItem,
        this.resetItem
      ];

      onStartItem = {
        id: "onstart",
        label: "On start",
        callback: () => this.onTransitionStart()
      };
    
      onCompleteItem = {
        id: "oncomplete",
        label: "On complete",
        callback: () => this.onTransitionComplete()
      };

      afterAnchor: AnchorItem = {
        id: "after",
        label: "After",
        callback: () => {
          this.onAfter();
        }
      };
    
      outAnchors: AnchorItem[] = [
        this.onStartItem,
        this.onCompleteItem,
        this.afterAnchor,
      ];

    // @JsonProperty("sourceStateId", String)
    // sourceStateId = "";

    @JsonProperty("targetStateId", String)
    targetStateId = "";

    @JsonProperty("duration", Number)
    duration = 0;

    @JsonProperty("easing", String)
    easing = "";

    constructor() {
        super();
    }

    init() {
        this.initLabel();
    }

    initLabel() {
        this.label = this.name;
    }

    onAfter() {
        this.graphService.playOut(this.afterAnchor, this.parentGraphItem);
    }

    triggerAfter() {
        this.graphService.playAllIn(this.afterAnchor, this.parentGraphItem);
    }

    transitionTo(startCallback: () => void, completeCallback: () => void) {
        // console.log("play transition");
        
        let sceneObjects: GraphicObjectContainer[] = this.graphService.providers["sceneObject"].items;
        let sceneStates: SceneState[] = this.graphService.providers["sceneState"].items;
        let scene = this.graphService.mainScene;

        this.applyTransition(scene, sceneObjects, sceneStates, startCallback, completeCallback);
    }

    play() {
        // console.log("play");
        
        this.transitionTo(() => {
            this.graphService.playAllIn(this.onStartItem, this.parentGraphItem);
        }, () => {
            this.graphService.playAllIn(this.onCompleteItem, this.parentGraphItem);
        });

        this.triggerAfter();
    }

    stop() {
    }
  
    reset() {
    }

    onTransitionComplete() {
        this.graphService.playOut(this.onCompleteItem, this.parentGraphItem);
    }

    onTransitionStart() {
        // console.log("transition start");
        
        this.graphService.playOut(this.onStartItem, this.parentGraphItem);
    }

    applyTransition(scene: Phaser.Scene, sceneObjects: GraphicObjectContainer[], sceneStates: SceneState[], startCallback?: () => void, completeCallback?: () => void) {

        this.targetSceneState = sceneStates.find(state => state.id === this.targetStateId);
        
        if (!this.targetSceneState) {
            console.warn(`Cannot play transition. No state named ${ this.targetStateId } in scene.`);
            return;
        }

        // console.log(this.targetSceneState);
        

        this.targetSceneState.states.forEach(state => {
            // state.calculate();
            let targetSceneObject = sceneObjects.find(obj => obj.id === state.targetObjectId);

            // targetSceneObject.calculate();
            // console.log(state);
            // return;
            
            // state.calculate();

            let props = GraphicObjectState.animatedProperties.concat(targetSceneObject.mode === CoordinatesMode.XYWH ? GraphicObjectState.XYProperties : GraphicObjectState.TRBLProperties);

            // console.log(props);
            

            let updatedProps: {
                keyName: string,
                val: any
            }[] = [];

            props.forEach(prop => {
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
                    onStart: () => {
                        if (startCallback) {
                            startCallback();
                        }
                    },
                    onUpdate: () => {
                        updateIndex++;

                        if (updateIndex == updatedProps.length) {
                            targetSceneObject.render();
                            updateIndex = 0;
                        }
                    },
                    onComplete: () => {
                        if (completeCallback) {
                            completeCallback();
                        }
                    }
                };

                updatedProps.forEach(updated => tweenParams[updated.keyName] = updated.val);
                scene.add.tween(tweenParams);
            }
        });
    }
}