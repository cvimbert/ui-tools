import { CoordinatesMode } from './coordinates-modes.enum';
import { Rectangle } from './interfaces/rectangle.interface';

export class FlexibleRectangle {

  mode = CoordinatesMode.XYWH;

  private _x = 0;
  private _y = 0;
  private _xOrigin = 0;
  private _yOrigin = 0;
  private _width = 0;
  private _height = 0;
  private _rotation = 0;
  private _scaleX = 1;
  private _scaleY = 1;

  private _top: number;
  private _right: number;
  private _bottom: number;
  private _left: number;

  constructor(
    rectangle?: Rectangle,
    public parent?: FlexibleRectangle
  ) {    

    if (rectangle) {
      this._x = rectangle.x || 0;
      this._y = rectangle.y || 0;
      this._width = rectangle.width || 0;
      this._height = rectangle.height || 0;
      this._xOrigin = rectangle.xOrigin || 0;
      this._yOrigin = rectangle.yOrigin || 0;
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

  get xOrigin(): number {
    return this._xOrigin;
  }

  set xOrigin(value: number) {
    this._xOrigin = value;
  }

  get yOrigin(): number {
    return this._yOrigin;
  }

  set yOrigin(value: number) {
    this._yOrigin = value;
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

  get rotation(): number {
    return this._rotation;
  }

  set rotation(value: number) {
    this._rotation = value;
  }

  get scaleX(): number {
    return this._scaleX;
  }

  set scaleX(value: number) {
    this._scaleX = value;
  }

  get scaleY(): number {
    return this._scaleY;
  }

  set scaleY(value: number) {
    this._scaleY = value;
  }

  get top(): number {
    return this._top;
  }

  set top(value: number) {
    this._top = value;
    this.calculate();
  }

  get right(): number {
    return this._right;
  }

  set right(value: number) {
    this._right = value;
  }

  get bottom(): number {
    return this._bottom;
  }

  set bottom(value: number) {
    this._bottom = value;
    this.calculate();
  }

  get left(): number {
    return this._left;
  }

  set left(value: number) {
    this._left = value;
  }

  render() {
    this.calculate();
  }

  calculate() {
    if (this.mode === CoordinatesMode.TRBL) {
      if (this._top != undefined) {
        this._y = this._top;
      }

      if (this._bottom != undefined && this._top == undefined && this.parent) {
        this._y = this.parent.height - (this._height + this._bottom);
      }

      if (this._top != undefined && this._bottom != undefined && this.parent) {
        this._height = this.parent.height - (this._top + this._bottom);
      }

      if (this._left != undefined) {
        this._x = this._left;
      }
  
      if (this._right != undefined && this._left == undefined && this.parent) {
        this._x = this.parent.width - (this._width + this._right);
      }
  
      if (this._left != undefined && this._right != undefined && this.parent) {
        this._width = this.parent.width - (this._left + this._right);
      }
    }
  }
}