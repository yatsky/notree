import React, {useState} from 'react';
import {createEditorPlugins, createPlateComponents, createPlateOptions, Plate} from '@udecode/plate';
import {pluginsBasic, initialValueBasicElements} from './plugins/pluginsBasic'
import {FIELD} from "./plugins/field/defaults";
import {FieldElement} from "./plugins/field/fieldElement";
import {createFieldPlugin} from "./plugins/field/createFieldPlugin";
import {BallonToolbarMarks, HeadingToolbarMarks} from "./toolbar/toolbar";
import {MARK_BG_COLOR, MARK_COLOR, MARK_FONT_SIZE} from "@udecode/plate-font";
import {StyledLeaf, withStyledProps} from "@udecode/plate-styled-components";
import {serializeHTMLFromNodes} from "@udecode/plate-html-serializer";
import {useEventEditorId, useStoreEditorRef} from "@udecode/plate-core";

const baseComponents = createPlateComponents();
const options = createPlateOptions();

const components = {
    ...baseComponents,
    [FIELD]: FieldElement,
    [MARK_COLOR]: withStyledProps(StyledLeaf, {
        leafProps: {
            [MARK_COLOR]: ['color'],
        },
    }),
    [MARK_BG_COLOR]: withStyledProps(StyledLeaf, {
        leafProps: {
            [MARK_BG_COLOR]: ['backgroundColor'],
        },
    }),
    [MARK_FONT_SIZE]: withStyledProps(StyledLeaf, {
        leafProps: {
            [MARK_FONT_SIZE]: ['fontSize'],
        },
    }),

}

const plugins = [
    ...pluginsBasic,
    createFieldPlugin(),
]

function App() {
    const editor = useStoreEditorRef(useEventEditorId('focus'));
    const [htmlVal, setHTMLVal] = useState(null);

    const editableProps = {
        placeholder: 'Type...,',
        style: {
            padding: '15px'
        }
    }
    const handleHTMLChange = () => setHTMLVal(serializeHTMLFromNodes(createEditorPlugins(plugins), {
        plugins: plugins, nodes:
        editor.children,
        preserveClassNames: ["slate-", "notree-"]
    }))

    return (
        <>
            <button onClick={handleHTMLChange}>Print</button>
            <BallonToolbarMarks/>
            <HeadingToolbarMarks/>
            <Plate id="1" editableProps={editableProps}
                   initialValue={initialValueBasicElements}
                   plugins={plugins}
                   components={components}
                   options={options}
            >
                {htmlVal}
            </Plate>
        </>
    );
}

export default App;
