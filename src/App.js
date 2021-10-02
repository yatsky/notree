import React, {useState} from 'react';
import {createPlateComponents, createPlateOptions, Plate} from '@udecode/plate';
import {pluginsBasic, initialValueBasicElements} from './plugins/pluginsBasic'
import {FIELD} from "./plugins/field/defaults";
import {Field} from "./plugins/field/field";
import {createFieldPlugin} from "./plugins/field/createFieldPlugin";
import {BallonToolbarMarks, HeadingToolbarMarks} from "./toolbar/toolbar";
import {MARK_BG_COLOR, MARK_COLOR, MARK_FONT_SIZE} from "@udecode/plate-font";
import {StyledLeaf, withStyledProps} from "@udecode/plate-styled-components";

const baseComponents = createPlateComponents();
const options = createPlateOptions();

const components = {
    ...baseComponents,
    [FIELD]: Field,
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
            {debugVal}
        </Plate>
        </>
    );
}

export default App;
