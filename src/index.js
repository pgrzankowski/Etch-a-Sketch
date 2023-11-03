const gridContainer = document.querySelector("#gridContainer");
const clearBtn = document.querySelector("#clearBtn");
const gridSizeLabel = document.querySelector("#gridSizeLabel");
const sizeSlider = document.querySelector("#sizeSlider");
const selectColor = document.querySelector("#selectColor");
const rainbow = document.querySelector("#rainbow");

let grid = [];
let gridSize = 16;

let CURRENT_COLOR = "#000000";
let LAST_COLOR = CURRENT_COLOR;
let RAINBOW = false;

document.ondragstart = () => {return false;}

rainbow.onclick = () => {
    if (RAINBOW) {
        CURRENT_COLOR = LAST_COLOR;
        rainbow.classList.remove("toolPressed")
        RAINBOW = false;
    } else {
        LAST_COLOR = CURRENT_COLOR;
        rainbow.classList.add("toolPressed")
        RAINBOW = true;
    }
}

selectColor.onchange = () => {
    CURRENT_COLOR = selectColor.value;
}

sizeSlider.onchange = () => {
    let a = sizeSlider.value;
    gridSizeLabel.textContent = `${a}x${a}`;
    gridSize = a;
    createGrid()
    console.log(gridSize);
}


function createGrid() {
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`
    grid = [];
    for (let i=0; i<gridSize; i++) {
        grid[i] = [];
        for (let j=0; j<gridSize; j++) {
            const square = document.createElement("div");
            square.classList.add("gridSquare");
            square.addEventListener("mouseover", paint);
            grid[i][j] = square;
            gridContainer.appendChild(square);
        }
    }
}

function paint(e) {
    e.preventDefault();
    if (e.buttons === 1){
        if (RAINBOW) {
            let r = Math.floor((Math.random() * 255));
            let g = Math.floor((Math.random() * 255));
            let b = Math.floor((Math.random() * 255));
            CURRENT_COLOR = `rgb(${r}, ${g}, ${b})`;
        }
        e.target.style.backgroundColor = CURRENT_COLOR;
    }
}


createGrid();

clearBtn.addEventListener("click", () => {
    grid.forEach(row => {
        row.forEach(square => {
            square.style.backgroundColor = "#ffffff";
        })
    })
});