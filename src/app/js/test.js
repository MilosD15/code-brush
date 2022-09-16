import { getCurrentColorTheme, setColorTheme, setInitialColorTheme } from './colorTheme.js';
import Editor from './Editor.js';
import { PROGRAMMING_LANGUAGES_DATA } from './variables.js';
import { getSavedFiles, deleteFile, setActiveFile } from './localStorageManip.js';

$("document").ready(() => {
    // setting initial color theme
    if (getCurrentColorTheme() == null) {
        setInitialColorTheme();
    } else {
        const isDark = getCurrentColorTheme() === 'dark';
        setColorTheme(isDark);
    }

    const editorElement = document.querySelector('[data-file-container]>textarea');
    const editor = new Editor(editorElement, getCurrentColorTheme(), true);
});