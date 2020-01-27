export class GraphItemType {
  static TRANSITION = "transition";
  static TIMER = "timer";
  static TRIGGER = "trigger";
  static ANCHOR = "anchor";
  static VARIABLE = "variable";

  static ITEMS_LIST = [
    GraphItemType.TRANSITION,
    GraphItemType.TIMER,
    GraphItemType.TRIGGER,
    GraphItemType.ANCHOR,
    GraphItemType.VARIABLE
  ];

  static ITEMS_CREATION_MODAL_COMPONENT = {
    /*[GraphItemType.TIMER]: GraphTimerModalComponent,
    [GraphItemType.TRIGGER]: TriggerCreationModalComponent,
    [GraphItemType.ANCHOR]: GraphAnchorModalComponent,
    [GraphItemType.VARIABLE]: VariableEditionModalComponent*/
  }
}