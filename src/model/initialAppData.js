import {initialValueBasicElements} from "../plugins/pluginsBasic";

export const initialAppData = {
    otherInfo: "information",
    pagesData: [
        {
            pageId: "initial1",
            pageName: "Introduction",
            selected: true,
            nameReadOnly: true,
            deleted: false,
            nodes: initialValueBasicElements,
        },
        {
            pageId: "initial2",
            pageName: "Survey",
            selected: false,
            nameReadOnly: true,
            deleted: false,
            nodes: initialValueBasicElements,
        },
    ]
}
