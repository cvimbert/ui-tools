import { Component, OnInit, Input, ɵArgumentType } from '@angular/core';
import { Argument } from '../../interfaces/argument.interface';
import { ArgumentValue } from '../../argument-value.class';
import { ArgumentType } from '../../argument-type.class';
import { GraphicObjectState } from 'src/app/common/graphic/states/graphic-object-state.class';

@Component({
  selector: 'arguments-editor-section',
  templateUrl: './arguments-editor-section.component.html',
  styleUrls: ['./arguments-editor-section.component.scss']
})
export class ArgumentsEditorSectionComponent implements OnInit {

  @Input() arg: Argument;
  @Input() values: ArgumentValue[];
  selectedType: string;
  value: any;
  argTypes: string | string[];

  constructor() { }

  ngOnInit() {
    if (typeof this.arg.type === "function") {
      this.argTypes = this.arg.type(this.values);
    } else {
      this.argTypes = this.arg.type;
    }

    if (Array.isArray(this.argTypes)) {
      this.selectedType = this.argTypes[0];
    } else {
      this.selectedType = this.argTypes === ArgumentType.ALL ? ArgumentType.STRING : this.argTypes;
    }

    this.select(this.selectedType);

    if (this.values) {      
      let valueArg = this.values.find(value => value.id === this.arg.id);

      if (valueArg) {
        this.value = valueArg.value;
      }
    }
  }

  select(type: string) {
    if (type !== this.selectedType) {      
      switch (type) {
        case ArgumentType.STRING:
          this.value = "";
          break;
  
        case ArgumentType.NUMBER:
          this.value = 0;
          break;
  
        case ArgumentType.BOOLEAN:
          this.value = "true";
          break;
      }
    }

    this.selectedType = type;
  }

  isOfType(type: string): boolean {
    if (Array.isArray(this.argTypes)) {
      return this.argTypes.indexOf(type) !== -1;
    } else {
      if (this.argTypes === ArgumentType.ALL) {
        return true;
      } else {
        return this.argTypes === type;
      }
    }
  }

  get objectProperties(): string[] {
    return GraphicObjectState.animatedProperties;
  }

  getValue(): any {
    switch (this.selectedType) {
      case ArgumentType.BOOLEAN:
        return this.value === "true";

      default:
        return this.value;
    }
  }

  getArgumentValue(): ArgumentValue {
    let argValue = new ArgumentValue();
    argValue.id = this.arg.id;
    argValue.value = this.getValue();
    argValue.type = this.selectedType;
    return argValue;
  }
}
