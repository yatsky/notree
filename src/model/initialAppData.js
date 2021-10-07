import {initialValueBasicElements} from "../plugins/pluginsBasic";
import {v4 as uuidv4} from 'uuid';

export const initialAppData = {
    "otherInfo": "information",
    "pagesData": [
        {
            "pageId": uuidv4(),
            "pageName": "Introduction",
            "selected": true,
            "nameReadOnly": true,
            "deleted": false,
            "nodes": initialValueBasicElements,
        },
        {
            "pageId": uuidv4(),
            "pageName": "Survey",
            "selected": false,
            "nameReadOnly": true,
            "deleted": false,
            "nodes": initialValueBasicElements,
        }

    ]
}
