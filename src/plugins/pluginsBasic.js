import {createHistoryPlugin, createReactPlugin} from "@udecode/plate-core";
import {createParagraphPlugin, ELEMENT_PARAGRAPH} from "@udecode/plate-paragraph";
import {createBlockquotePlugin, ELEMENT_BLOCKQUOTE} from "@udecode/plate-block-quote";
import {createCodeBlockPlugin, ELEMENT_CODE_BLOCK, ELEMENT_CODE_LINE} from "@udecode/plate-code-block";
import {
    createHeadingPlugin,
    ELEMENT_H1,
    ELEMENT_H2,
    ELEMENT_H3,
    ELEMENT_H4,
    ELEMENT_H5,
    ELEMENT_H6
} from "@udecode/plate-heading";
import {
    createBoldPlugin,
    createCodePlugin,
    createItalicPlugin, createStrikethroughPlugin, createSubscriptPlugin, createSuperscriptPlugin,
    createUnderlinePlugin, MARK_BOLD, MARK_CODE, MARK_ITALIC, MARK_STRIKETHROUGH, MARK_UNDERLINE
} from "@udecode/plate-basic-marks";
import {EDITABLE_VOID} from "./field/defaults";
import {createAlignPlugin} from "@udecode/plate-alignment";
import {createTablePlugin} from "@udecode/plate-table";
import {createKbdPlugin} from "@udecode/plate-kbd";
import {createLinkPlugin} from "@udecode/plate-link";
import {createHighlightPlugin} from "@udecode/plate-highlight";
import {createImagePlugin} from "@udecode/plate-image";
import {createListPlugin} from "@udecode/plate-list";
import {createFontBackgroundColorPlugin, createFontColorPlugin, createFontSizePlugin} from "@udecode/plate-font";

export const pluginsBasic = [
    // editor
    createReactPlugin(),          // withReact
    createHistoryPlugin(),        // withHistory

    // elements
    createParagraphPlugin(),      // paragraph element
    createBlockquotePlugin(),     // blockquote element
    createCodeBlockPlugin(),      // code block element
    createHeadingPlugin(),        // heading elements

    // marks
    createBoldPlugin(),           // bold mark
    createItalicPlugin(),         // italic mark
    createUnderlinePlugin(),      // underline mark
    createStrikethroughPlugin(),  // strikethrough mark
    createCodePlugin(),           // code mark
    createFontColorPlugin(),
    createFontBackgroundColorPlugin(),
    createFontSizePlugin(),
    createSuperscriptPlugin(),
    createSubscriptPlugin(),

    // Other blocks
    createAlignPlugin(),
    createTablePlugin(),
    createLinkPlugin(),
    createKbdPlugin(),
    createHighlightPlugin(),
    createImagePlugin(),
    createListPlugin(),
];

// Quick helper to create a block element with (marked) text
export const createElement = (
    text = '',
    {
        type = ELEMENT_PARAGRAPH,
        mark,
    } = {}
) => {
    // syntax sugar to create {text: "string literal"} from variable text
    const leaf = { text };
    if (mark) {
        leaf[mark] = true;
    }

    return {
        type,
        children: [leaf],
    };
};

export const initialValueBasicElements = [
    // createElement('Editable Void', {type: EDITABLE_VOID}),
    createElement('🧱 Elements', {type: ELEMENT_H1}),
    createElement('🔥 Basic Elements', {type: ELEMENT_H2}),
    createElement('These are the most common elements, known as blocks:'),
    createElement('Heading 1', {type: ELEMENT_H1}),
    createElement('Heading 2', {type: ELEMENT_H2}),
    createElement('Heading 3', {type: ELEMENT_H3}),
    createElement('Heading 4', {type: ELEMENT_H4}),
    createElement('Heading 5', {type: ELEMENT_H5}),
    createElement('Heading 6', {type: ELEMENT_H6}),
    createElement('Blockquote', {type: ELEMENT_BLOCKQUOTE}),
    {
        type: ELEMENT_CODE_BLOCK,
        children: [
            {
                type: ELEMENT_CODE_LINE,
                children: [
                    {
                        text: "const a = 'Hello';",
                    },
                ],
            },
            {
                type: ELEMENT_CODE_LINE,
                children: [
                    {
                        text: "const b = 'World';",
                    },
                ],
            },
        ],
    },
    createElement('💅 Marks', {type: ELEMENT_H1}),
    createElement('💧 Basic Marks', {type: ELEMENT_H2}),
    createElement(
        'The basic marks consist of text formatting such as bold, italic, underline, strikethrough, subscript, superscript, and code.'
    ),
    createElement(
        'You can customize the type, the component and the hotkey for each of these.'
    ),
    createElement('This text is bold.', {mark: MARK_BOLD}),
    createElement('This text is italic.', {mark: MARK_ITALIC}),
    createElement('This text is underlined.', {
        mark: MARK_UNDERLINE,
    }),
    {
        type: ELEMENT_PARAGRAPH,
        children: [
            {
                text: 'This text is bold, italic and underlined.',
                [MARK_BOLD]: true,
                [MARK_ITALIC]: true,
                [MARK_UNDERLINE]: true,
            },
        ],
    },
    createElement('This is a strikethrough text.', {
        mark: MARK_STRIKETHROUGH,
    }),
    createElement('This is an inline code.', {mark: MARK_CODE}),
];