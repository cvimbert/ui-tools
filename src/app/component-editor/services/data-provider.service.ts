import { Injectable } from '@angular/core';
import { DataProvider } from 'src/app/common/data/data-provider.class';
import { ElectronService } from 'ngx-electron';
import { DataBank } from 'src/app/common/data/data-bank.class';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService extends DataProvider {

  constructor(
    private electronService: ElectronService
  ) {
    super(electronService);
  }
}
