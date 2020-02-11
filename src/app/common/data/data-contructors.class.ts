import { BasicRectSprite } from '../graphic/basic-rect-sprite.class';
import { Image } from '../graphic/image.class';
import { NineSliceImage } from '../graphic/nine-slice-image.class';
import { Textfield } from '../graphic/textfield.class';
import { NodalContainer } from '../graphic/nodal-container.class';
import { ComponentReference } from '../graphic/components/component-reference.class';

export class DataConstructors {
  static CONSTRUCTORS: { [key: string]: { new (): any }} = {
    "image": Image,
    "baseRect": BasicRectSprite,
    "nineSliceImage": NineSliceImage,
    "textfield": Textfield,
    "nodalContainer": NodalContainer,
    "componentReference": ComponentReference
  };
}