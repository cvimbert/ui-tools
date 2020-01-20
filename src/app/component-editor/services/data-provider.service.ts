import { Injectable } from '@angular/core';
import { DataProvider } from 'src/app/common/data/data-provider.class';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService extends DataProvider {

  constructor() {
    super();
    this.loadAll();
  }
}
