import React from "react";
import {WidgetOptions} from "../model/fieldModel";

export const Widget = ({onWidgetChange}) => {
    const opts =  WidgetOptions.map(opt => {
        return <label>
            <input
                style={{width: 'unset'}}
                type="radio"
                name="widget"
                value={opt}
                onChange={onWidgetChange}
            />{' '}
            {opt}
            {' '}
        </label>
    })
    return <div>
        <h4>
            Widget
        </h4>
        {opts}
    </div>
}
