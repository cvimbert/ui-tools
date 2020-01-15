import { Component, OnInit, Input } from '@angular/core';
import { FlexibleRectangle } from 'src/app/common/geometry/flexible-rectangle.class';

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
    { id: "y", name: "Y" }
  ]

  constructor() { }

  ngOnInit() {
  }

}
