import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject("GraphicObjectStyle")
export class GraphicObjectStyle {

  @JsonProperty("paddingTop", Number, true)
  paddingTop = 0;

  @JsonProperty("paddingRight", Number, true)
  paddingRight = 0;

  @JsonProperty("paddingBottom", Number, true)
  paddingBottom = 0;

  @JsonProperty("paddingLeft", Number, true)
  paddingLeft = 0;

  set padding(value: number) {
    this.paddingTop = this.paddingRight = this.paddingBottom = this.paddingLeft = value;
  }

  get padding(): number {
    return this.getValueIfEquality(this.paddingTop, this.paddingRight, this.paddingBottom, this.paddingLeft);
  }


  @JsonProperty("marginTop", Number, true)
  marginTop = 0;

  @JsonProperty("marginRight", Number, true)
  marginRight = 0;

  @JsonProperty("marginBottom", Number, true)
  marginBottom = 0;

  @JsonProperty("marginLeft", Number, true)
  marginLeft = 0;

  set margin(value: number) {
    this.marginTop = this.marginRight = this.marginBottom = this.marginLeft = value;
  }

  get margin(): number {
    return this.getValueIfEquality(this.marginTop, this.marginRight, this.marginBottom, this.marginLeft);
  }

  getValueIfEquality(...values: number[]): number {
    let last: number;

    for (let val of values) {
      if (last == undefined) {
        last = val;
      } else {
        if (val != last) {
          return null;
        }
      }
    }

    return last;
  }
}