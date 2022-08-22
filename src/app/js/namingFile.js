
import { PROGRAMMING_LANGUAGES_DATA, ANIMATION_FEATURE_DURATION } from './variables.js';

$("document").ready(() => {
    $('.hint').hide();
    $("#name-file-frm").submit(e => {
        e.preventDefault();
        const namingFileContainer = $(".naming-file-container");
        const isFileNamed = namingFileContainer.attr('data-file') === 'named';
        if (isFileNamed) {
            $("#name-file-frm .input").fadeIn(300);
            $("#name-file-frm .file-name").hide();
            $(".naming-file-container").attr('data-file', 'unnamed');
            $("#name-file-frm button").text('Save');
            $("#name-file-frm input").focus();
        } else {
            const result = validateInput();
            if (result.isValid) {
                // apply programming language
                $(".editor-container").attr('data-prog-lang', result.fileType);
                // change other things that should be changed
                $("#name-file-frm .input").hide();
                const inputValue = $('#name-file-frm input')[0].value.trim();
                $("#name-file-frm .file-name").text(`./${inputValue}`);
                $("#name-file-frm .file-name").fadeIn(300);
                $("#name-file-frm button").text('Change file name');
                $(".naming-file-container").attr('data-file', 'named');
            } else {
                $("#name-file-frm .input span").text(`${result.errorMessage}.`);
                $("#name-file-frm .input span").slideDown(300).fadeIn(300);
            }
        }
    });
    $("#name-file-frm input").keyup(() => {
        // show label
        if ($("#name-file-frm input")[0].value === '') {
            $("#name-file-frm .input").attr("data-typing", "off");
        } else {
            $("#name-file-frm .input").attr("data-typing", "on");
        }
        // hide error message if the filename is correct
        const result = validateInput();
        if (result.isValid) {
            $("#name-file-frm .input span").slideUp(300).fadeOut(300);
        }
    });
    // showing and hiding hint for naming file
    $('.hint-btn').click(() => {
        const tooltipText = $('.hint-btn').attr('data-tooltip');
        if (tooltipText === 'Show filename hint') {
            $('.hint-btn').attr('data-tooltip', 'Hide filename hint');
            $('.hint').slideDown(ANIMATION_FEATURE_DURATION).fadeIn(ANIMATION_FEATURE_DURATION);
        } else {
            $('.hint-btn').attr('data-tooltip', 'Show filename hint');
            $('.hint').slideUp(ANIMATION_FEATURE_DURATION).fadeOut(ANIMATION_FEATURE_DURATION);
        }
    });
});

function validateInput() {
    const inputValue = $('#name-file-frm input')[0].value.trim();
    if (inputValue === '') {
        return {
            isValid: false,
            errorMessage: 'File name omitted'
        }
    }

    const FILE_NAME_REGEX = /^\w+\.(xml|html|css|js|json|py|go|rb)$/;

    if (inputValue.match(FILE_NAME_REGEX) == null) {
        return {
            isValid: false,
            errorMessage: 'Incorrect file name format'
        }
    }

    const fileNamePieces = inputValue.split('.');
    const fileExtension = fileNamePieces[fileNamePieces.length - 1].toLowerCase();
    const fileType = getEditorLandMode(fileExtension);
    return {
        isValid: true,
        fileType
    }
}

function getEditorLandMode(fileExtension) {
    return PROGRAMMING_LANGUAGES_DATA.find(progLang => progLang.extension === fileExtension).editorModeName;
}

export function isFileNamedProperly() {
    const namingFileContainer = $(".naming-file-container");
    const isFileNamed = namingFileContainer.attr('data-file') === 'named';
    if (isFileNamed) {
        const result = validateInput();
        if (result.isValid) {
            return result;
        }
    }
    return false;
}