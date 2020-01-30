import { Component, OnInit } from '@angular/core';
import { ComponentEditorService } from '../../component-editor.service';
import { DataProviderService } from '../../services/data-provider.service';
import { EditorComponent } from '../../editor-component.class';
import { MatDialog } from '@angular/material/dialog';
import { MetadataEditionModalComponent } from '../metadata-edition-modal/metadata-edition-modal.component';
import { BaseData } from 'src/app/common/data/interfaces/base-data.interface';

@Component({
  selector: 'app-components-index',
  templateUrl: './components-index.component.html',
  styleUrls: ['./components-index.component.scss']
})
export class ComponentsIndexComponent implements OnInit {

  constructor(
    private editorService: ComponentEditorService,
    private dataProvider: DataProviderService,
    private dialog: MatDialog
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

}
