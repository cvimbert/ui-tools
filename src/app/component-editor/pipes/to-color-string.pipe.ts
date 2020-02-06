import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toColorString'
})
export class ToColorStringPipe implements PipeTransform {

  transform(value: number | string): string {
    if (typeof value === "number") {
      return "#" + value.toString(16);
    } else if (typeof value === "string") {
      return value;
    }
  }
}
