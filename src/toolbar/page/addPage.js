import React from 'react'

export const addPage = (appVal, setAppVal, initialValue) => {
    let idx = (1 + Object.keys(appVal).length).toString()
    setAppVal(
        {
            ...appVal,
            [idx]: initialValue,
        }
    )


}