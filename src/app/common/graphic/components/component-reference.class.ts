import { JsonObject, JsonProperty } from 'json2typescript';
import { NodalContainer } from '../nodal-container.class';

@JsonObject("ComponentReference")
export class ComponentReference extends NodalContainer {

  constructor() {
    super();
  }

  @JsonProperty("componentId", String)
  componentId = "";
}