import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject("BaseDataItem")
export class BaseDataItem {

  @JsonProperty("id", String)
  id = "";

  @JsonProperty("name", String)
  name = "";

  @JsonProperty("description", String)
  description = "";
}