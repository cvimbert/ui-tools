import { JsonProperty } from 'json2typescript';
import { GraphItem } from './graph-item.class';
import { ArgumentValue } from './argument-value.class';
import { ComponentCluster } from '../common/graphic/components/component-cluster.class';
import { ComponentClusterInterface } from '../common/data/interfaces/component-cluster.interface';

export class BaseGameStructure {

  graphService: ComponentClusterInterface;
  cluster: ComponentCluster;
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