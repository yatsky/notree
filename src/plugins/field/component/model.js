import React from "react";
import {ModelOptions} from "../model/fieldModel";

export const Model = ({onModelChange}) => {
    const opts = ModelOptions.map(opt => {
        return <label>
            <input
                style={{width: 'unset'}}
                type="radio"
                name="model"
                value={opt}
                onChange={onModelChange}
            />{' '}
            {opt}
        </label>
    })
    return <div>
        <h4>Form Model</h4>
        {opts}
    </div>
}

