import { AnchorItem } from './anchor-item.interface';
import { GraphItem } from '../graph-item.class';
import { GraphService } from '../graph.service';
import { ComponentClusterInterface } from 'src/app/common/data/interfaces/component-cluster.interface';

export interface GraphTarget {
    id: string;
    name: string;
    description: string;
    inAnchors: AnchorItem[];
    outAnchors: AnchorItem[];
    graphService: ComponentClusterInterface;
    parentGraphItem: GraphItem;
    label: string;
    init?(): void;
    initLabel?(): void;
}