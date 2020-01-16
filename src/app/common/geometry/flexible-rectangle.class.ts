import { CoordinatesMode } from './coordinates-modes.enum';
import { Rectangle } from './interfaces/rectangle.interface';

export class FlexibleRectangle {

  mode = CoordinatesMode.XYWH;

  private _x = 0;
  private _y = 0;
  private _width = 0;
  private _height = 0;
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

    if (this.mode === CoordinatesMode.TRBL) {
      this._y = value;

      if (this._bottom != undefined && this.parent) {
        // Mise à jour de la hauteur de l'objet
        this._height = this.parent.height - (this._top + this._height);
      }
    }
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

    if (this.mode === CoordinatesMode.TRBL) {

      if (this.parent) {
        this._height = this.parent.height - (this._top + this._height);
      }
    }
  }

  get left(): number {
    return this._left;
  }

  set left(value: number) {
    this._left = value;
  }

  render() {
    console.log("Must be overriden");
  }
}