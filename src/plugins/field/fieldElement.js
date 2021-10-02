import React, {useState} from 'react';

export const FieldElement = ({
                                 attributes,
                                 children,
                                 // https://docs.slatejs.org/concepts/09-rendering
                                 element
                             }) => {

    return (
        // Need contentEditable=false or Firefox has issues with certain input types.
        <div {...attributes} contentEditable={false}>
            <div style={{boxShadow: '0 0 0 3px #ddd', padding: '8px'}}>
                <h4>Name:</h4>
                <input
                    style={{margin: '8px 0'}}
                    type="text"
                    value={element.fieldName}
                    onChange={(e) => {
                    }}
                />
                <h4>Left or right handed:</h4>
                <input
                    style={{width: 'unset'}}
                    type="radio"
                    name="handedness"
                    value="left"
                />{' '}
                Left
                <br/>
                <input
                    style={{width: 'unset'}}
                    type="radio"
                    name="handedness"
                    value="right"
                />{' '}
                Right
            </div>
            {children}
        </div>
    );
};