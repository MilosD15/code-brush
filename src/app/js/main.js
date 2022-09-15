import { getCurrentColorTheme, setInitialColorTheme, setColorTheme } from './colorTheme.js';
import './featuresAnimations.js';
import { isFileNamedProperly } from './namingFile.js';
import Editor from './Editor.js';
import { PROGRAMMING_LANGUAGES_DATA } from './variables.js';
import './infoEvents.js';
import { findFile, saveFileInLocalStorage } from './localStorageManip.js';


$("document").ready(() => {
    $("#name-file-frm input").focus();

    // initializing the editor once page is loaded
    const editorElement = document.querySelector('textarea#mainEditor');
    let mainEditor = new Editor(editorElement, getCurrentColorTheme(), true);
    
    // setting initial color theme
    if (getCurrentColorTheme() == null) {
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

    // initializing new editor every time new name of the file is submitted
    $("#name-file-frm").submit(() => {
        const result = isFileNamedProperly();
        if (result) {
            // resetting editor buttons
            $('.open-compiler-btn').removeClass('stay-red');
            $('.open-compiler-btn').attr('data-tooltip', 'Run');

            erasePreviousEditor();

            // initializing new editor
            mainEditor = null;
            mainEditor = new Editor(editorElement, getCurrentColorTheme());
            mainEditor.setLanguage(result.fileType);
            mainEditor.clear();
            const currentFilename = $("#name-file-frm .file-name").attr('data-file-name');
            const existingFileObject = findFile(currentFilename);
            if (existingFileObject) {
                mainEditor.setValue(existingFileObject.text);
            }

            // save file every time user enters correct file name
            saveFileInLocalStorage({
                name: $("#name-file-frm .file-name").attr('data-file-name'),
                langName: mainEditor.getEditorMode(),
                text: mainEditor.getEditorCode()
            });
        }

        // when a file is unnamed or user changing the name of his file, 
        // user cannot edit code in editor, once file is successfully named correctly,
        // user again has an option to edit the his file
        if ($("#name-file-frm button").attr('data-role') === 'save-btn') {
            mainEditor.readOnly = true;

            // save file before user change the name of the file(create new file or load existing one)
            saveFileInLocalStorage({
                name: $("#name-file-frm .file-name").attr('data-file-name'),
                langName: mainEditor.getEditorMode(),
                text: mainEditor.getEditorCode()
            });
        } else {
            mainEditor.readOnly = false;
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
    // save file before page is closed, or user opened another website or page
    window.addEventListener('beforeunload', () => {
        if (mainEditor.getEditorCode() === mainEditor.getInitialValue()) return;

        saveFileInLocalStorage({
            name: $("#name-file-frm .file-name").attr('data-file-name'),
            langName: mainEditor.getEditorMode(),
            text: mainEditor.getEditorCode()
        });
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