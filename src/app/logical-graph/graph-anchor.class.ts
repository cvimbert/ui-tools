import { JsonObject, JsonProperty } from 'json2typescript';
import { GraphTarget } from './interfaces/graph-target.interface';
import { AnchorItem } from './interfaces/anchor-item.interface';
import { BaseGameStructure } from './base-game-structure.class';
import { ComponentClusterInterface } from '../common/data/interfaces/component-cluster.interface';

@JsonObject("GraphAnchor")
export class GraphAnchor extends BaseGameStructure implements GraphTarget {

  inAnchors: AnchorItem[] = [];
  outAnchors: AnchorItem[] = [];

  label = "";

  baseOutAnchor: AnchorItem = {
    id: "ontriggered",
    label: "On triggered",
    callback: () => {
      this.triggerOut();
    }
  };

  baseInAnchor: AnchorItem = {
    id: "trigger",
    label: "Trigger",
    callback: () => {
      this.triggerIn();
    }
  };


  init() {
    if (this.type === "in") {
      this.outAnchors = [
        this.baseOutAnchor
      ];
    }

    if (this.type === "out") {
      this.inAnchors = [
        this.baseInAnchor
      ];
    }

    this.label = this.name;
  }

  @JsonProperty("t")
  type = "";

  @JsonProperty("an")
  anchorName = "";

  @JsonProperty("aid")
  anchorId = "";

  triggerIn() {
    if (this.graphService.reference) {
      let anchorItem = this.graphService.reference.outAnchors.find(anchor => anchor.id === this.anchorId);      
      this.graphService.parentCluster.playAllIn(anchorItem, this.graphService.reference.parentGraphItem);
    }
  }

  triggerOut() {
    this.graphService.playOut(this.baseOutAnchor, this.parentGraphItem);
  }
}