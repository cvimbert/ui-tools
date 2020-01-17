import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FlexibleRectangle } from 'src/app/common/geometry/flexible-rectangle.class';
import { ComponentEditorService } from '../../component-editor.service';
import { Unity } from 'src/app/common/geometry/unity.enum';

@Component({
  selector: 'property-line',
  templateUrl: './property-line.component.html',
  styleUrls: ['./property-line.component.scss']
})
export class PropertyLineComponent implements OnInit, OnChanges {

  @Input() name: string;
  @Input() property: string;
  @Input() object: FlexibleRectangle;

  type: string;

  constructor(
    public editorService: ComponentEditorService
  ) { }

  ngOnInit() {
    
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
  }

  ngOnChanges() {
    this.type = typeof this.value;
  }

}
