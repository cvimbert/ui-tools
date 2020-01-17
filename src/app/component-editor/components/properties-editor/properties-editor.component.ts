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

  XYWH_PROPERTIES: {
    id: string;
    name: string;
    step?: number;
  }[] = [
    { id: "x", name: "X" },
    { id: "y", name: "Y" },
    { id: "width", name: "Width" },
    { id: "height", name: "Height" },
    { id: "xOrigin", name: "X origin" },
    { id: "yOrigin", name: "Y origin" },
    { id: "scaleX", name: "Scale X" },
    { id: "scaleY", name: "Scale Y" },
    { id: "alpha", name: "Alpha" }
  ];

  TRBL_PROPERTIES: {
    id: string;
    name: string;
    step?: number;
  }[] = [
    { id: "top", name: "Top" },
    { id: "right", name: "Right" },
    { id: "bottom", name: "Bottom" },
    { id: "left", name: "Left" }
  ];

  constructor(
    public editorService: ComponentEditorService
  ) { }

  ngOnInit() {
  }

  update() {
    
  }
}
