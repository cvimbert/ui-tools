import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToDegreesPipe } from './pipes/to-degrees.pipe';
import { ToRadiansPipe } from './pipes/to-radians.pipe';

@NgModule({
  declarations: [ToDegreesPipe, ToRadiansPipe],
  imports: [
    CommonModule
  ]
})
export class GeometryUtilsModule { }
