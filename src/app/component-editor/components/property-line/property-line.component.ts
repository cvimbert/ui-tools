import { Component, OnInit, Input } from '@angular/core';
import { FlexibleRectangle } from 'src/app/common/geometry/flexible-rectangle.class';

@Component({
  selector: 'property-line',
  templateUrl: './property-line.component.html',
  styleUrls: ['./property-line.component.scss']
})
export class PropertyLineComponent implements OnInit {

  @Input() name: string;
  @Input() property: string;
  @Input() object: FlexibleRectangle;

  value: any;
  type: string;

  constructor() { }

  ngOnInit() {
    this.value = this.object[this.property];
    this.type = typeof this.value;
  }

}
