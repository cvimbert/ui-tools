import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GraphTarget } from '../../interfaces/graph-target.interface';

// import { DiffsService } from 'src/app/v2/services/diffs.service';
// import { TransitionsService } from 'src/app/v2/services/transitions.service';

import { GraphItemType } from '../../graph-item-type.class';
import { GraphTargetModalData } from '../../interfaces/graph-target-modal-data.interface';
import { GraphService } from '../../graph.service';

@Component({
  selector: 'app-graph-target-selection-modal',
  templateUrl: './graph-target-selection-modal.component.html',
  styleUrls: ['./graph-target-selection-modal.component.scss']
})
export class GraphTargetSelectionModalComponent implements OnInit {

  selectedTargetId: string;
  graphTargets: GraphTarget[];

  item: GraphTarget;

  constructor(
    private dialogRef: MatDialogRef<GraphTargetSelectionModalComponent>,
    private graphService: GraphService,
    @Inject(MAT_DIALOG_DATA) public data: GraphTargetModalData
  ) {
    if (data["item"]) {
      this.item = data["item"];
      this.selectedTargetId = this.item.id;        
    }    
  }

  ngOnInit() {
    if (this.data.type === GraphItemType.TRANSITION) {
      this.graphTargets = this.graphService.providers["transition"].items;
    } else if (this.data.type === GraphItemType.GRAPHIC_OBJECT) {
      this.graphTargets = this.graphService.providers["sceneObject"].items;
    } else if (this.data.type === GraphItemType.SCENE_STATE) {      
      this.graphTargets = this.graphService.providers["sceneState"].items;
    }
  }

  get selectedTarget(): GraphTarget {
    return this.graphTargets.find(target => target.id === this.selectedTargetId);
  }

  cancel() {
    this.dialogRef.close();
  }

  validate() {
    // valeur de retour à améliorer potentiellement
    this.dialogRef.close(this.selectedTarget);
  }
}
