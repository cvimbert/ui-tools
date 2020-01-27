import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogicalGraphRoutingModule } from './logical-graph-routing.module';
import { GraphViewComponent } from './components/graph-view/graph-view.component';
import { GraphService } from './graph.service';

@NgModule({
  providers: [
    GraphService
  ],
  declarations: [
    // GraphViewComponent
  ],
  imports: [
    CommonModule,
    LogicalGraphRoutingModule
  ],
  exports: [
    // GraphViewComponent
  ]
})
export class LogicalGraphModule { }
