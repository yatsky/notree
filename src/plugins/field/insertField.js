import { insertNodes, someNode } from '@udecode/plate-common';
import { getPlatePluginType,  } from '@udecode/plate-core';
import {FIELD} from "./defaults";
import {getEmptyFieldNode} from "./getEmptyFieldNode";

export const insertField = (
    editor
) => {
    if (
        !someNode(editor, {
            match: { type: getPlatePluginType(editor, FIELD) },
        })
    ) {
        insertNodes(editor, getEmptyFieldNode(editor));
    }
};