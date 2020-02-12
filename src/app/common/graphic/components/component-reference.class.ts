import { JsonObject, JsonProperty } from 'json2typescript';
import { NodalContainer } from '../nodal-container.class';
import { GraphTarget } from 'src/app/logical-graph/interfaces/graph-target.interface';

@JsonObject("ComponentReference")
export class ComponentReference extends NodalContainer implements GraphTarget {

  @JsonProperty("componentId", String)
  componentId = "";

  constructor() {
    super();
  }


}