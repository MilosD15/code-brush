
// imports
import { MEDIUM_SCREENS_BREAKPOINT } from "./variables.js";
import { getRandomInteger } from "./utilities.js";

// constants
const ANIMATION_PIECES_INCREMENT = 3;
const ANIMATION_DURATION = 900;
const ANIMATION_DELAY = {
    min: 20,
    max: 240,
    changingStep: 40
}
const MAKING_FILE_CONTAINER_RED_DELAY = 1000;

// global variables
let numberOfCallsAnimatePiecesFunction = getNumberOfCallsOfAnimatePiecesFunction(0, 0, getPieceColumnCount() * 24, 0);
// average time needed for animating pieces in one function call (depends on ANIMATION_DELAY properties)
const averageAnimatePiecesTime = ANIMATION_DELAY.max / 5 * 1.3;
const deleteFileTimeConsumption = MAKING_FILE_CONTAINER_RED_DELAY + ANIMATION_DURATION + numberOfCallsAnimatePiecesFunction * averageAnimatePiecesTime;

export function performDeletingVisually(fileElement) {
    // create cover container
    const deletingCoverElement = document.createElement("div");
    deletingCoverElement.dataset.state = "container-active";
    fileElement.appendChild(deletingCoverElement);
    // hide file element and its content
    fileElement.dataset.state = "deleting";
    // cover file preview
    setTimeout(() => {
        deletingCoverElement.classList.add("deleting-animation-cover");
    }, 0);
    // populate cover with pieces and animate pieces
    setTimeout(() => {
        performDeletingAnimation(deletingCoverElement);
    }, MAKING_FILE_CONTAINER_RED_DELAY);
    // remove the file from the DOM
    setTimeout(() => {
        fileElement.remove();
        console.log('now')
    }, deleteFileTimeConsumption);
    return deleteFileTimeConsumption;
}

function performDeletingAnimation(deletingCoverElement) {
    const piecesColumnCount = getPieceColumnCount();
    const piecesRowCount = 24;
    let pieces = [];

    for (let i = 0; i < piecesColumnCount * piecesRowCount; i++) {
        const piece = document.createElement("div");
        piece.classList.add('piece');
        deletingCoverElement.appendChild(piece);
        pieces.push(piece);
    }
    deletingCoverElement.dataset.state = 'pieces-active';

    animatePieces(0, pieces, [], ANIMATION_DELAY.max);
}

function getNumberOfCallsOfAnimatePiecesFunction(numberOfCalls, animatePiecesCount, piecesCount, usedIndexesCount) {
    if (animatePiecesCount === 0) {
        usedIndexesCount += animatePiecesCount;
        animatePiecesCount += 1;
        return getNumberOfCallsOfAnimatePiecesFunction(numberOfCalls + 1, animatePiecesCount, piecesCount, usedIndexesCount);
    }

    if (animatePiecesCount > piecesCount - usedIndexesCount) {
        return numberOfCalls + 1;
    }

    usedIndexesCount += animatePiecesCount;
    animatePiecesCount += ANIMATION_PIECES_INCREMENT;
    return getNumberOfCallsOfAnimatePiecesFunction(numberOfCalls + 1, animatePiecesCount, piecesCount, usedIndexesCount);
}

function getPieceColumnCount() {
    if (window.innerWidth >= MEDIUM_SCREENS_BREAKPOINT) return 50;

    return 30;
}

function animatePieces(animatePiecesCount, pieces, usedIndexes, currentAnimationDelay) {
    // return if all the pieces are animated
    if (pieces.length === usedIndexes.length) return;

    // increase number of pieces to be animated
    if (animatePiecesCount === 0) {
        animatePiecesCount += 1;
    } else {
        animatePiecesCount += ANIMATION_PIECES_INCREMENT;
    }
    
    let indexesToBeAnimated = [];

    // check if number of pieces to be animated is greater than 
    // number of pieces that are not animated yet, if so, animate
    // the rest of the pieces that are not animated yet
    const alreadyAnimatedPieces = usedIndexes.length;
    if (animatePiecesCount > pieces.length - alreadyAnimatedPieces) {
        for (let i = 0; i < pieces.length; i++) {
            if (!usedIndexes.includes(i)) {
                indexesToBeAnimated.push(i);
            }
        }
    } else {
        indexesToBeAnimated = getNewIndexes(animatePiecesCount, usedIndexes, pieces.length);
    }
    // decrease animation delay
    currentAnimationDelay = decreaseAnimationDelay(currentAnimationDelay);
    // animate pieces
    animateIndexes(pieces, indexesToBeAnimated);
    // wait a little and then recall the function again
    setTimeout(() => {
        animatePieces(animatePiecesCount, pieces, [...usedIndexes, ...indexesToBeAnimated], currentAnimationDelay);
    }, currentAnimationDelay);
}

function getNewIndexes(animatePiecesCount, usedIndexes, numberOfPieces) {
    let indexesToBeAnimated = new Set();
    while (indexesToBeAnimated.size < animatePiecesCount) {
        const newIndex = getUnusedIndex(getRandomInteger(0, numberOfPieces), usedIndexes, numberOfPieces);
        indexesToBeAnimated.add(newIndex);
    }
    return [...indexesToBeAnimated];
}

function getUnusedIndex(index, usedIndexes, numberOfPieces) {
    if (!usedIndexes.includes(index)) return index;

    return getUnusedIndex(getRandomInteger(0, numberOfPieces), usedIndexes, numberOfPieces);
}

function animateIndexes(pieces, indexes) {
    const ANIMATION_TYPES = new Map([
       [0, 'long'], 
       [1, 'normal'], 
       [2, 'short']
    ]);

    indexes.forEach(index => {
        pieces[index].dataset.animationType = ANIMATION_TYPES.get(getRandomInteger(0, 3));
    });
}

function decreaseAnimationDelay(animationDelay) {
    if (animationDelay <= ANIMATION_DELAY.min) return ANIMATION_DELAY.min;

    return animationDelay - ANIMATION_DELAY.changingStep;
}