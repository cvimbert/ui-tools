import { Component, OnInit, Input, ChangeDetectorRef, OnChanges } from '@angular/core';
import { FlexibleRectangle } from 'src/app/common/geometry/flexible-rectangle.class';
import { ComponentEditorService } from '../../component-editor.service';
import { PropertyLineData } from '../../interfaces/property-line-data.interface';
import { Unity } from 'src/app/common/geometry/unity.enum';
import { AdditionnalPanel } from 'src/app/common/data/interfaces/aditionnal-panels/additionnal-panel.interface';
import { GraphicObjectContainer } from 'src/app/common/graphic/graphic-object-container.class';
import { Textfield } from 'src/app/common/graphic/textfield.class';

@Component({
  selector: 'properties-editor',
  templateUrl: './properties-editor.component.html',
  styleUrls: ['./properties-editor.component.scss']
})
export class PropertiesEditorComponent implements OnInit, OnChanges {

  @Input() inspected: GraphicObjectContainer;

  private pixelAndPercent: Unity[] = [
    Unity.PERCENT,
    Unity.PIXEL
  ];

  GLOBAL_PROPERTIES: PropertyLineData[] = [
    { id: "width", name: "Width" },
    { id: "height", name: "Height" },
    { id: "xOrigin", name: "X origin", step: 0.1 },
    { id: "yOrigin", name: "Y origin", step: 0.1 },
    { id: "alpha", name: "Alpha", step: 0.1, availableUnities: [] },
    { id: "scaleX", name: "Scale X", step: 0.1 },
    { id: "scaleY", name: "Scale Y", step: 0.1 },
    { id: "rotation", name: "Rotation", step: 0.05 }
  ];

  XYWH_PROPERTIES: PropertyLineData[] = [
    { id: "x", name: "X"},
    { id: "y", name: "Y" }
  ];

  TRBL_PROPERTIES: PropertyLineData[] = [
    { id: "top", name: "Top", availableUnities: this.pixelAndPercent },
    { id: "right", name: "Right", availableUnities: this.pixelAndPercent },
    { id: "bottom", name: "Bottom", availableUnities: this.pixelAndPercent },
    { id: "left", name: "Left", availableUnities: this.pixelAndPercent }
  ];

  additionalPanels: AdditionnalPanel[] = [];

  constructor(
    public editorService: ComponentEditorService
  ) {
    
  }

  ngOnInit() {    
    
  }

  ngOnChanges() {
    switch (this.inspected.objectType) {
      case "textfield":
        this.additionalPanels = this.inspected.additionnalPanels;
        break;

      default:
        this.additionalPanels = [];
    }
  }

  createState() {
    
  }


  update() {
    
  }
}
