import { BaseData } from 'src/app/common/data/interfaces/base-data.interface';
import { GraphicObjectState } from 'src/app/common/graphic/states/graphic-object-state.class';

export interface EditSceneStateData {
    objectState: GraphicObjectState;
    used: boolean;
}