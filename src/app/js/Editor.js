
// IMPORTING CODEMIRROR
// basic setup
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/lib/codemirror.js';
// languages
import 'codemirror/mode/xml/xml.js';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/jsx/jsx.js';
import 'codemirror/mode/python/python.js';
import 'codemirror/mode/go/go.js';
import 'codemirror/mode/ruby/ruby.js';
// addons
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/edit/closetag.js';
import 'codemirror/addon/selection/active-line.js';
import 'codemirror/addon/wrap/hardwrap.js';
// hints
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/hint/html-hint.js';
import 'codemirror/addon/hint/css-hint.js';
import 'codemirror/addon/hint/javascript-hint.js';
import 'codemirror/addon/hint/xml-hint.js';
import 'codemirror/addon/hint/anyword-hint.js';
import 'codemirror/addon/hint/show-hint.css';
// search bar
import 'codemirror/addon/search/search.js';
import 'codemirror/addon/search/searchcursor.js';
import 'codemirror/addon/search/jump-to-line.js';
import 'codemirror/addon/dialog/dialog.css';
import 'codemirror/addon/dialog/dialog.js';
// custom scrollbars
import 'codemirror/addon/scroll/simplescrollbars.css';
import 'codemirror/addon/scroll/simplescrollbars.js';
// lint
import 'codemirror/addon/lint/lint.js';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/addon/lint/css-lint.js';
import 'codemirror/addon/lint/javascript-lint.js';
import 'codemirror/addon/lint/json-lint.js';
import 'https://unpkg.com/jshint@2.13.2/dist/jshint.js';
import 'https://unpkg.com/jsonlint@1.6.3/web/jsonlint.js';
import 'https://unpkg.com/csslint@1.0.5/dist/csslint.js';
// folding
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/fold/comment-fold.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/indent-fold.js';
import 'codemirror/addon/fold/markdown-fold.js';
import 'codemirror/addon/fold/xml-fold.js';
import 'codemirror/addon/fold/foldgutter.css';

// DEFINING EDITOR CLASS
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
            mode: 'text/javascript',
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
        let initialMessage = '//\t\tKEEP IN MIND:\n\n';
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
        initialMessage += '\n// on the Info button below the header in the left corner.\n';
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