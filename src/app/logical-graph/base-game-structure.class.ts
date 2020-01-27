import { JsonProperty } from 'json2typescript';
import { GraphService } from './graph.service';
import { GraphItem } from './graph-item.class';
import { ArgumentValue } from './argument-value.class';

export class BaseGameStructure {

  graphService: GraphService;
  // cloudService: CloudService;
  parentGraphItem: GraphItem;

  label = "";

  @JsonProperty("id", String)
  id = "";

  @JsonProperty("name", String)
  name = "";

  @JsonProperty("description", String)
  description = "";

  init() {

  }

  initLabel() {
    this.label = this.name;
  }

  getArg(args: ArgumentValue[], name: string): ArgumentValue {
    return args.find(arg => arg.id === name);
  }
}