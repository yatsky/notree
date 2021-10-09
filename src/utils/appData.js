import {initialAppData} from "../model/initialAppData";
import {DataStore} from "aws-amplify";
import {AppData} from "../models";

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

export const loadAppDataCloud = async (setAppData) => {
    try {
        const docs = await DataStore.query(AppData)
        if (docs.length !== 0) {
            const nodes = JSON.parse(docs[docs.length - 1].content)
            setAppData(nodes)
        }
    } catch (error) {
        console.log('Error retrieving posts', error)
    }
}

export const saveAppDataCloud = async (appData) => {
    // setLoadingSave(true)
    let text = JSON.stringify(appData)
    try {
        console.log("trying to save")
        await DataStore.save(
            new AppData({
                content: text,
            })
        )
    } catch (error) {
        console.log('Error saving post', error)
    }
    // setLoadingSave(false)
}
