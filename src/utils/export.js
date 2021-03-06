import { html } from "js-beautify";
import { serializeHTMLFromNodes } from "@udecode/plate-html-serializer";
import { createEditorPlugins } from "@udecode/plate";
import FileSaver from "file-saver";
import { FIELD } from "../plugins/field/defaults";

export const handleExport = async (editor, plugins, pagesData) => {
  // setLoadingExport(true)
  // Why plugins and parser: https://github.com/prettier/prettier/pull/6268#issue-294147726
  // let text = prettier.format(serializeHTMLFromNodes({ plugins: plugins, nodes: editor.children }), {
  //   parser: 'html',
  //   plugins: [parserHTML],
  // })
  // https://stackoverflow.com/questions/34398279/map-and-filter-an-array-at-the-same-time
  let pageHTMLs = pagesData.reduce((reduced, pageData) => {
    if (!pageData.deleted) {
      reduced.push({
        pageName: pageData.pageName,
        html: html(
          serializeHTMLFromNodes(createEditorPlugins(plugins), {
            plugins: plugins,
            nodes: pageData.nodes,
            preserveClassNames: ["slate-", "notree-"],
          })
        ),
      });
    }
    return reduced;
  }, []);
  for (const el of pageHTMLs) {
    let regex = /{{/gm;
    let subst = `{%`;
    let result = el.html.replace(regex, subst);
    regex = /}}/gm;
    subst = `%}`;
    result = result.replace(regex, subst);

    let blob = new Blob([result], { type: "text/html;charset=utf-8" });
    await FileSaver.saveAs(blob, `${el.pageName}.html`);
    // setLoadingExport(false)
  }

  // write to models.py
  let pagesFields = pagesData.reduce((reduced, pageData) => {
    if (!pageData.deleted) {
      reduced.push({
        pageName: pageData.pageName,
        fields: pageData.nodes
          .filter((node) => node.type === FIELD)
          .map((node) => {
            let result = "";
            const { name, fieldType, widget, label, choices, doc } = node;
            let regex = /\n/gm;
            let subst = `,`;

            let choicesStub = "";
            if (choices.split(regex).length > 1) {
              let validChoices = choices
                .split(regex)
                .map((el) => `"${el}"`)
                .join();
              choicesStub = `choices=(${validChoices}),`;
            }

            const fieldTypes = {
              int: "Integer",
              float: "Float",
              string: "String",
            };
            const fieldWidgets = {
              "radio-select": "RadioSelect",
              "radio-select-horizontal": "RadioSelectHorizontal",
              none: "None",
            };
            let validFieldType = fieldTypes[fieldType];
            let widgetStub = "";
            if (widget && widget !== "none") {
              let validWidget = fieldWidgets[widget];
              widgetStub = `widget=widgets.${validWidget}`;
            }
            result = `${name} = models.${validFieldType}Field(label="${label}", doc="${doc}", ${choicesStub} ${widgetStub})`;
            return result;
          }),
      });
    }
    return reduced;
  }, []);
  let modelsData = "";
  for (const pageFields of pagesFields) {
    for (const field of pageFields.fields) {
      modelsData = modelsData + field + "\n";
    }
  }
  let models = new Blob([modelsData], { type: "text;charset=utf-8" });
  await FileSaver.saveAs(models, "models.py");
  console.log(modelsData);
};
