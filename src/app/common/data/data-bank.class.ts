import { JsonConvert, OperationMode, ValueCheckingMode } from 'json2typescript';
import { DataConfiguration } from './data-configuration.class';
import { BaseData } from './interfaces/base-data.interface';
import { ElectronService } from 'ngx-electron';

export class DataBank<T> {

  items: any[] = [];
  tempId = 0;
  private jsonConverter: JsonConvert;

  // TODO: à déplacer dans la configuration

  constructor(
    public storageKey: string,
    public itemClass: {new (): T},
    public electronService: ElectronService,
    public objectConstructor: { [key: string]: { new (): any }}
  ) {
    this.jsonConverter = new JsonConvert(
      OperationMode.ENABLE,
      ValueCheckingMode.ALLOW_NULL,
      true
    );
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

  pushAfterCreation(item: T, data?: BaseData) {
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

  save(directory?: string) {
    let obj = this.jsonConverter.serializeArray(this.items);

    if (!this.electronService.isElectronApp) {
      localStorage[this.storageKey + DataConfiguration.INDEX_SUFFIX] = this.tempId;
      localStorage[this.storageKey + DataConfiguration.ITEMS_SUFFIX] = JSON.stringify(obj);
    } else {
      let fs = this.electronService.remote.require("fs");
      let dir = directory ? directory + "/" : "";

      if (!fs.existsSync(DataConfiguration.savePath + dir)) {
        fs.mkdirSync(DataConfiguration.savePath + dir, { recursive: true });
      }

      let fileObj: Object = {
        index: this.tempId,
        object: obj
      };

      fs.writeFileSync(DataConfiguration.savePath + dir + this.storageKey + ".json", JSON.stringify(fileObj));
    }
  }

  load(directory?: string) {    
    let obj: Object;
    let index: number;
    this.items = [];

    if (!this.electronService.isElectronApp) {
      index = localStorage[this.storageKey + DataConfiguration.INDEX_SUFFIX];
      let itemsStr = localStorage[this.storageKey + DataConfiguration.ITEMS_SUFFIX];
  
      if (itemsStr != undefined) {
        obj = JSON.parse(itemsStr);
      }
    } else {
      let fs = this.electronService.remote.require("fs");
      let dir = directory ? directory + "/" : "";

      let path = DataConfiguration.savePath + dir + this.storageKey + ".json";

      if (fs.existsSync(path)) {
        let content = fs.readFileSync(path, 'utf8');

        if (content) {
          let completeObj: Object = JSON.parse(content);
          index = completeObj["index"];
          obj = completeObj["object"];
        }
      }
    }

    if (index != undefined) {
      this.tempId = index;
    }

    if (obj) {
      (<Array<any>>obj).forEach(item => {
        let objectClass = this.objectConstructor[item.objectType];

        if (objectClass) {
          this.items.push(this.jsonConverter.deserialize(item, objectClass));
        } else {
          this.items.push(this.jsonConverter.deserialize(item, this.itemClass));
        }
      });
    }
  }
}