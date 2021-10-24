import {html} from "js-beautify";
import {serializeHTMLFromNodes} from "@udecode/plate-html-serializer";
import {createEditorPlugins} from "@udecode/plate";
import FileSaver from "file-saver";

export const handleExport = async (plugins, pagesData) => {
    // setLoadingExport(true)
    // Why plugins and parser: https://github.com/prettier/prettier/pull/6268#issue-294147726
    // let text = prettier.format(serializeHTMLFromNodes({ plugins: plugins, nodes: editor.children }), {
    //   parser: 'html',
    //   plugins: [parserHTML],
    // })
    // https://stackoverflow.com/questions/34398279/map-and-filter-an-array-at-the-same-time
    let pageHTMLs = pagesData.reduce((reduced, pageData) => {
            if (!pageData.deleted) {
                reduced.push(
                    {
                        pageName: pageData.pageName,
                        html: html(
                            serializeHTMLFromNodes(createEditorPlugins(plugins), {
                                plugins: plugins,
                                nodes: pageData.nodes,
                                preserveClassNames: ["slate-", "notree-"],
                            })
                        )
                    }
                )
            }
            return reduced
        }, []
    );
    for (const el of pageHTMLs) {
        let regex = /{{/gm;
        let subst = `{%`;
        let result = el.html.replace(regex, subst);
        regex = /}}/gm;
        subst = `%}`;
        result = result.replace(regex, subst);

        let blob = new Blob([result], {type: "text/html;charset=utf-8"});
        await FileSaver.saveAs(blob, `${el.pageName}.html`);
        // setLoadingExport(false)
    }
};
