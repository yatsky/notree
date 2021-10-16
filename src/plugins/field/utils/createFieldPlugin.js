import * as React from "react";
import { getPlatePluginTypes, getRenderElement } from "@udecode/plate";
import { FIELD } from "../defaults";

export const createFieldPlugin = (options) => ({
  deserialize: () => {
    return {
      element: [
        {
          type: FIELD,
          deserialize: (el) => {
            return { otree: "test" };
          },
        },
      ],
    };
  },

  renderElement: getRenderElement(FIELD),
  pluginKeys: FIELD,
  // inlineTypes: getPlatePluginTypes(FIELD),
  voidTypes: getPlatePluginTypes(FIELD),
  // serialize needs to be an object, not method
  serialize: {
    element: (props) => {
      const { label, name, model } = props.element;
      return (
        <div className={"notree-" + props.element.model}>
          <p>{label}</p>
          {/* if I use % here it will cause the html output to be escaped */}
          {`{{ formfield ${model}.${name} }}`}
        </div>
      );
    },
  },
  // withOverrides: withInlineVoid(options),
});
