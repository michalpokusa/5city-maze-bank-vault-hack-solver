
document.querySelectorAll(".field--green").forEach( item => {
    item.setAttribute("pattern", "\\d+")
})

document.querySelectorAll(".field--purple").forEach( item => {
    item.setAttribute("pattern", "[x+-]")
})

//  Auto-updating sibling filed
document.addEventListener("input", event => {
    if ( !event.target.matches("[number]") ) return;

    value = event.target.value
    positionOnBoard = event.target.getAttribute("position-on-board")

    if (positionOnBoard.startsWith("top-")) siblingPositionOnBoard = positionOnBoard.replace("top-", "bottom-")
    if (positionOnBoard.startsWith("right-")) siblingPositionOnBoard = positionOnBoard.replace("right-", "left-")
    if (positionOnBoard.startsWith("bottom-")) siblingPositionOnBoard = positionOnBoard.replace("bottom-", "top-")
    if (positionOnBoard.startsWith("left-")) siblingPositionOnBoard = positionOnBoard.replace("left-", "right-")

    document.querySelector(`[position-on-board="${siblingPositionOnBoard}"]`).value = value
})


// Solving
document.querySelector(".calculate_button").addEventListener("click", async (event) => {

    // Getting result values
    let resultValues = Array.from(document.querySelectorAll("[result-value]")).map(resultValueElement => resultValueElement.value)
    resultValues.unshift(undefined)

    // Getting all symbols
    let symbols = Array.from(document.querySelectorAll("[symbol]")).map(symbolElement => symbolElement.value).map(symbol => symbol=="x" ? "*" : symbol)
    symbols.unshift(undefined)

    // Defining all unknown numbers
    let unknownTopLeftNumber,
    unknownTopMiddleNumber,
    unknownTopRightNumber,
    unknownMiddleLeftNumber,
    unknownMiddleMiddleNumber,
    unknownMiddleRightNumber,
    unknownBottomLeftNumber,
    unknownBottomMiddleNumber,
    unknownBottomRightNumber


    let firstEquationSolutions = []
    let secondEquationSolutions = []
    let thirdEquationSolutions = []

    for (unknownLeftNumber = 0; unknownLeftNumber < 10; unknownLeftNumber++) {
    for (unknownMiddleNumber = 0; unknownMiddleNumber < 10; unknownMiddleNumber++) {
    for (unknownRightNumber = 0; unknownRightNumber < 10; unknownRightNumber++) {
            if (eval(`${unknownLeftNumber}${symbols[1]}${unknownMiddleNumber}${symbols[2]}${unknownRightNumber}==${resultValues[4]}`)) {
                firstEquationSolutions.push([
                    unknownLeftNumber,
                    unknownMiddleNumber,
                    unknownRightNumber
                ])
            }
            if (eval(`${unknownLeftNumber}${symbols[6]}${unknownMiddleNumber}${symbols[7]}${unknownRightNumber}==${resultValues[5]}`)) {
                secondEquationSolutions.push([
                    unknownLeftNumber,
                    unknownMiddleNumber,
                    unknownRightNumber
                ])
            }
            if (eval(`${unknownLeftNumber}${symbols[11]}${unknownMiddleNumber}${symbols[12]}${unknownRightNumber}==${resultValues[6]}`)) {
                thirdEquationSolutions.push([
                    unknownLeftNumber,
                    unknownMiddleNumber,
                    unknownRightNumber
                ])
            }
    }}}

    let solved = false

    possibleSolutionsLoop:
    for (const firstEquationSolution of firstEquationSolutions) {
    for (const secondEquationSolution of secondEquationSolutions) {
    for (const thirdEquationSolution of thirdEquationSolutions) {

        [unknownTopLeftNumber,      unknownTopMiddleNumber,     unknownTopRightNumber]      = firstEquationSolution;
        [unknownMiddleLeftNumber,   unknownMiddleMiddleNumber,  unknownMiddleRightNumber]   = secondEquationSolution;
        [unknownBottomLeftNumber,   unknownBottomMiddleNumber,  unknownBottomRightNumber]   = thirdEquationSolution;

        if (
            eval(`${unknownTopLeftNumber}${symbols[3]}${unknownMiddleLeftNumber}${symbols[8]}${unknownBottomLeftNumber}==${resultValues[1]}`) &&
            eval(`${unknownTopMiddleNumber}${symbols[4]}${unknownMiddleMiddleNumber}${symbols[9]}${unknownBottomMiddleNumber}==${resultValues[2]}`) &&
            eval(`${unknownTopRightNumber}${symbols[5]}${unknownMiddleRightNumber}${symbols[10]}${unknownBottomRightNumber}==${resultValues[3]}`)
        ) {
            solved = true
            break possibleSolutionsLoop
        }

    }}}


    if (solved) {
        document.querySelector(`[unknown-top-left]`).value = unknownTopLeftNumber
        document.querySelector(`[unknown-top-middle]`).value = unknownTopMiddleNumber
        document.querySelector(`[unknown-top-right]`).value = unknownTopRightNumber

        document.querySelector(`[unknown-middle-left]`).value = unknownMiddleLeftNumber
        document.querySelector(`[unknown-middle-middle]`).value = unknownMiddleMiddleNumber
        document.querySelector(`[unknown-middle-right]`).value = unknownMiddleRightNumber

        document.querySelector(`[unknown-bottom-left]`).value = unknownBottomLeftNumber
        document.querySelector(`[unknown-bottom-middle]`).value = unknownBottomMiddleNumber
        document.querySelector(`[unknown-bottom-right]`).value = unknownBottomRightNumber
    } else {
        alert("Digits 0-9 do not solve this puzzle")
    }

})

// Cleaning inputs
document.querySelector(".trash_button").addEventListener("click", () => location.reload())
