import React from 'react';

export const Name = ({name, onNameChange}) => {
    return <div>
        <h4>Field Name: </h4>
        <input
            style={{margin: '8px 0'}}
            type="text"
            value={name}
            onChange={onNameChange}
        />
    </div>
}
