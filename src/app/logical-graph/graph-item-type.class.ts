import { GraphTimerModalComponent } from './components/graph-timer-modal/graph-timer-modal.component';
import { TriggerCreationModalComponent } from './trigger-creation-modal/trigger-creation-modal.component';
import { GraphAnchorModalComponent } from './components/graph-anchor-modal/graph-anchor-modal.component';
import { VariableEditionModalComponent } from './game-structures/variable/variable-edition-modal/variable-edition-modal.component';

export class GraphItemType {
  static TRANSITION = "transition";
  static TIMER = "timer";
  static TRIGGER = "trigger";
  static ANCHOR = "anchor";
  static VARIABLE = "variable";
  static GRAPHIC_OBJECT = "sceneObject";
  static SCENE_STATE = "sceneState";

  static ITEMS_LIST = [
    GraphItemType.TRANSITION,
    GraphItemType.TIMER,
    GraphItemType.TRIGGER,
    GraphItemType.ANCHOR,
    GraphItemType.VARIABLE,
    GraphItemType.GRAPHIC_OBJECT,
    GraphItemType.SCENE_STATE
  ];

  static ITEMS_CREATION_MODAL_COMPONENT = {
    [GraphItemType.TIMER]: GraphTimerModalComponent,
    [GraphItemType.TRIGGER]: TriggerCreationModalComponent,
    [GraphItemType.ANCHOR]: GraphAnchorModalComponent,
    [GraphItemType.VARIABLE]: VariableEditionModalComponent
  }
}