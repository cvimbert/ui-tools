import { BankConfigurationItem } from './interfaces/bank-configuration-item.interface';
import { BasicRectSprite } from '../graphic/basic-rect-sprite.class';
import { SceneState } from '../graphic/states/scene-state.class';
import { SceneTransition } from '../graphic/transitions/scene-transition.class';

export class DataConfiguration {
  static INDEX_SUFFIX = "-index";
  static ITEMS_SUFFIX = "-items";

  static BANK_CONFIGURATION: BankConfigurationItem[] = [
    { name: "scene-objects", objectContructor: BasicRectSprite },
    { name: "scene-states", objectContructor: SceneState },
    { name: "scene-transitions", objectContructor: SceneTransition }
  ]
}