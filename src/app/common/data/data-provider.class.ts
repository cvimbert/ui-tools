import { DataBank } from './data-bank.class';
import { DataConfiguration } from './data-configuration.class';
import { ElectronService } from 'ngx-electron';
import { DataConstructors } from './data-contructors.class';

export class DataProvider {
  
    componentsBanks: { [key: string]: DataBank<any> } = {};
    mainBanks: { [key: string]: DataBank<any> } = {};

    constructor(
        electronService: ElectronService
    ) {
        DataConfiguration.COMPONENTS_BANK_CONFIGURATION.forEach(item => {
            this.componentsBanks[item.name] = new DataBank<any>(item.name, item.objectContructor, electronService, DataConstructors.CONSTRUCTORS);
        });

        DataConfiguration.MAIN_BANK_CONFIGURATION.forEach(item => {
            this.mainBanks[item.name] = new DataBank<any>(item.name, item.objectContructor, electronService, DataConstructors.CONSTRUCTORS);
        });
    }

    loadAll(path?: string) {
        for (let key in this.componentsBanks) {
            this.componentsBanks[key].load(path);
        }

        for (let key in this.mainBanks) {
            this.mainBanks[key].load();
        }
    }

    saveAll(path?: string) {
        for (let key in this.componentsBanks) {
            this.componentsBanks[key].save(path);
        }

        for (let key in this.mainBanks) {
            this.mainBanks[key].save();
        }
    }

    getBank(name: string): DataBank<any> {
        let bank = this.componentsBanks[name];

        if (!bank) {
            bank = this.mainBanks[name];
        }

        return bank;
    }
}