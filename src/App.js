import React, {useState} from 'react';
import {createEditorPlugins, createPlateComponents, createPlateOptions, Plate} from '@udecode/plate';
import {pluginsBasic, initialValueBasicElements} from './plugins/pluginsBasic'
import {FIELD} from "./plugins/field/defaults";
import {FieldElement} from "./plugins/field/component/fieldElement";
import {createFieldPlugin} from "./plugins/field/utils/createFieldPlugin";
import {BallonToolbarMarks, HeadingToolbarMarks} from "./toolbar/toolbar";
import {MARK_BG_COLOR, MARK_COLOR, MARK_FONT_SIZE} from "@udecode/plate-font";
import {StyledLeaf, withStyledProps} from "@udecode/plate-styled-components";
import {serializeHTMLFromNodes} from "@udecode/plate-html-serializer";
import {useEventEditorId, useStoreEditorRef} from "@udecode/plate-core";
import {html} from 'js-beautify'
import FileSaver from 'file-saver'

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
    const [debugVal, setDebugVal] = useState(null);

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

    const handleExport = async () => {
        // setLoadingExport(true)
        // Why plugins and parser: https://github.com/prettier/prettier/pull/6268#issue-294147726
        // let text = prettier.format(serializeHTMLFromNodes({ plugins: plugins, nodes: editor.children }), {
        //   parser: 'html',
        //   plugins: [parserHTML],
        // })
        let text = (
            html(
                serializeHTMLFromNodes(createEditorPlugins(plugins), {
                    plugins: plugins,
                    nodes: editor.children,
                    preserveClassNames: ["slate-", "notree-"],
                })
            )
        )
        let blob = new Blob([text], { type: 'text/html;charset=utf-8' })
        await FileSaver.saveAs(blob, 'notree-download.html')
        // setLoadingExport(false)
    }
    return (
        <>
            <button onClick={handleHTMLChange}>Print</button>
            <button onClick={handleExport}>Export</button>
            <BallonToolbarMarks/>
            <HeadingToolbarMarks/>
            <Plate id="1" editableProps={editableProps}
                   initialValue={initialValueBasicElements}
                   plugins={plugins}
                   components={components}
                   options={options}
                   onChange={(newV) => {
                       setDebugVal(newV)
                       handleHTMLChange()
                   }}
            >

                {JSON.stringify(debugVal)}
                <br/>
                {htmlVal}
            </Plate>
        </>
    );
}

export default App;
