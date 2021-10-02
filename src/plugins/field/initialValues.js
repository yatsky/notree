import {ELEMENT_PARAGRAPH} from "@udecode/plate-paragraph";
import {FIELD} from "./defaults";

export const initialValueVoids = [
    {
        type: ELEMENT_PARAGRAPH,
        children: [
            {
                text:
                    'In addition to nodes that contain editable text, you can insert void nodes, which can also contain editable elements, inputs, or an entire other Slate editor.',
            },
        ],
    },
    {
        type: FIELD,
        children: [{ text: '' }],
    },
    {
        type: ELEMENT_PARAGRAPH,
        children: [
            {
                text: '',
            },
        ],
    },
];