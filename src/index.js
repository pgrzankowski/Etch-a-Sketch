const gridContainer = document.querySelector("#gridContainer");
const clearBtn = document.querySelector("#clearBtn");

const grid = [];
const gridSize = 16;


function createGrid() {
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