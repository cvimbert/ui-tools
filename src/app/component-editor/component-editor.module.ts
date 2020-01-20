import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { ComponentEditorRoutingModule } from './component-editor-routing.module';
import { ComponentEditorComponent } from './components/component-editor/component-editor.component';
import { ComponentEditorService } from './component-editor.service';
import { SceneSizeModalComponent } from './components/scene-size-modal/scene-size-modal/scene-size-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PropertiesEditorComponent } from './components/properties-editor/properties-editor.component';
import { PropertyLineComponent } from './components/property-line/property-line.component';
import { OutlineCrossComponent } from './components/outline-cross/outline-cross.component';
import { DataProviderService } from './services/data-provider.service';

@NgModule({
  providers: [
    ComponentEditorService,
    DataProviderService
  ],
  declarations: [
    ComponentEditorComponent,
    SceneSizeModalComponent,
    PropertiesEditorComponent,
    PropertyLineComponent,
    OutlineCrossComponent
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
