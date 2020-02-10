import { CoordinatesMode } from './coordinates-modes.enum';
import { Rectangle } from './interfaces/rectangle.interface';
import { ValueUnitPair } from './value-unit-pair.class';
import { Unity } from './unity.enum';
import { JsonObject, JsonProperty, Any } from 'json2typescript';
import { BaseDataItem } from '../data/base-data-item.class';

@JsonObject("FlexibleRectangle")
export class FlexibleRectangle extends BaseDataItem {

  @JsonProperty("mode", Any)
  _mode = CoordinatesMode.XYWH;

  @JsonProperty("x", ValueUnitPair)
  private _x: ValueUnitPair = new ValueUnitPair(0);

  @JsonProperty("y", ValueUnitPair)
  private _y: ValueUnitPair = new ValueUnitPair(0);

  @JsonProperty("xOrigin", ValueUnitPair)
  private _xOrigin: ValueUnitPair = new ValueUnitPair(0);

  @JsonProperty("yOrigin", ValueUnitPair)
  private _yOrigin: ValueUnitPair = new ValueUnitPair(0);

  @JsonProperty("width", ValueUnitPair)
  private _width: ValueUnitPair = new ValueUnitPair(0);

  @JsonProperty("height", ValueUnitPair)
  private _height: ValueUnitPair = new ValueUnitPair(0);

  @JsonProperty("rotation", ValueUnitPair)
  private _rotation: ValueUnitPair = new ValueUnitPair(0);

  @JsonProperty("scaleX", ValueUnitPair)
  private _scaleX: ValueUnitPair = new ValueUnitPair(1);

  @JsonProperty("scaleY", ValueUnitPair)
  private _scaleY: ValueUnitPair = new ValueUnitPair(1);

  @JsonProperty("alpha", ValueUnitPair)
  private _alpha = new ValueUnitPair(1);


  // TRBL
  @JsonProperty("top", ValueUnitPair)
  private _top: ValueUnitPair = new ValueUnitPair();

  @JsonProperty("right", ValueUnitPair)
  private _right: ValueUnitPair = new ValueUnitPair();

  @JsonProperty("bottom", ValueUnitPair)
  private _bottom: ValueUnitPair = new ValueUnitPair();

  @JsonProperty("left", ValueUnitPair)
  private _left: ValueUnitPair = new ValueUnitPair();

  private rectangle?: Rectangle;

  parent?: FlexibleRectangle

  constructor(
    
  ) {    
    super();
  }

  // à faire après la création de l'objet
  initRect(rect?: Rectangle, parent?: FlexibleRectangle) {
    this.rectangle = rect;
    this.parent = parent;

    if (this.rectangle) {
      this._x.value = this.rectangle.x || 0;
      this._y.value = this.rectangle.y || 0;
      this._width.value = this.rectangle.width || 0;
      this._height.value = this.rectangle.height || 0;
      this._xOrigin.value = this.rectangle.xOrigin || 0;
      this._yOrigin.value = this.rectangle.yOrigin || 0;
    }
  }

  fillDefaultData() {

  }

  get mode(): CoordinatesMode {
    return this._mode;
  }

  set mode(value: CoordinatesMode) {
    this._mode = value;
    this.calculate();
  }

  get x(): ValueUnitPair {
    return this._x;
  }

  set x(value: ValueUnitPair) {
    this._x = value;
  }

  get xValue(): number {
    return this._x.value;
  }

  set xValue(value: number) {
    this._x.value = value;
  }

  get y(): ValueUnitPair {
    return this._y;
  }

  set y(value: ValueUnitPair) {
    this._y = value;
  }

  get yValue(): number {
    return this._y.value;
  }

  set yValue(value: number) {
    this._y.value = value;
  }

  get xOrigin(): ValueUnitPair {
    return this._xOrigin;
  }

  set xOrigin(value: ValueUnitPair) {
    this._xOrigin = value;
    this.calculate();
  }

  get yOrigin(): ValueUnitPair {
    return this._yOrigin;
  }

  set yOrigin(value: ValueUnitPair) {
    this._yOrigin = value;
    this.calculate();
  }

  get width(): ValueUnitPair {
    return this._width;
  }

  set width(value: ValueUnitPair) {
    this._width = value;
    this.calculate();
  }

  get widthValue(): number {
    return this._width.value;
  }

  set widthValue(value: number) {
    this._width.value = value;
  }

  get height(): ValueUnitPair {
    return this._height;
  }

  set height(value: ValueUnitPair) {
    this._height = value;
    this.calculate();
  }

  get heightValue(): number {
    return this._height.value;
  }

  set heightValue(value: number) {
    this._height.value = value;
  }

  get rotation(): ValueUnitPair {
    return this._rotation;
  }

  set rotation(value: ValueUnitPair) {
    this._rotation = value;
  }

  get rotationValue(): number {
    return this._rotation.value;
  }

  set rotationValue(value: number) {
    this._rotation.value = value;
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

  get topValue(): number {
    return this._top.value;
  }

  set topValue(value: number) {
    this._top.value = value;
  }

  get rightValue(): number {
    return this._right.value;
  }

  set rightValue(value: number) {
    this._right.value = value;
  }

  get bottomValue(): number {
    return this._bottom.value;
  }

  set bottomValue(value: number) {
    this._bottom.value = value;
  }

  get leftValue(): number {
    return this._left.value;
  }

  set leftValue(value: number) {
    this._left.value = value;
  }

  get top(): ValueUnitPair {
    return this._top;
  }

  get alpha(): ValueUnitPair {
    return this._alpha;
  }

  set alpha(value: ValueUnitPair) {
    this._alpha = value;
  }

  get alphaValue(): number {
    return this._alpha.value;
  }

  set alphaValue(value: number) {
    this._alpha.value = value;
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

  getCalculatedValue(valuePair: ValueUnitPair, percentCallback: () => number) {    
    if (valuePair.unity === Unity.PERCENT && this.parent) {     
      return percentCallback();
    } else {
      return valuePair.value;
    }
  }

  calculate() {
    if (this.mode === CoordinatesMode.TRBL) {


      // console.log("ici");
      
      // Pourcentage uniquement pour le mode TRLB ?
      let topPxVal = this.getCalculatedValue(this._top, () => this.parent.height.value * this._top.value / 100);
      let rightPxVal = this.getCalculatedValue(this._right, () => this.parent.width.value * (1 - this._right.value / 100));
      let bottomPxVal = this.getCalculatedValue(this._bottom, () => this.parent.height.value * (1 - this._bottom.value / 100));
      let leftPxVal = this.getCalculatedValue(this._left, () => this.parent.width.value * this._left.value / 100);

      // console.log(leftPxVal, rightPxVal);
      

      if (topPxVal != null) {        
        this._y.value = topPxVal;
      }

      if (bottomPxVal != null && topPxVal == null && this.parent) {
        this._y.value = this.parent.height.value - bottomPxVal;
      }

      if (topPxVal != null && bottomPxVal != null && this.parent) {
        this._height.value = this.parent.height.value - (topPxVal + bottomPxVal);
      }

      if (leftPxVal != null) {
        this._x.value = leftPxVal;
      }
  
      if (rightPxVal != null && leftPxVal == null && this.parent) {
        this._x.value = this.parent.width.value - rightPxVal;
      }
  
      if (leftPxVal != null && rightPxVal != null && this.parent) {
        this._width.value = this.parent.width.value - (leftPxVal + rightPxVal);
      }
    }
  }
}