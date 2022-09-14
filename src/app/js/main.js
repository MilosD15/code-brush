import { getCurrentColorTheme, setInitialColorTheme, setColorTheme } from './colorTheme.js';
import './featuresAnimations.js';
import { isFileNamedProperly } from './namingFile.js';
import Editor from './Editor.js';
import { PROGRAMMING_LANGUAGES_DATA } from './variables.js';
import './infoEvents.js';

// initializing the editor one page loaded
let mainEditor = new Editor("editor", getCurrentColorTheme());

// initializing new editor every time new name of the file is submitted
$("document").ready(() => {
    // setting initial color theme
    if (getCurrentColorTheme == null) {
        mainEditor.setTheme(setInitialColorTheme());
    } else {
        const isDark = getCurrentColorTheme() === 'dark';
        setColorTheme(isDark);
    }

    // changing color themes
    $(".dark-mode-btn").click(() => {
        const isDark = $("body").attr('data-color-theme') === "dark";
        mainEditor.setTheme(setColorTheme(!isDark));
    });

    $("#name-file-frm").submit(() => {
        const result = isFileNamedProperly();
        if (result) {
            $('.open-compiler-btn').removeClass('stay-red');
            $('.open-compiler-btn').attr('data-tooltip', 'Run');
            erasePreviousEditor();
            mainEditor = null;
            mainEditor = new Editor("editor", getCurrentColorTheme());
            mainEditor.setLanguage(result.fileType);
            mainEditor.clear();
        }
    });
    $('.copy-code-btn').click(handleCopyingEditorCode);
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
            handleCopyingEditorCode();
            setTimeout(() => {
                window.open(currentLanguageCompilerURL, "_blank");
            }, 600);
        }
    });
});

function handleCopyingEditorCode() {
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