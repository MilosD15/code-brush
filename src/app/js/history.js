import { getCurrentColorTheme, setColorTheme, setInitialColorTheme } from './colorTheme.js';
import Editor from './Editor.js';
import { PROGRAMMING_LANGUAGES_DATA } from './variables.js';
import { getSavedFiles, deleteFile, setActiveFile } from './localStorageManip.js';

const savedFilesContainer = document.querySelector('[data-saved-files-container]');
const fileContainerTemplate = document.getElementById('file-container-template');

let editors =  [];

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
    // focusing the very first editor if history is not empty
    if (editors.length !== 0) editors[0].focus();

    savedFilesContainer.addEventListener('click', e => {
        if (e.target.matches('[data-delete-btn]')) {
            const fileContainer = e.target.closest('[data-file-container]');
            handleDeleteFile(fileContainer);
        }
        if (e.target.matches('[data-edit-btn]')) {
            const fileContainer = e.target.closest('[data-file-container]');
            handleEditFile(fileContainer.dataset.fileName);
        }
    });
});

function handleDeleteFile(fileContainerElement) {
    deleteFile(fileContainerElement.dataset.fileName);

    fileContainerElement.style.opacity = 0;
    setTimeout(() => {
        fileContainerElement.remove();
    }, 500);

    checkWhetherFilesCountIs0(500);
}

function handleEditFile(filename) {
    setActiveFile(filename);

    location.href = '../index.html';
}

function loadFiles() {
    const files = getSavedFiles();

    if (files.length === 0) return;

    files.forEach(file => {
        renderFile(file);
    });
}

function renderFile({ name, editorMode, text}) {
    const fileContainer = fileContainerTemplate.content.cloneNode(true);
    fileContainer.querySelector('[data-file-container]').dataset.fileName = name;

    const editorElement = fileContainer.querySelector('textarea');

    const filenameElement = fileContainer.querySelector('[data-file-name-field]');
    filenameElement.textContent = name;

    savedFilesContainer.appendChild(fileContainer);

    const newEditor = new Editor(editorElement, getCurrentColorTheme(), true);
    const progLangObject = PROGRAMMING_LANGUAGES_DATA.find(progLang => progLang.editorModeName === editorMode);
    newEditor.setLanguage(progLangObject.editorModeName);
    newEditor.setValue(text);
    editors.push(newEditor);
}

// if there is no single file saved yet, display message that history is empty
function checkWhetherFilesCountIs0(delay = 0) {
    const emptyHistoryElement = document.querySelector('[data-empty-files-box]');
    
    const files = getSavedFiles() === '[]' ? [] : getSavedFiles();
    
    if (files.length === 0) {
        setTimeout(() => {
            emptyHistoryElement.dataset.active = true;
            savedFilesContainer.dataset.active = false;
        }, delay);
    } else {
        emptyHistoryElement.dataset.active = false;
        savedFilesContainer.dataset.active = true;
    }
}