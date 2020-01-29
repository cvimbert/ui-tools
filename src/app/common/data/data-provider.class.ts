import { DataBank } from './data-bank.class';
import { DataConfiguration } from './data-configuration.class';
import { ElectronService } from 'ngx-electron';

export class DataProvider {
  
    banks: { [key: string]: DataBank<any> } = {};

    constructor(
        electronService: ElectronService
    ) {
        DataConfiguration.BANK_CONFIGURATION.forEach(item => {
            this.banks[item.name] = new DataBank<any>(item.name, item.objectContructor, electronService);
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