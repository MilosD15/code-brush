import { getCurrentColorTheme } from './colorTheme.js';
import './featuresAnimations.js';
import { isFileNamedProperly } from './namingFile.js';
import Editor from './Editor.js';
import { PROGRAMMING_LANGUAGES_DATA } from './variables.js';

// initializing the editor one page loaded
export let editor = new Editor("editor", getCurrentColorTheme());

// initializing new editor every time new name of the file is submitted
$("document").ready(() => {
    $("#name-file-frm").submit(() => {
        const result = isFileNamedProperly();
        if (result) {
            $('.open-compiler-btn').removeClass('stay-red');
            $('.open-compiler-btn').attr('data-tooltip', 'Run');
            erasePreviousEditor();
            editor = null;
            editor = new Editor("editor", getCurrentColorTheme());
            editor.setLanguage(result.fileType);
            editor.clear();
        }
    });
    $('.copy-code-btn').click(handleCopyingCode);
    $('.open-compiler-btn').click(() => {
        const currentEditorMode = $('.editor-container').attr('data-prog-lang');
        const currentLanguageObject = PROGRAMMING_LANGUAGES_DATA.find(progLang => progLang.editorModeName === currentEditorMode);
        const currentLanguageCompilerURL = currentLanguageObject.compilerURL;
        if (currentLanguageCompilerURL === '/') {
            $('.open-compiler-btn').attr('data-tooltip', 'Code cannot be compiled!');
            $('.open-compiler-btn').addClass('no-compiler');

            setTimeout(() => {
                $('.open-compiler-btn').removeClass('no-compiler');
                $('.open-compiler-btn').addClass('stay-red');
                $('.open-compiler-btn').blur();
            }, 2000);
        } else {
            handleCopyingCode();
            setTimeout(() => {
                window.open(currentLanguageCompilerURL, "_blank");
            }, 600);
        }
    });
});

function handleCopyingCode() {
    const editorText = editor.getEditorCode();
    navigator.clipboard.writeText(editorText);

    $('.copy-code-btn').addClass('clicked');
    $('.copy-code-btn').attr('data-tooltip', 'Copied! 🎉');

    setTimeout(() => {
        $('.copy-code-btn').removeClass('clicked');
        $('.copy-code-btn').blur();
        $('.copy-code-btn').attr('data-tooltip', 'Copy');
    }, 2000);
}

function erasePreviousEditor() {
    $('.CodeMirror').remove();
}