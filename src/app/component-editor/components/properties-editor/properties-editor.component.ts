import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FlexibleRectangle } from 'src/app/common/geometry/flexible-rectangle.class';
import { ComponentEditorService } from '../../component-editor.service';
import { PropertyLineData } from '../../interfaces/property-line-data.interface';
import { Unity } from 'src/app/common/geometry/unity.enum';

@Component({
  selector: 'properties-editor',
  templateUrl: './properties-editor.component.html',
  styleUrls: ['./properties-editor.component.scss']
})
export class PropertiesEditorComponent implements OnInit {

  @Input() inspected: FlexibleRectangle;

  private pixelAndPercent: Unity[] = [
    Unity.PERCENT,
    Unity.PIXEL
  ];

  XYWH_PROPERTIES: PropertyLineData[] = [
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

  TRBL_PROPERTIES: PropertyLineData[] = [
    { id: "top", name: "Top", availableUnities: this.pixelAndPercent },
    { id: "right", name: "Right", availableUnities: this.pixelAndPercent },
    { id: "bottom", name: "Bottom", availableUnities: this.pixelAndPercent },
    { id: "left", name: "Left", availableUnities: this.pixelAndPercent }
  ];

  constructor(
    public editorService: ComponentEditorService
  ) { }

  ngOnInit() {
  }

  update() {
    
  }
}
