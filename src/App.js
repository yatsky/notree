import React, {useState} from 'react';
import {createPlateComponents, createPlateOptions, Plate} from '@udecode/plate';
import {pluginsBasic, initialValueBasicElements} from './plugins/pluginsBasic'
import {EDITABLE_VOID} from "./plugins/field/defaults";
import {EditableVoidElement} from "./plugins/field/field";
import {createEditableVoidPlugin} from "./plugins/field/createFieldPlugin";
import {BallonToolbarMarks, HeadingToolbarMarks} from "./toolbar/toolbar";

const baseComponents = createPlateComponents();
const options = createPlateOptions();

const components = {
    ...baseComponents,
    [EDITABLE_VOID]: EditableVoidElement
}

const plugins = [
    ...pluginsBasic,
    createEditableVoidPlugin(),
]

function App() {
    const [debugVal, setDebugVal] = useState(null);
    const onChange = (newV) => {
        setDebugVal(JSON.stringify(newV))
    }

    const editableProps = {
        placeholder: 'Type...,',
        style: {
            padding: '15px'
        }
    }
    return (
        <>
            <BallonToolbarMarks />
            <HeadingToolbarMarks />
        <Plate id="1" editableProps={editableProps}
                   initialValue={initialValueBasicElements}
                   plugins={plugins}
                   components={components}
                   options={options}
                   onChange={(newV) => onChange(newV)}>
        </Plate>
        </>
    );
}

export default App;
