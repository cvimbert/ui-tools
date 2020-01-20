import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FlexibleRectangle } from 'src/app/common/geometry/flexible-rectangle.class';
import { ComponentEditorService } from '../../component-editor.service';
import { Unity } from 'src/app/common/geometry/unity.enum';
import { PropertyLineData } from '../../interfaces/property-line-data.interface';

@Component({
  selector: 'property-line',
  templateUrl: './property-line.component.html',
  styleUrls: ['./property-line.component.scss']
})
export class PropertyLineComponent implements OnInit, OnChanges {

  @Input() name: string;
  @Input() property: string;
  @Input() object: FlexibleRectangle;
  @Input() data: PropertyLineData;

  useUnities = true;
  type: string;
  usePixelUnity: boolean;
  usePercentUnity: boolean;

  constructor(
    public editorService: ComponentEditorService
  ) { }

  ngOnInit() {
    // this.useUnities == (this.data.availableUnities !== undefined) && this.data.availableUnities.length > 0;
    this.usePercentUnity = this.useUnity(Unity.PERCENT);
    this.usePixelUnity = true;
  }

  useUnity(type: any): boolean {
    return this.data.availableUnities !== undefined && this.data.availableUnities.indexOf(type) !== -1;
  }

  get value(): any {
    return this.object[this.property].value;
  }

  set value(value: any) {
    this.object[this.property].value = value;
    this.object.render();
  }

  get unity(): Unity {
    return this.object[this.property].unity;
  }

  set unity(value: Unity) {    
    this.object[this.property].unity = value;
    this.object.render();
  }

  ngOnChanges() {
    this.type = typeof this.value;
  }

}
