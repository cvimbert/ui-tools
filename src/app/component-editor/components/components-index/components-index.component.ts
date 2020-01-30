import { Component, OnInit } from '@angular/core';
import { ComponentEditorService } from '../../component-editor.service';
import { DataProviderService } from '../../services/data-provider.service';
import { EditorComponent } from '../../editor-component.class';
import { MatDialog } from '@angular/material/dialog';
import { MetadataEditionModalComponent } from '../metadata-edition-modal/metadata-edition-modal.component';
import { BaseData } from 'src/app/common/data/interfaces/base-data.interface';
import { DeletionModalComponent } from '../deletion-modal/deletion-modal.component';
import { ElectronService } from 'ngx-electron';
import { DataConfiguration } from 'src/app/common/data/data-configuration.class';

@Component({
  selector: 'app-components-index',
  templateUrl: './components-index.component.html',
  styleUrls: ['./components-index.component.scss']
})
export class ComponentsIndexComponent implements OnInit {

  constructor(
    private dataProvider: DataProviderService,
    private dialog: MatDialog,
    private editorService: ComponentEditorService,
    private electronService: ElectronService
  ) { }

  ngOnInit() {
    this.dataProvider.getBank("components").load();
  }

  addComponent() {
    this.dialog.open(MetadataEditionModalComponent).afterClosed().subscribe((data: BaseData) => {
      if (data) {
        this.dataProvider.getBank("components").createItem(data);
        this.dataProvider.getBank("components").save();
      }
    });
  }

  get components(): EditorComponent[] {
    return this.dataProvider.getBank("components").items;
  }

  deleteItem(item: EditorComponent) {
    this.dialog.open(DeletionModalComponent).afterClosed().subscribe(deletion => {
      if (deletion) {
        this.dataProvider.getBank("components").delete(item);
        this.dataProvider.getBank("components").save();

        // removing the folder
        let fs = this.electronService.remote.require("fs");
        let dir = DataConfiguration.savePath + this.editorService.componentId;

        /* if (fs.existsSync(dir)) {
          fs.rmdirSync(dir, { recursive: true });
        } */
      }
    })
  }

}
