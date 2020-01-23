import { Component, OnInit, Input } from '@angular/core';
import { AdditionnalPanelEntry } from 'src/app/common/data/interfaces/aditionnal-panels/additionnal-panel-entry.interface';

@Component({
  selector: 'additional-entry',
  templateUrl: './additional-entry.component.html',
  styleUrls: ['./additional-entry.component.scss']
})
export class AdditionalEntryComponent implements OnInit {

  @Input() entry: AdditionnalPanelEntry;

  constructor() { }

  ngOnInit() {
  }

  get value(): any {
    return this.entry.getter();
  }

  set value(val: any) {
    this.entry.setter(val);
  }

}
