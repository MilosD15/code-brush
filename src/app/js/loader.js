
// imports
import { APP_PREFIX } from './variables.js';

// DOM elements
const loader = document.querySelector("[data-loader]");

// variables
const transitionBetweenStatesDuration = 500;
let numberOfLoadingAnimationStates = 3;
const additionalLoadingAnimationDelay = 200;
let loaderFadingOutDuration = 800;

startLoaderAnimation();

const loadingStartTime = new Date().getTime();
window.onload = () => {
    const loadingEndTime = new Date().getTime();

    const loadingTime = loadingEndTime - loadingStartTime;

    removeLoader(loadingTime);
};

function removeLoader(loadingTime) {
    const loadingAnimationDuration = transitionBetweenStatesDuration * numberOfLoadingAnimationStates + additionalLoadingAnimationDelay;

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
    // if the user has just entered the website, then play long loader animation
    const playShorterAnimation = sessionStorage.getItem(`${APP_PREFIX}-browsingCodeBrush`);
    if (playShorterAnimation === 'true') {
        // make animation shorter
        numberOfLoadingAnimationStates = 1;
        loaderFadingOutDuration = 600;

        loader.dataset.animationState = 'enlargement';
    } else {
        loader.dataset.animationState = 'show-logo';
        setTimeout(() => {
            loader.dataset.animationState = 'show-editor-name';
        }, transitionBetweenStatesDuration);
        setTimeout(() => {
            loader.dataset.animationState = 'enlargement';
        }, transitionBetweenStatesDuration * 2);

        sessionStorage.setItem(`${APP_PREFIX}-browsingCodeBrush`, true);
    }
}