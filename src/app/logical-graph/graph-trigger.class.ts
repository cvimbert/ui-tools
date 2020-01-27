import { JsonObject, JsonProperty } from 'json2typescript';
import { AnchorItem } from './interfaces/anchor-item.interface';
import { GraphTarget } from './interfaces/graph-target.interface';
import { TriggerType } from './trigger-type.class';
import { BaseGameStructure } from './base-game-structure.class';

@JsonObject("GraphTrigger")
export class GraphTrigger extends BaseGameStructure implements GraphTarget {

  onTriggerAnchor: AnchorItem = {
    id: "ontrigger",
    label: "On trigger",
    callback: () => {
      this.onTrigger();
    }
  };

  inAnchors = [];

  outAnchors = [
    this.onTriggerAnchor
  ];

  label = "";

  constructor() {
    super();
  };

  init() {
    if (this.type === TriggerType.KEYBOARD && this.key != "") {
      document.addEventListener("keydown", (e: KeyboardEvent) => {
        console.log(e.key);
        
        if (e.key.toUpperCase() === this.key.toUpperCase()) {
          this.graphService.playIn(this.onTriggerAnchor, this.parentGraphItem);
        }
      });
    }

    // this.label = this.name
  }

  @JsonProperty("t")
  type = "";

  @JsonProperty("k")
  key = "";

  onTrigger() {
    this.graphService.playOut(this.onTriggerAnchor, this.parentGraphItem);
  }
}