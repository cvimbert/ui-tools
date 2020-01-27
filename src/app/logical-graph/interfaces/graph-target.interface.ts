import { AnchorItem } from './anchor-item.interface';
import { GraphItem } from '../graph-item.class';
import { GraphService } from '../graph.service';

export interface GraphTarget {
    id: string;
    name: string;
    description: string;
    inAnchors: AnchorItem[];
    outAnchors: AnchorItem[];
    graphService: GraphService;
    parentGraphItem: GraphItem;
    label: string;
    init?(): void;
    initLabel?(): void;
}