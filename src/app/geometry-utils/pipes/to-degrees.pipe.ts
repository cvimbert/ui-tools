import { Pipe, PipeTransform } from '@angular/core';
import { GeometryUtils } from 'src/app/common/geometry/geometry-utils.class';

@Pipe({
  name: 'toDegrees'
})
export class ToDegreesPipe implements PipeTransform {

  transform(value: number): number {
    return GeometryUtils.toDegrees(value);
  }

}
