import { getLeafDeserializer } from '@udecode/plate-common';
import { getPlatePluginOptions } from '@udecode/plate-core';
import { FIELD } from './defaults';

export const getCodeDeserialize = () => (editor) => {
    const options = getPlatePluginOptions(editor, FIELD);

    return {
        leaf: getLeafDeserializer({
            type: options.type,
            rules: [
                { nodeNames: ['CODE'] },
                {
                    style: {
                        wordWrap: 'break-word',
                    },
                },
            ],
            ...options.deserialize,
        }),
    };
};
