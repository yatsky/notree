import {html} from "js-beautify";
import {serializeHTMLFromNodes} from "@udecode/plate-html-serializer";
import {createEditorPlugins} from "@udecode/plate";
import FileSaver from 'file-saver'

export const handleExport = async (plugins, pagesData) => {
    // setLoadingExport(true)
    // Why plugins and parser: https://github.com/prettier/prettier/pull/6268#issue-294147726
    // let text = prettier.format(serializeHTMLFromNodes({ plugins: plugins, nodes: editor.children }), {
    //   parser: 'html',
    //   plugins: [parserHTML],
    // })
    let text = pagesData.map(pageData =>
        html(
            serializeHTMLFromNodes(createEditorPlugins(plugins), {
                plugins: plugins,
                nodes: pageData.nodes,
                preserveClassNames: ["slate-", "notree-"],
            })
        )
    )
    for (const el of text) {
        let regex = /{{/gm;
        let subst = `{%`;
        let result = el.replace(regex, subst);
        regex = /}}/gm;
        subst = `%}`;
        result = result.replace(regex, subst);

        let blob = new Blob([result], { type: 'text/html;charset=utf-8' })
        await FileSaver.saveAs(blob, 'notree-download.html')
        // setLoadingExport(false)
    }
}
