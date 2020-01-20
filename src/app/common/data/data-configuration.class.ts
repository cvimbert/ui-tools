import { BankConfigurationItem } from './interfaces/bank-configuration-item.interface';
import { BasicRectSprite } from '../graphic/basic-rect-sprite.class';

export class DataConfiguration {
  static INDEX_SUFFIX = "-index";
  static ITEMS_SUFFIX = "-items";

  static BANK_CONFIGURATION: BankConfigurationItem[] = [
    { name: "scene-objects", objectContructor: BasicRectSprite }
  ]
}