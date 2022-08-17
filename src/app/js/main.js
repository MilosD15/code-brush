import { getCurrentColorTheme } from './colorTheme.js';
import './featuresAnimations.js';
import { isFileNamedProperly } from './namingFile.js';
import Editor from './Editor.js';

// initializing the editor one page loaded
export let editor = new Editor("editor", getCurrentColorTheme());

// initializing new editor every time new name of the file is submitted
$("document").ready(() => {
    $("#name-file-frm").submit(() => {
        const result = isFileNamedProperly();
        if (result) {
            erasePreviousEditor();
            editor = null;
            editor = new Editor("editor", getCurrentColorTheme());
            editor.setLanguage(result.fileType);
            editor.clear();
        }
    });
});

function erasePreviousEditor() {
    document.querySelector('.CodeMirror').remove();
}