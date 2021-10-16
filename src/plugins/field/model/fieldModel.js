export const fieldModel = {
  name: "python_style_field_name",
  model: "player",
  // this has to be named fieldType, not `type` as it's already been used by Plate
  fieldType: "",
  widget: "",
  choices: "",
  initialValue: "",
  canBeBlank: false,
  doc: "",
  label: "What is your age?",
  children: [{ text: "Field" }],
};

export const ModelOptions = ["player", "group", "subsession"];
export const FieldTypeOptions = [
  "int",
  "float",
  "currency",
  "string",
  "boolean",
];
export const WidgetOptions = [
  "none",
  "radio-select",
  "radio-select-horizontal",
  "dice",
  "fortune-wheel",
];
