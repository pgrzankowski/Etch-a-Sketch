const gridContainer = document.querySelector("#gridContainer");
const clearBtn = document.querySelector("#clearBtn");
const gridSizeLabel = document.querySelector("#gridSizeLabel");
const sizeSlider = document.querySelector("#sizeSlider");

let grid = [];
let gridSize = 16;


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
    if (e.buttons === 1){
        e.target.style.backgroundColor = "#ff0000";
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