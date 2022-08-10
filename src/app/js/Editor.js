
export default class Editor {
    #editor

    constructor(id) {
        const editorElement = document.querySelector(`textarea#${id}`);
        this.#editor = Editor.#initializeEditor(editorElement);
        this.#setInitialValue();
    }

    static #initializeEditor(editorElement) {
        return CodeMirror.fromTextArea(editorElement, {
            lineNumbers: true,
            mode: 'javascript',
            theme: 'base16-dark',
            autoCloseBrackets: true,
            autoCloseTags: true,
            styleActiveLine: true,
            // lineWrapping: true,
            scrollbarStyle: 'simple',
            lint: true,
            selfContain: true,
            highlightLines: true,
            // indentWithTabs: true,
            extraKeys: { "Alt": "autocomplete" },
            foldGutter: true,
            gutters: ['CodeMirror-lint-markers', "CodeMirror-linenumbers", "CodeMirror-foldgutter"]
        });
    }

    #setInitialValue() {
        this.clear();
        let initialMessage = '\n\nEvery time you make a new file, it will be saved and you can see all of your previous files by clicking on History icon in the top right corner of the editor.\n\n';
        initialMessage += '\n\nEvery time you make a change on any of your files, it will be saved automatically.\n\n';
        this.#editor.setValue(initialMessage);
    }

    clear() {
        this.#editor.setValue('');
        this.#editor.clearHistory();
    }


}