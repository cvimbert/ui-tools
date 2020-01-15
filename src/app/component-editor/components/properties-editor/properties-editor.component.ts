import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FlexibleRectangle } from 'src/app/common/geometry/flexible-rectangle.class';
import { ComponentEditorService } from '../../component-editor.service';

@Component({
  selector: 'properties-editor',
  templateUrl: './properties-editor.component.html',
  styleUrls: ['./properties-editor.component.scss']
})
export class PropertiesEditorComponent implements OnInit {

  @Input() inspected: FlexibleRectangle;

  PROPERTIES: {
    id: string;
    name: string;
  }[] = [
    { id: "x", name: "X" },
    { id: "y", name: "Y" },
    { id: "width", name: "Width" },
    { id: "height", name: "Height" },
    { id: "scaleX", name: "Scale X" },
    { id: "scaleY", name: "Scale Y" }
  ];

  constructor(
    private cdRef: ChangeDetectorRef,
    public editorService: ComponentEditorService
  ) { }

  ngOnInit() {
  }

  update() {
    // this.cdRef.detectChanges();
  }
}
