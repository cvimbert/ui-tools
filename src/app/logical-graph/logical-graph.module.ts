import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogicalGraphRoutingModule } from './logical-graph-routing.module';
import { GraphViewComponent } from './components/graph-view/graph-view.component';
import { GraphService } from './graph.service';
import { BaseGraphItemComponent } from './components/base-graph-item/base-graph-item.component';
import { GraphAnchorComponent } from './components/graph-anchor/graph-anchor.component';
import { GenericMessageModalComponent } from './components/generic-message-modal/generic-message-modal.component';
import { GraphTargetSelectionModalComponent } from './components/graph-target-selection-modal/graph-target-selection-modal.component';
import { VariableEditionModalComponent } from './game-structures/variable/variable-edition-modal/variable-edition-modal.component';
import { AddAnchorModalComponent } from './components/add-anchor-modal/add-anchor-modal.component';
import { ArgumentsEditorModalComponent } from './components/arguments-editor-modal/arguments-editor-modal.component';
import { ArgumentsEditorSectionComponent } from './components/arguments-editor-section/arguments-editor-section.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { GraphTimerModalComponent } from './components/graph-timer-modal/graph-timer-modal.component';
import { TriggerCreationModalComponent } from './trigger-creation-modal/trigger-creation-modal.component';
import { GraphAnchorModalComponent } from './components/graph-anchor-modal/graph-anchor-modal.component';

@NgModule({
  providers: [
    GraphService
  ],
  declarations: [
    GraphViewComponent,
    BaseGraphItemComponent,
    GraphAnchorComponent,
    GenericMessageModalComponent,
    GraphTargetSelectionModalComponent,
    GraphTimerModalComponent,
    TriggerCreationModalComponent,
    GraphAnchorModalComponent,
    VariableEditionModalComponent,
    AddAnchorModalComponent,
    ArgumentsEditorModalComponent,
    ArgumentsEditorSectionComponent
  ],
  imports: [
    CommonModule,
    LogicalGraphRoutingModule,
    CommonModule,
    MatDialogModule,
    FormsModule
  ],
  exports: [
    GraphViewComponent
  ],
  entryComponents: [
    GenericMessageModalComponent,
    GraphTargetSelectionModalComponent,
    GraphTimerModalComponent,
    TriggerCreationModalComponent,
    GraphAnchorModalComponent,
    VariableEditionModalComponent,
    AddAnchorModalComponent,
    ArgumentsEditorModalComponent,
  ]
})
export class LogicalGraphModule { }
