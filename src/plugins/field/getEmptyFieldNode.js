import {FIELD} from "./defaults";
import {getPlatePluginType} from "@udecode/plate-core";

export const getEmptyFieldNode = (editor) => {
    return {
        type: getPlatePluginType(editor, FIELD),
        fieldName: "python_style_field_name",
        children: [
            {text: "Field"}
        ]
    }
}