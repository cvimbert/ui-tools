import { JsonObject, JsonProperty } from 'json2typescript';
import { NodalContainer } from '../nodal-container.class';

@JsonObject("ComponentReference")
export class ComponentReference extends NodalContainer {

  @JsonProperty("componentId", String)
  componentId = "";

  constructor() {
    super();
  }


}