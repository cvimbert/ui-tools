import { CoordinatesMode } from './coordinates-modes.enum';
import { Rectangle } from './interfaces/rectangle.interface';
import { ValueUnitPair } from './value-unit-pair.class';

export class FlexibleRectangle {

  mode = CoordinatesMode.XYWH;

  private _x: ValueUnitPair = new ValueUnitPair(0);
  private _y: ValueUnitPair = new ValueUnitPair(0);
  private _xOrigin: ValueUnitPair = new ValueUnitPair(0);
  private _yOrigin: ValueUnitPair = new ValueUnitPair(0);
  private _width: ValueUnitPair = new ValueUnitPair(0);
  private _height: ValueUnitPair = new ValueUnitPair(0);
  private _rotation: ValueUnitPair = new ValueUnitPair(0);
  private _scaleX: ValueUnitPair = new ValueUnitPair(1);
  private _scaleY: ValueUnitPair = new ValueUnitPair(1);

  private _top: ValueUnitPair = new ValueUnitPair();
  private _right: ValueUnitPair = new ValueUnitPair();
  private _bottom: ValueUnitPair = new ValueUnitPair();
  private _left: ValueUnitPair = new ValueUnitPair();

  constructor(
    rectangle?: Rectangle,
    public parent?: FlexibleRectangle
  ) {    

    if (rectangle) {
      this._x.value = rectangle.x || 0;
      this._y.value = rectangle.y || 0;
      this._width.value = rectangle.width || 0;
      this._height.value = rectangle.height || 0;
      this._xOrigin.value = rectangle.xOrigin || 0;
      this._yOrigin.value = rectangle.yOrigin || 0;
    }
  }

  get x(): ValueUnitPair {
    return this._x;
  }

  set x(value: ValueUnitPair) {
    this._x = value;
  }

  get y(): ValueUnitPair {
    return this._y;
  }

  set y(value: ValueUnitPair) {
    this._y = value;
  }

  get xOrigin(): ValueUnitPair {
    return this._xOrigin;
  }

  set xOrigin(value: ValueUnitPair) {
    this._xOrigin = value;
  }

  get yOrigin(): ValueUnitPair {
    return this._yOrigin;
  }

  set yOrigin(value: ValueUnitPair) {
    this._yOrigin = value;
  }

  get width(): ValueUnitPair {
    return this._width;
  }

  set width(value: ValueUnitPair) {
    this._width = value;
  }

  get height(): ValueUnitPair {
    return this._height;
  }

  set height(value: ValueUnitPair) {
    this._height = value;
  }

  get rotation(): ValueUnitPair {
    return this._rotation;
  }

  set rotation(value: ValueUnitPair) {
    this._rotation = value;
  }

  get scaleX(): ValueUnitPair {
    return this._scaleX;
  }

  set scaleX(value: ValueUnitPair) {
    this._scaleX = value;
  }

  get scaleY(): ValueUnitPair {
    return this._scaleY;
  }

  set scaleY(value: ValueUnitPair) {
    this._scaleY = value;
  }

  get top(): ValueUnitPair {
    return this._top;
  }

  set top(value: ValueUnitPair) {
    this._top = value;
    this.calculate();
  }

  get right(): ValueUnitPair {
    return this._right;
  }

  set right(value: ValueUnitPair) {
    this._right = value;
  }

  get bottom(): ValueUnitPair {
    return this._bottom;
  }

  set bottom(value: ValueUnitPair) {
    this._bottom = value;
    this.calculate();
  }

  get left(): ValueUnitPair {
    return this._left;
  }

  set left(value: ValueUnitPair) {
    this._left = value;
  }

  render() {
    this.calculate();
  }

  calculate() {
    if (this.mode === CoordinatesMode.TRBL) {
      if (this._top.value != undefined) {
        this._y.value = this._top.value;
      }

      if (this._bottom.value != undefined && this._top.value == undefined && this.parent) {
        this._y.value = this.parent.height.value - (this._height.value + this._bottom.value);
      }

      if (this._top.value != undefined && this._bottom.value != undefined && this.parent) {
        this._height.value = this.parent.height.value - (this._top.value + this._bottom.value);
      }

      if (this._left.value != undefined) {
        this._x.value = this._left.value;
      }
  
      if (this._right.value != undefined && this._left.value == undefined && this.parent) {
        this._x.value = this.parent.width.value - (this._width.value + this._right.value);
      }
  
      if (this._left.value != undefined && this._right.value != undefined && this.parent) {
        this._width.value = this.parent.width.value - (this._left.value + this._right.value);
      }
    }
  }
}