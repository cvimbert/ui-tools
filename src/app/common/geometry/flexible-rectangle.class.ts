import { CoordinatesMode } from './coordinates-modes.enum';
import { Rectangle } from './interfaces/rectangle.interface';

export class FlexibleRectangle {

  mode = CoordinatesMode.XYWH;

  private _x = 0;
  private _y = 0;
  private _width = 0;
  private _height = 0;

  top: number;
  right: number;
  bottom: number;
  left: number;

  constructor(rectangle?: Rectangle) {
    if (rectangle) {
      this._x = rectangle.x || 0;
      this._y = rectangle.y || 0;
      this._width = rectangle.width || 0;
      this._height = rectangle.height || 0;
    }
  }

  get x(): number {
    return this._x;
  }

  set x(value: number) {
    this._x = value;
  }

  get y(): number {
    return this._y;
  }

  set y(value: number) {
    this._y = value;
  }

  get width(): number {
    return this._width;
  }

  set width(value: number) {
    this._width = value;
  }

  get height(): number {
    return this._height;
  }

  set height(value: number) {
    this._height = value;
  }
}