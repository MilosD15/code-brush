
// DOM elements
const loader = document.querySelector("[data-loader]");

// variables
const transitionBetweenStatesDuration = 500;
const numberOfLoadingAnimationStates = 3;
const additionalLoadingAnimationDelay = 300;
const loaderFadingOutDuration = 800;
const loadingAnimationDuration = transitionBetweenStatesDuration * numberOfLoadingAnimationStates + additionalLoadingAnimationDelay;

startLoaderAnimation();

const loadingStartTime = new Date().getTime();
window.onload = () => {
    const loadingEndTime = new Date().getTime();

    const loadingTime = loadingEndTime - loadingStartTime;

    removeLoader(loadingTime);
};

function removeLoader(loadingTime) {
    if (loadingTime >= loadingAnimationDuration) {
        loader.dataset.animationState = 'fade-out';
        removeLoaderFromDOM(0);
    } else {
        setTimeout(() => {
            loader.dataset.animationState = 'fade-out';
        }, loadingAnimationDuration - loadingTime);
        removeLoaderFromDOM(loadingAnimationDuration - loadingTime);
    }
}

function removeLoaderFromDOM(delay) {
    setTimeout(() => {
        loader.remove();
    }, delay + loaderFadingOutDuration);
}

function startLoaderAnimation() {
    loader.dataset.animationState = 'show-logo';
    setTimeout(() => {
        loader.dataset.animationState = 'show-editor-name';
    }, 600);
    setTimeout(() => {
        loader.dataset.animationState = 'enlargement';
    }, 1200);
}