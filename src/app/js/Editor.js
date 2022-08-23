
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
        let initialMessage = '\n//\t\tKEEP IN MIND:\n\n';
        initialMessage += '// Every time you make a new file, it will be saved and\n';
        initialMessage += '// you can see all of your previous files by clicking on\n';
        initialMessage += '// History icon below the header in the right corner.\n';
        initialMessage += '\n// Every time you make a change in any of your files,\n';
        initialMessage += '// it will be saved automatically.\n';
        initialMessage += '\n// The editor is optimized for mobile phones and tablets\n';
        initialMessage += '// as well, but it is mainly made for computers and laptops.\n';
        initialMessage += '// Some of the editor features won\'t work on mobile devices.\n';
        initialMessage += '\n// Files with .xml and .json extension cannot be compiled.\n';
        initialMessage += '\n// Every time you want to see this info again, just click';
        initialMessage += '\n// on the Info button below the header in the left corner.';
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

    getEditorCode() {
        return this.#editor.getValue();
    }
}

// import { basicSetup, EditorView } from "codemirror";
// import { javascript } from "@codemirror/lang-javascript";


// export default class Editor {
//     #editor

//     constructor(id, currentColorTheme) {
//         const editorElement = document.querySelector(`textarea#${id}`);
//         this.#editor = Editor.#initializeEditor(editorElement);
//         // this.#setInitialValue();
//         // this.setTheme(currentColorTheme);
//     }

//     static #initializeEditor(editorElement) {
//         // return CodeMirror.fromTextArea(editorElement, {
//         //     lineNumbers: true,
//         //     mode: 'javascript',
//         //     theme: 'base16-dark',
//         //     autoCloseBrackets: true,
//         //     autoCloseTags: true,
//         //     styleActiveLine: true,
//         //     // lineWrapping: true,
//         //     scrollbarStyle: 'simple',
//         //     lint: true,
//         //     selfContain: true,
//         //     highlightLines: true,
//         //     // indentWithTabs: true,
//         //     extraKeys: { "Alt": "autocomplete" },
//         //     foldGutter: true,
//         //     gutters: ['CodeMirror-lint-markers', "CodeMirror-linenumbers", "CodeMirror-foldgutter"]
//         // });

//         return new EditorView({
//             doc: Editor.#setInitialValue(),
//             extensions: [basicSetup, javascript()],
//             parent: editorElement
//         });
//     }

//     static #setInitialValue() {
//         this.clear();
//         let initialMessage = '\n//\t\tKEEP IN MIND:\n\n';
//         initialMessage += '// Every time you make a new file, it will be saved and\n';
//         initialMessage += '// you can see all of your previous files by clicking on\n';
//         initialMessage += '// History icon below the header in the right corner.\n';
//         initialMessage += '\n// Every time you make a change in any of your files,\n';
//         initialMessage += '// it will be saved automatically.\n';
//         initialMessage += '\n// The editor is optimized for mobile phones and tablets\n';
//         initialMessage += '// as well, but it is mainly made for computers and laptops.\n';
//         initialMessage += '// Some of the editor features won\'t work on mobile devices.\n';
//         initialMessage += '\n// Files with .xml and .json extension cannot be compiled.\n';
//         initialMessage += '\n// Every time you want to see this info again, just click';
//         initialMessage += '\n// on the Info button below the header in the left corner.';
//         this.#editor.setValue(initialMessage);
//     }

//     // clear() {
//     //     this.#editor.setValue('');
//     //     this.#editor.clearHistory();
//     //     this.#editor.focus();
//     // }

//     // setTheme(theme = 'dark') {
//     //     const themeString = theme === 'dark' ? 'base16-dark' : 'base16-light';
//     //     this.#editor.setOption('theme', themeString);
//     // }

//     // setLanguage(language = 'text/javascript') {
//     //     this.#editor.setOption('mode', language);
//     // }

//     // getEditorCode() {
//     //     return this.#editor.getValue();
//     // }
// }