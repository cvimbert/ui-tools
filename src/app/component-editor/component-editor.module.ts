import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { ComponentEditorRoutingModule } from './component-editor-routing.module';
import { ComponentEditorComponent } from './components/component-editor/component-editor.component';
import { ComponentEditorService } from './component-editor.service';
import { SceneSizeModalComponent } from './components/scene-size-modal/scene-size-modal/scene-size-modal.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  providers: [
    ComponentEditorService
  ],
  declarations: [
    ComponentEditorComponent,
    SceneSizeModalComponent
  ],
  imports: [
    CommonModule,
    ComponentEditorRoutingModule,
    MatDialogModule,
    FormsModule
  ],
  entryComponents: [
    SceneSizeModalComponent
  ]
})
export class ComponentEditorModule { }
