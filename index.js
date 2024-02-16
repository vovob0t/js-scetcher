const mainContainer = document.querySelector(".mainContainer");
const startButton = document.querySelector("#startBtn");
const countInput = document.querySelector("#sqrCount");
const infoSpan = document.querySelector("#info");

startButton.addEventListener("click", sketcherStart);

function sketcherStart() {
    deleteGrid();
    const sqrCount = Number.parseInt(countInput.value);
    if (sqrCount >= 16 && sqrCount <= 200) {
        createGrid(sqrCount);
        startButton.textContent = "Reset";
        countInput.style.background = "green";
        infoSpan.textContent = "";
    } else {
        countInput.style.background = "red";
        infoSpan.innerHTML = "The <strong>limit</strong> of grid is <strong>between 16 and 200</strong>! Please, input correct number!";
    }
}

function deleteGrid() {
    const gridDiv = document.querySelector(".gridContainer");
    if (gridDiv) {
        gridDiv.remove();
    }
}

function createGrid(sqrCount) {
    const gridContainer = document.createElement("div");
    gridContainer.classList.add("gridContainer");

    mainContainer.appendChild(gridContainer);

    let divWidth = (mainContainer.clientWidth) / sqrCount;

    const div = document.createElement("div");
    div.style.cssText += `width:${divWidth}px; height:${divWidth}px`;

    for (i = 0; i < sqrCount / 2; i++) {
        for (j = 0; j < sqrCount; j++) {
            let divClone = div.cloneNode();
            divClone.addEventListener("mouseenter", changeDivColor)
            gridContainer.appendChild(divClone);
        }
    }
    return;
}

function changeDivColor(event) {
    if (event.target.style.background == "") {
        event.target.style.background = `rgba(${getRandomColorRgb()})`;
    } else {
        increaseAlpha(event);
    }
}
function increaseAlpha(event) {
    let rgba = event.target.style.background;
    let alpaNum = Number.parseFloat(rgba.slice(rgba.length - 4, rgba.length - 1));
    if (alpaNum < 1) {
        alpaNum += 0.1;
        let newColor = rgba.slice(0, rgba.length - 4) + `${alpaNum})`;
        event.target.style.background = newColor;
    }
}

function getRandomColorAttr() {
    let min = 0;
    let max = 255;
    return Math.floor(Math.random() * (max - min) + min)
}

function getRandomColorRgb() {
    redSat = getRandomColorAttr();
    greenSat = getRandomColorAttr();
    blueSat = getRandomColorAttr();
    return `${redSat}, ${greenSat}, ${blueSat}, 0.100`;
}