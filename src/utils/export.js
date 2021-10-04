import {html} from "js-beautify";
import {serializeHTMLFromNodes} from "@udecode/plate-html-serializer";
import {createEditorPlugins} from "@udecode/plate";
import FileSaver from 'file-saver'

export const handleExport = async (plugins, editor) => {
    // setLoadingExport(true)
    // Why plugins and parser: https://github.com/prettier/prettier/pull/6268#issue-294147726
    // let text = prettier.format(serializeHTMLFromNodes({ plugins: plugins, nodes: editor.children }), {
    //   parser: 'html',
    //   plugins: [parserHTML],
    // })
    let text = (
        html(
            serializeHTMLFromNodes(createEditorPlugins(plugins), {
                plugins: plugins,
                nodes: editor.children,
                preserveClassNames: ["slate-", "notree-"],
            })
        )
    )
    let regex = /{{/gm;
    let subst = `{%`;
    let result = text.replace(regex, subst);
    regex = /}}/gm;
    subst = `%}`;
    result = result.replace(regex, subst);

    let blob = new Blob([result], { type: 'text/html;charset=utf-8' })
    await FileSaver.saveAs(blob, 'notree-download.html')
    // setLoadingExport(false)
}
