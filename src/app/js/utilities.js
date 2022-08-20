
// this is the function that converts size in pixels into
// new pixels value but, it converts it according to the
// root base font size (can be changed in browser settings)
// (this is for accessibility purposes)
export function makeResponsiveSize(sizeInPixels) {
    const root = document.querySelector(':root');
    const rootFontSize = window.getComputedStyle(root).fontSize;
    const fontSizeNumber = rootFontSize.substring(0, rootFontSize.indexOf('px'));
    const responsiveSize = sizeInPixels * (fontSizeNumber / 16);
    return responsiveSize;
}