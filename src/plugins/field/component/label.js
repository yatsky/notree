import React from 'react';

export const Label = ({onLabelChange}) => {
    return <div>
        <h4>Field Label: </h4>
        <textarea
            style={{margin: '8px 0'}}
            onChange={onLabelChange}
        />
    </div>
}
