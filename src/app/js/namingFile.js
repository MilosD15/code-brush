
import { editor } from "./main.js";

const PROGRAMMING_LANGUAGES = new Map([
    [ 'xml' , 'application/xml' ],
    [ 'html' , 'text/html' ],
    [ 'css' , 'text/css' ],
    [ 'js' , 'text/javascript' ],
    [ 'json' , 'application/x-json' ],
    [ 'py' , 'text/x-python' ],
    [ 'go' , 'text/x-go' ],
    [ 'rb' , 'text/x-ruby' ]
]);

$("document").ready(() => {
    $("#name-file-frm").submit(e => {
        e.preventDefault();
        const namingFileContainer = $(".naming-file-container");
        const isFileNamed = namingFileContainer.attr('data-file') === 'named';
        if (isFileNamed) {
            console.log('in')
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
                editor.setLanguage(result.fileType);
                editor.clear();
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
});

$("#name-file-frm input").keyup(() => {
    const result = validateInput();
    if (result.isValid) {
        $("#name-file-frm .input span").slideUp(300).fadeOut(300);
    }
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
    const fileType = PROGRAMMING_LANGUAGES.get(fileExtension);
    return {
        isValid: true,
        fileType
    }
}