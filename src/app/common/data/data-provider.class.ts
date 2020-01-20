import { DataBank } from './data-bank.class';
import { DataConfiguration } from './data-configuration.class';

export class DataProvider {
  
    banks: { [key: string]: DataBank<any> } = {};

    constructor() {
        DataConfiguration.BANK_CONFIGURATION.forEach(item => {
            this.banks[item.name] = new DataBank<any>(item.name, item.objectContructor);
        });
    }

    loadAll() {
        for (let key in this.banks) {
            this.banks[key].load();
        }
    }

    saveAll() {
        for (let key in this.banks) {
            this.banks[key].save();
        }
    }

    getBank(name: string): DataBank<any> {
        return this.banks[name];
    }
}