import { FIELD } from "../defaults";
import { getPlatePluginType } from "@udecode/plate-core";
import { fieldModel } from "../model/fieldModel";

export const getEmptyFieldNode = (editor) => {
  return {
    type: getPlatePluginType(editor, FIELD),
    ...fieldModel,
  };
};
