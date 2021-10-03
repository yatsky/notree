import React, {useState} from 'react';
import { useEditorRef } from '@udecode/plate-core';
import {ReactEditor} from "slate-react";
import {setNodes} from "@udecode/plate-common";

export const FieldElement = (props) => {
    // https://docs.slatejs.org/concepts/09-rendering
    const { attributes, children, element } = props;
    const editor = useEditorRef();
    const [fieldHidden,setFieldHidden ] = useState(false)

    const isValidName = (val) => {
        return !val.includes(" ");
    }
    const onNameChange = (e) => {
        let val = e.target.value
        if (isValidName(val)){
            const path = ReactEditor.findPath(editor, element);
            setNodes(
                editor,
                { name: val },
                {at: path}
            )
        } else {
            alert("White space is not allowed here")
        }
    }

    return (
        // Need contentEditable=false or Firefox has issues with certain input types.
        <div {...attributes} contentEditable={false}>
            <div style={{boxShadow: '0 0 0 3px #ddd', padding: '8px'}}>
                <div>

                <label>Field Name: </label>
                <input
                    style={{margin: '8px 0'}}
                    type="text"
                    value={element.name}
                    onChange={onNameChange}
                />
                </div>
                <div>

                <p>Model: </p>
                <input
                    style={{width: 'unset'}}
                    type="radio"
                    name="model"
                    value="subsession"
                />{' '}
                Subsession
                <br/>
                <input
                    style={{width: 'unset'}}
                    type="radio"
                    name="model"
                    value="group"
                />{' '}
                Group
                <br/>
                <input
                    style={{width: 'unset'}}
                    type="radio"
                    name="model"
                    value="player"
                />{' '}
                Player
                </div>
                <div>
                    <h4>
                        Field type
                    </h4>
                </div>
                <div>
                    <h4>

                    Field widget
                    </h4>
                </div>
                <div>
                    <h4>
                        Choices
                    </h4>
                </div>
                <div>
                    <h4>
                        Initial value
                    </h4>
                </div>
                <div>
                    <h4>
                        Can this field be blank?
                    </h4>
                </div>
                <div>
                    <h4>
                        Field documentation
                    </h4>
                </div>
                <div>
                    <h4>
                        Field label
                    </h4>
                </div>
            </div>
            {children}
        </div>
    );
};