import React from "react";
import {FieldTypeOptions} from "../model/fieldModel";

export const FieldType = ({onFieldTypeChange}) => {
    const opts =  FieldTypeOptions.map(opt => {
        return <label>
            <input
                style={{width: 'unset'}}
                type="radio"
                name="fieldType"
                value={opt}
                onChange={onFieldTypeChange}
            />{' '}
            {opt}
        </label>
    })
    return <div>
        <h4>
            Field Type
        </h4>
        {opts}
    </div>
}
