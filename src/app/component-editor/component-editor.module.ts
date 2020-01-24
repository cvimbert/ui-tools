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
import { DeletionModalComponent } from './components/deletion-modal/deletion-modal.component';
import { AdditionalEntryComponent } from './components/additional-entry/additional-entry.component';
import { SceneStateDisplayerComponent } from './components/scene-state-displayer/scene-state-displayer.component';
import { MetadataEditionModalComponent } from './components/metadata-edition-modal/metadata-edition-modal.component';
import { StructureObjectsPanelComponent } from './components/structure-objects-panel/structure-objects-panel.component';
import { EditSceneStateModalComponent } from './components/edit-scene-state-modal/edit-scene-state-modal.component';

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
    OutlineCrossComponent,
    DeletionModalComponent,
    AdditionalEntryComponent,
    SceneStateDisplayerComponent,
    MetadataEditionModalComponent,
    StructureObjectsPanelComponent,
    EditSceneStateModalComponent
  ],
  imports: [
    CommonModule,
    ComponentEditorRoutingModule,
    MatDialogModule,
    FormsModule
  ],
  entryComponents: [
    SceneSizeModalComponent,
    DeletionModalComponent,
    MetadataEditionModalComponent
  ]
})
export class ComponentEditorModule { }
