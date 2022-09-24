
import { APP_PREFIX } from './variables.js';

// local storage manipulation

export function saveFileInLocalStorage(newFile) {
    if (newFile.name == undefined) return;

    let files = getSavedFiles();
    const existingFileObject = findFile(newFile.name);

    files = deactivatePreviousActiveElement(files);

    if (existingFileObject === undefined) {
        files.push(newFile);
    } else {
        files = files.map(file => {
            if (file.name === newFile.name) {
                file.text = newFile.text;
                file.isActive = true;
            }
            return file;
        });
    }

    saveFiles(files);
}

export function setActiveFile(filename) {
    let files = getSavedFiles();

    files = deactivatePreviousActiveElement(files);
    
    const targetedFile = files.find(file => file.name === filename);
    if (targetedFile != undefined) targetedFile.isActive = true;

    saveFiles(files);
}

export function deleteFile(filename) {
    const files = getSavedFiles();
    const newFiles = files.filter(file => file.name !== filename);

    const activeFileExist = newFiles.some(file => file.isActive);
    if (!activeFileExist && newFiles.length !== 0) newFiles[0].isActive = true;

    saveFiles(newFiles);
}

function deactivatePreviousActiveElement(files) {
    return files.map(file => {
        file.isActive = false;
        return file;
    });
}

export function findFile(filename) {
    const files = getSavedFiles();
    return files.find(file => file.name === filename);
}

export function saveFiles(files) {
    localStorage.setItem(`${APP_PREFIX}-files`, JSON.stringify(files));
}

export function getSavedFiles() {
    const files = localStorage.getItem(`${APP_PREFIX}-files`);
    if (files == null || files === '[]') {
        saveFiles([]);
        return [];
    }

    return JSON.parse(files);
}