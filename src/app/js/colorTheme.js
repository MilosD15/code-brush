
const darkThemeBtn = document.querySelector('.dark-mode-btn');

// determining color theme once the page is loaded
window.onload = () => {
    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setColorTheme(isDark);
}

// watching for changing preferred color theme
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => setColorTheme(e.matches));

// toggling dark/light theme
darkThemeBtn.addEventListener('click', () => {
    const isDark = document.body.dataset.colorTheme === 'dark';
    setColorTheme(!isDark);
});

function setColorTheme(isDark) {
    const currentColorTheme = isDark ? 'dark' : 'light';
    document.body.dataset.colorTheme = currentColorTheme;
}