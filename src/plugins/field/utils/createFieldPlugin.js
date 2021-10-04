import * as React from 'react';
import {
    getPlatePluginTypes,
    getRenderElement,
} from '@udecode/plate';
import { FIELD } from '../defaults';

export const createFieldPlugin = (options) => ({
    deserialize: () => {
        return {element: [
            {
                type: FIELD,
                deserialize: el => {
                    return { otree: 'test' }
                },
            },
        ]}
    },

    renderElement: getRenderElement(FIELD),
    pluginKeys: FIELD,
    // inlineTypes: getPlatePluginTypes(FIELD),
    voidTypes: getPlatePluginTypes(FIELD),
    // serialize needs to be an object, not method
    serialize: {
        element: (props) => {
            return <div className={"notree-" + props.element.model}><p>{props.element.label}</p></div>
        },
    },
    // withOverrides: withInlineVoid(options),
});