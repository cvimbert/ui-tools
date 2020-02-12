import { AnchorItem } from 'src/app/logical-graph/interfaces/anchor-item.interface';
import { GraphItem } from 'src/app/logical-graph/graph-item.class';
import { GraphViewComponent } from 'src/app/logical-graph/components/graph-view/graph-view.component';
import { ComponentEditorScene } from 'src/app/component-editor/component-editor-scene.class';
import { DataBank } from '../data-bank.class';
import { ComponentReference } from '../../graphic/components/component-reference.class';

export interface ComponentClusterInterface {
  playOut(anchor: AnchorItem, graphItem: GraphItem): void;
  playAllIn(inAnchor: AnchorItem, graphItem: GraphItem): void;
  playIn(inAnchor: AnchorItem, graphItem: GraphItem): void;
  mainView?: GraphViewComponent;
  mainScene: ComponentEditorScene;
  providers: { [key: string]: DataBank<any> };
  parentCluster: ComponentClusterInterface;
  reference: ComponentReference;
}