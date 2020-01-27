import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetsManagerRoutingModule } from './assets-manager-routing.module';
import { AssetsDataProviderService } from './assets-data-provider.service';

@NgModule({
  providers: [
    AssetsDataProviderService
  ],
  declarations: [],
  imports: [
    CommonModule,
    AssetsManagerRoutingModule
  ],
  exports: []
})
export class AssetsManagerModule { }
