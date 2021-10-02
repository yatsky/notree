import {
    getPlatePluginTypes,
    getRenderElement,
} from '@udecode/plate';
import { FIELD } from './defaults';

export const createFieldPlugin = () => ({
    // deserialize: getFieldDeserialize(),
    renderElement: getRenderElement(FIELD),
    voidTypes: getPlatePluginTypes(FIELD),
});