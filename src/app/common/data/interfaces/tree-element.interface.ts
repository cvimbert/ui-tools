import { GraphicObjectContainer } from '../../graphic/graphic-object-container.class';

export interface TreeElement {
  element: GraphicObjectContainer;
  children?: TreeElement[];
  depth?: number;
}