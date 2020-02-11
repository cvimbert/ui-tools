import { BankConfigurationItem } from './interfaces/bank-configuration-item.interface';
import { SceneState } from '../graphic/states/scene-state.class';
import { SceneTransition } from '../graphic/transitions/scene-transition.class';
import { TargetStorage } from './target-storage.enum';
import { GraphicObjectContainer } from '../graphic/graphic-object-container.class';
import { EditorComponent } from 'src/app/component-editor/editor-component.class';
import { EditorComposition } from 'src/app/component-editor/editor-composition.class';
import { BasicRectSprite } from '../graphic/basic-rect-sprite.class';
import { NineSliceImage } from '../graphic/nine-slice-image.class';
import { Textfield } from '../graphic/textfield.class';
import { NodalContainer } from '../graphic/nodal-container.class';
import { ComponentReference } from '../graphic/components/component-reference.class';
import { Image } from '../graphic/image.class';

export class DataConfiguration {
  static INDEX_SUFFIX = "-index";
  static ITEMS_SUFFIX = "-items";

  static targetStorage = TargetStorage.LOCALSTORAGE;
  static savePath = "save/";

  static COMPONENTS_BANK_CONFIGURATION: BankConfigurationItem[] = [
    { name: "scene-objects", objectContructor: GraphicObjectContainer },
    { name: "scene-states", objectContructor: SceneState },
    { name: "scene-transitions", objectContructor: SceneTransition }
  ];

  static MAIN_BANK_CONFIGURATION: BankConfigurationItem[] = [
    { name: "components", objectContructor: EditorComponent },
    { name: "compositions", objectContructor: EditorComposition }
  ];
}