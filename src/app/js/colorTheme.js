import { editor } from './main.js';

$("document").ready(() => {
    // determining color theme once the page is loaded
    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setColorTheme(isDark);

    // watching for changing preferred color theme
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => setColorTheme(e.matches));

    $(".dark-mode-btn").click(() => {
        const isDark = $("body").attr('data-color-theme') === "dark";
        setColorTheme(!isDark);
    });
});

function setColorTheme(isDark) {
    const currentColorTheme = isDark ? 'dark' : 'light';
    $("body").attr('data-color-theme', currentColorTheme);
    editor.setTheme(currentColorTheme);
}