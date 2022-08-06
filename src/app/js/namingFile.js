
import ProgLanguages from "./ProgrammingLanguages.js";

const namingFileBtn = document.querySelector('#name-file-frm button');

// namingFileBtn.addEventListener('click', () => {
//     const namingFileContainer = namingFileBtn.closest('.naming-file-container');
//     isFileNamed = namingFileContainer.dataset.file === 'named';
//     if (isFileNamed) {

//     } else {

//     }
// });

$("document").ready(() => {
    $("#name-file-frm").submit(e => {
        e.preventDefault();
        const namingFileContainer = $(".naming-file-container");
        const isFileNamed = namingFileContainer.attr('file') === 'named';
        if (isFileNamed) {
            console.log('file named');
        } else {
            const result = validateInput();
            if (result.isValid) {
                // apply programming language
                // change other things that should be changed
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
    const inputValue = $('#name-file-frm input')[0].value;
    if (inputValue === '' || inputValue.trim() === '') {
        return {
            isValid: false,
            errorMessage: 'The file must have its name'
        }
    }

    if (inputValue.includes('.')) {
        const fileNamePieces = inputValue.split('.');
        const fileExtension = fileNamePieces[fileNamePieces.length - 1];
        
        const fileType = ProgLanguages().get(fileExtension);
        if (fileType) {
            return {
                isValid: true,
                fileType
            }
        } else {
            return {
                isValid: false,
                errorMessage: 'Entered file extension is not supported'
            }
        }
    } else {
        return {
            isValid: false,
            errorMessage: 'Please, enter file extension'
        }
    }
}