
import { APP_PREFIX } from './variables.js';

// local storage manipulation

export function saveFileInLocalStorage(newFile) {
    let files = getSavedFiles() === '[]' ? [] : getSavedFiles();
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

function deactivatePreviousActiveElement(files) {
    return files.map(file => {
        file.isActive = false;
        return file;
    });
}

export function findFile(filename) {
    const files = getSavedFiles() === '[]' ? [] : getSavedFiles();
    return files.find(file => file.name === filename);
}

export function saveFiles(files) {
    localStorage.setItem(`${APP_PREFIX}-files`, JSON.stringify(files));
}

export function getSavedFiles() {
    const files = localStorage.getItem(`${APP_PREFIX}-files`);
    if (files == null) {
        saveFiles([]);
        return [];
    }

    return JSON.parse(files);
}