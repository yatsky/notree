import {
    getPlatePluginTypes,
    getRenderElement,
} from '@udecode/plate';
import { EDITABLE_VOID } from './defaults';

export const createEditableVoidPlugin = () => ({
    renderElement: getRenderElement(EDITABLE_VOID),
    voidTypes: getPlatePluginTypes(EDITABLE_VOID),
});