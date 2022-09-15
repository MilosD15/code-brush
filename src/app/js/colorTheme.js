
export function setInitialColorTheme() {
    // determining color theme once the page is loaded
    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setColorTheme(isDark);

    // watching for changing preferred color theme
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => setColorTheme(e.matches));

    return $("body").attr('data-color-theme');
}

export function setColorTheme(isDark) {
    const currentColorTheme = isDark ? 'dark' : 'light';
    $("body").attr('data-color-theme', currentColorTheme);
    localStorage.setItem('CODE_BRUSH-currentColorTheme', currentColorTheme);

    return $("body").attr('data-color-theme');
}

export function getCurrentColorTheme() {
    return localStorage.getItem('CODE_BRUSH-currentColorTheme');
}