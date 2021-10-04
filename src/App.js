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
import {handleExport} from "./utils/export";

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
    const [appVal, setAppVal] = useState({
        '1': initialValueBasicElements,
        '2': initialValueBasicElements,
    });
    const [currentPage, setCurrentPage] = useState('1')

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

    const selectPage = (val) => {
        setCurrentPage(val)
    }
    const pageButtons = () => {
        return Object.keys(appVal).map((el) => (
            <button
                key={el}
                onClick={() => selectPage(el)}>
                Page {el}
            </button>))
    }

    return (
        <>
            <button onClick={handleHTMLChange}>Print</button>
            {pageButtons()}
            <BallonToolbarMarks/>
            <HeadingToolbarMarks/>
            <Plate id={"page" + currentPage} editableProps={editableProps}
                   initialValue={appVal[currentPage]}
                   plugins={plugins}
                   components={components}
                   options={options}
                   onChange={(newV) => {
                       setAppVal({
                           ...appVal,
                           [currentPage]: newV
                       })
                       handleHTMLChange()
                   }}
            >

                {JSON.stringify(appVal[currentPage])}
                <br/>
            </Plate>
        </>
    );
}

export default App;
