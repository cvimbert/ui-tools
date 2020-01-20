import { BasicRectSprite } from '../../graphic/basic-rect-sprite.class';

export interface BankConfigurationItem {
    name: string;
    objectContructor: {new (): any};
}