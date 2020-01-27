import { Point } from 'src/app/common/geometry/interfaces/point.interface';

export interface BaseItemData {
  id?: string;
  position: Point;
  anchors?: { [key: string]: Point };
}