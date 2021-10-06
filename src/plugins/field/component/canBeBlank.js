import React from "react";

export const CanBeBlank = ({onCanBeBlankChange}) => {
    const opts =  ["Yes", "No"].map(opt => {
        return <label>
            <input
                style={{width: 'unset'}}
                type="radio"
                name="canBeBlank"
                value={opt}
                onChange={onCanBeBlankChange}
            />{' '}
            {opt}
            {' '}
        </label>
    })
    return <div>
        <h4>
            Can this field be blank?
        </h4>
        {opts}
    </div>
}
