import { getCurrentColorTheme, setColorTheme } from './colorTheme.js';
import Editor from './Editor.js';
import { PROGRAMMING_LANGUAGES_DATA } from './variables.js';

$("document").ready(() => {
    // setting initial color theme
    const isDark = getCurrentColorTheme() === 'dark';
    setColorTheme(isDark);
    // initializing editors
    // const editor = new Editor('code-editor-for-main.js', getCurrentColorTheme());
});

