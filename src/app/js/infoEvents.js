
import { ANIMATION_FEATURE_DURATION } from './variables.js';

$("document").ready(() => {
    $(".info-btn").click(() => {
        $(".general-info-container").slideDown(ANIMATION_FEATURE_DURATION).fadeIn(ANIMATION_FEATURE_DURATION);
    });
    $(".general-info-container [data-close-btn]").click(() => {
        $(".general-info-container").slideUp(ANIMATION_FEATURE_DURATION).fadeOut(ANIMATION_FEATURE_DURATION);
    });
});