
const ANIMATION_FEATURE_CONTAINER_DURATION = 900;
const ANIMATION_FEATURE_DURATION = 600;

const LARGE_SCREENS_BREAKPOINT = 900;

$("document").ready(() => {
    if (window.innerWidth < LARGE_SCREENS_BREAKPOINT) {
        $(".features").hide();
    }
    $(".features .description").hide();

    $(window).resize(e => {
        if (e.innerWidth < LARGE_SCREENS_BREAKPOINT) {
            $(".features").hide();
        }
    })

    $(".features-title").click(() => {
        if ($(".features").css("display") === "block") {
            closeFeaturesMenuSmallScreens();
            $(".features-container").attr("data-menu-opened", "false");
        } else {
            openFeaturesMenuSmallScreens();
            $(".features-container").attr("data-menu-opened", "true");
        }
    });

    $(".feature .wrapper button").click(e => {
        closeAllDescriptions();
        const featureElement = $(e.currentTarget).parents(".feature");
        const descriptionElement = featureElement.children(".description");
        if (descriptionElement.css("display") === "flex") {
            closeDescription(descriptionElement);
            featureElement.attr("data-description-opened", "false");
        } else {
            openDescription(descriptionElement);
            featureElement.attr("data-description-opened", "true");
        }
    });

    $("body").click(e => {
        const hasFeaturesContainerForParents = $(e.target).parents('.features-container');
        if (hasFeaturesContainerForParents.length == 0) {
            if (window.innerWidth < LARGE_SCREENS_BREAKPOINT) {
                closeFeaturesMenuSmallScreens();
                $(".features-container").attr("data-menu-opened", "false");
            }
            closeAllDescriptions();
        }
    });
});

function closeAllDescriptions() {
    $(".features .description").slideUp(ANIMATION_FEATURE_DURATION).fadeOut(ANIMATION_FEATURE_DURATION);
    $(".feature").attr("data-description-opened", "false");
}

function closeFeaturesMenuSmallScreens() {
    $(".features").slideUp(ANIMATION_FEATURE_CONTAINER_DURATION).fadeOut(ANIMATION_FEATURE_CONTAINER_DURATION);
}

function openFeaturesMenuSmallScreens() {
    $(".features").slideDown(ANIMATION_FEATURE_CONTAINER_DURATION).fadeIn(ANIMATION_FEATURE_CONTAINER_DURATION);
}

function closeDescription(descriptionElement) {
    descriptionElement.slideUp(ANIMATION_FEATURE_DURATION).fadeOut(ANIMATION_FEATURE_DURATION);
}

function openDescription(descriptionElement) {
    descriptionElement.slideDown(ANIMATION_FEATURE_DURATION).fadeIn(ANIMATION_FEATURE_DURATION);
}