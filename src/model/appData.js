import {initialValueBasicElements} from "../plugins/pluginsBasic";
import { v4 as uuidv4 } from 'uuid';

export const appData = {
    "otherInfo": "information",
    "pagesData": [
        {
            "pageId": uuidv4(),
            "pageName": "Introduction",
            "nodes": initialValueBasicElements,
        },
        {
            "pageId": uuidv4(),
            "pageName": "Survey",
            "nodes": initialValueBasicElements,
        }

    ]
}
