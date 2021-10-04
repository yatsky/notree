import React from 'react';

export const Doc = ({onDocChange}) => {
    return <div>
        <h4>Field documentation: </h4>
        <textarea
            style={{margin: '8px 0'}}
            onChange={onDocChange}
        />
    </div>
}
