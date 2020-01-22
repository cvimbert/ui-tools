import { JsonConvert, OperationMode, ValueCheckingMode } from 'json2typescript';
import { DataConfiguration } from './data-configuration.class';
import { BaseData } from './interfaces/base-data.interface';
import { BasicRectSprite } from '../graphic/basic-rect-sprite.class';
import { Image } from '../graphic/image.class';
import { NineSliceImage } from '../graphic/nine-slice-image.class';
import { Textfield } from '../graphic/textfield.class';

export class DataBank<T> {

  items: any[] = [];
  tempId = 0;
  private jsonConverter: JsonConvert;

  // à déplacer dans la configuration
  objectConstructor: { [key: string]: { new (): any }} = {
    "image": Image,
    "baseRect": BasicRectSprite,
    "nineSliceImage": NineSliceImage,
    "textfield": Textfield
  };

  constructor(
    public storageKey: string,
    public itemClass: {new (): T}
  ) {
    this.jsonConverter = new JsonConvert(
      OperationMode.ENABLE,
      ValueCheckingMode.ALLOW_NULL,
      true
    );

    this.load();
  }

  createItem(data: BaseData): T {
    let item: T = new this.itemClass();

    // ces assignations ne sont pas hyper clean, mais bon...
    item["id"] = this.storageKey + "_" + this.tempId++;

    if (data) {
      item["name"] = data.name || "";
      item["description"] = data.description || "";
      item["objectType"] = data.type || "";
    }

    this.push(item);
    return item;
  }

  pushAfterCreation(item: T, data: BaseData) {
    item["id"] = this.storageKey + "_" + this.tempId++;

    if (data) {
      item["name"] = data.name || "";
      item["description"] = data.description || "";
      item["objectType"] = data.type || "";
    }

    this.push(item);
  }

  push(item: T) {
    this.items.push(item);
  }

  getItemById(id: string): T {
    return this.items.find(item => item["id"] === id);
  }

  clear() {
    this.items.length = 0;
    this.tempId = 0;
  }

  delete(item: T) {
    let index = this.items.indexOf(item);

    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  save() {
    localStorage[this.storageKey + DataConfiguration.INDEX_SUFFIX] = this.tempId;

    let obj = this.jsonConverter.serializeArray(this.items);
    localStorage[this.storageKey + DataConfiguration.ITEMS_SUFFIX] = JSON.stringify(obj);
  }

  load() {    
    let index = localStorage[this.storageKey + DataConfiguration.INDEX_SUFFIX];

    if (index != undefined) {
      this.tempId = index;
    }

    let itemsStr = localStorage[this.storageKey + DataConfiguration.ITEMS_SUFFIX];

    if (itemsStr != undefined) {
      let obj = JSON.parse(itemsStr);
      
      this.items = [];

      (<Array<any>>obj).forEach(item => {
        let objectClass = this.objectConstructor[item.objectType];
        this.items.push(this.jsonConverter.deserialize(item, objectClass));
      });
    }
  }
}