
const ANIMATION_FEATURE_CONTAINER_DURATION = 900;
const ANIMATION_FEATURE_DURATION = 600;

const LARGE_SCREENS_BREAKPOINT = 900;

// TASKS:
// Menu closes when user clicks outside of the features menu
// Just one feature description is opened at a certain moment

$("document").ready(() => {
    if (window.innerWidth < LARGE_SCREENS_BREAKPOINT) {
        $(".features").hide();
    }
    $(".features .description").hide();

    $(".features-title").click(() => {
        if ($(".features").css("display") === "block") {
            $(".features").slideUp(ANIMATION_FEATURE_CONTAINER_DURATION).fadeOut(ANIMATION_FEATURE_CONTAINER_DURATION);
            $(".features-container").attr("data-menu-opened", "false");
        } else {
            $(".features").slideDown(ANIMATION_FEATURE_CONTAINER_DURATION).fadeIn(ANIMATION_FEATURE_CONTAINER_DURATION);
            $(".features-container").attr("data-menu-opened", "true");
        }
    });

    $(".feature .wrapper button").click(e => {
        const featureElement = $(e.currentTarget).parents(".feature");
        const descriptionElement = featureElement.children(".description");
        if (descriptionElement.css("display") === "flex") {
            descriptionElement.slideUp(ANIMATION_FEATURE_DURATION).fadeOut(ANIMATION_FEATURE_DURATION);
            featureElement.attr("data-description-opened", "false");
        } else {
            descriptionElement.slideDown(ANIMATION_FEATURE_DURATION).fadeIn(ANIMATION_FEATURE_DURATION);
            featureElement.attr("data-description-opened", "true");
        }
    });
});