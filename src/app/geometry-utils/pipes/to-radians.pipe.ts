import { Pipe, PipeTransform } from '@angular/core';
import { GeometryUtils } from 'src/app/common/geometry/geometry-utils.class';

@Pipe({
  name: 'toRadians'
})
export class ToRadiansPipe implements PipeTransform {

  transform(value: number): number {
    return GeometryUtils.toRadians(value);
  }

}
