import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentEditorRoutingModule } from './component-editor-routing.module';
import { ComponentEditorComponent } from './components/component-editor/component-editor.component';

@NgModule({
  declarations: [ComponentEditorComponent],
  imports: [
    CommonModule,
    ComponentEditorRoutingModule
  ]
})
export class ComponentEditorModule { }
