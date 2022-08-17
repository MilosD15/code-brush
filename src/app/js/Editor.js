
export default class Editor {
    #editor

    constructor(id, currentColorTheme) {
        const editorElement = document.querySelector(`textarea#${id}`);
        this.#editor = Editor.#initializeEditor(editorElement);
        this.#setInitialValue();
        this.setTheme(currentColorTheme);
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
        let initialMessage = '// Every time you make a new file, it will be saved and\n';
        initialMessage += '// you can see all of your previous files by clicking on\n';
        initialMessage += '// History icon in the top right corner of the editor.\n';
        initialMessage += '\n// Every time you make a change on any of your files,\n';
        initialMessage += '// it will be saved automatically.';
        this.#editor.setValue(initialMessage);
    }

    clear() {
        this.#editor.setValue('');
        this.#editor.clearHistory();
        this.#editor.focus();
    }

    setTheme(theme = 'dark') {
        const themeString = theme === 'dark' ? 'base16-dark' : 'base16-light';
        this.#editor.setOption('theme', themeString);
    }

    setLanguage(language = 'text/javascript') {
        this.#editor.setOption('mode', language);
    }
}