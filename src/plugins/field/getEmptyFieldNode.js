import {FIELD} from "./defaults";
import {getPlatePluginType} from "@udecode/plate-core";

export const emptyFieldTemplate = {
    fieldName: "python_style_field_name",
    model: "player",
    fieldType: "",
    widget: "",
    choices: "",
    initialValue: "",
    canFieldBeBlank: "",
    doc: "",
    label: "",
    children: [
        {text: "Field"}
    ]
}
export const getEmptyFieldNode = (editor) => {
    return {
        type: getPlatePluginType(editor, FIELD),
        ...emptyFieldTemplate
    }
}