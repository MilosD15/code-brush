
window.onload = () => {
    determinePreferredColorScheme();
}

function determinePreferredColorScheme() {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = isDark ? 'dark' : 'light';
    document.body.dataset.colorTheme = theme;
}