import {initialAppData} from "../model/initialAppData";

export const loadAppDataLocal = (key) => {
    let content = localStorage.getItem(key)
    if (content) {
        return JSON.parse(content);
    } else {
        return initialAppData
    }
}

export const saveAppDataLocal = async (appData) => {
    // setLoadingSave(true)
    localStorage.setItem('content', JSON.stringify(appData));
    // setLoadingSave(false)
}
