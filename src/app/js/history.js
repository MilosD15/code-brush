import { getCurrentColorTheme, setColorTheme, setInitialColorTheme } from './colorTheme.js';
import Editor from './Editor.js';
import { PROGRAMMING_LANGUAGES_DATA } from './variables.js';
import { getSavedFiles } from './localStorageManip.js';

const savedFilesContainer = document.querySelector('[data-saved-files-container]');
const fileContainerTemplate = document.getElementById('file-container-template');

$("document").ready(() => {
    // setting initial color theme
    if (getCurrentColorTheme() == null) {
        setInitialColorTheme();
    } else {
        const isDark = getCurrentColorTheme() === 'dark';
        setColorTheme(isDark);
    }
    // initializing editors
    checkWhetherFilesCountIs0();
    loadFiles();


    const editors = document.querySelectorAll('.file-container[data-file-name] > textarea');
    editors.forEach(editor => {
        const newEditor = new Editor(editor, getCurrentColorTheme(), true);
    });
});

function loadFiles() {
    const files = getSavedFiles() === '[]' ? [] : getSavedFiles();

    if (files.length === 0) return;

    files.forEach(file => {
        renderFile(file);
    });
}

function renderFile({ name, langName, text}) {
    const fileContainer = fileContainerTemplate.content.cloneNode(true);

    
}

// if there is no single file saved yet, display message that history is empty
function checkWhetherFilesCountIs0() {
    const emptyHistoryElement = document.querySelector('[data-empty-files-box]');
    
    const files = getSavedFiles() === '[]' ? [] : getSavedFiles();
    
    if (files.length === 0) {
        emptyHistoryElement.dataset.active = true;
        savedFilesContainer.dataset.active = false;
    } else {
        emptyHistoryElement.dataset.active = false;
        savedFilesContainer.dataset.active = true;
    }
}