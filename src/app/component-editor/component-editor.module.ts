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
import { SceneTransitionEditModalComponent } from './components/scene-transition-edit-modal/scene-transition-edit-modal.component';
import { SceneTransitionDisplayerComponent } from './components/scene-transition-displayer/scene-transition-displayer.component';
import { LogicalGraphModule } from '../logical-graph/logical-graph.module';
import { AssetsManagerModule } from '../assets-manager/assets-manager.module';
import { AssetBasedObjectEditModalComponent } from './components/asset-based-object-edit-modal/asset-based-object-edit-modal.component';
import { NgxElectronModule } from 'ngx-electron';
import { ComponentsIndexComponent } from './components/components-index/components-index.component';
import { ComponentTreePanelComponent } from './components/component-tree-panel/component-tree-panel.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ToColorStringPipe } from './pipes/to-color-string.pipe';

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
    EditSceneStateModalComponent,
    SceneTransitionEditModalComponent,
    SceneTransitionDisplayerComponent,
    AssetBasedObjectEditModalComponent,
    ComponentsIndexComponent,
    ComponentTreePanelComponent,
    ToColorStringPipe
  ],
  imports: [
    CommonModule,
    ComponentEditorRoutingModule,
    MatDialogModule,
    FormsModule,
    LogicalGraphModule,
    AssetsManagerModule,
    NgxElectronModule,
    DragDropModule
  ],
  entryComponents: [
    SceneSizeModalComponent,
    DeletionModalComponent,
    MetadataEditionModalComponent,
    EditSceneStateModalComponent,
    SceneTransitionEditModalComponent,
    AssetBasedObjectEditModalComponent
  ]
})
export class ComponentEditorModule { }
