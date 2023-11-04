const gridContainer = document.querySelector("#gridContainer");
const clearBtn = document.querySelector("#clearBtn");
const gridSizeLabel = document.querySelector("#gridSizeLabel");
const sizeSlider = document.querySelector("#sizeSlider");
const selectColor = document.querySelector("#selectColor");
const rainbow = document.querySelector("#rainbow");
const shade = document.querySelector("#shade");

let grid = [];
let gridSize = 16;

let mouseIsDown = false;
let currentColor = "#000000";
let lastColor = currentColor;
let rainbowSelected = false;
let shadeSelected = false;

// document.ondragstart = () => {return false;}

shade.onclick = () => {
    if (shadeSelected) {
        currentColor = lastColor;
        shade.classList.remove("toolPressed");
        shadeSelected = false;
    } else {
        lastColor = currentColor;
        shade.classList.add("toolPressed");
        shadeSelected = true;
    }
}

rainbow.onclick = () => {
    if (rainbowSelected) {
        currentColor = lastColor;
        rainbow.classList.remove("toolPressed")
        rainbowSelected = false;
    } else {
        lastColor = currentColor;
        rainbow.classList.add("toolPressed")
        rainbowSelected = true;
    }
}

selectColor.onchange = () => {
    currentColor = selectColor.value;
    lastColor = currentColor;
}

sizeSlider.onchange = () => {
    let a = sizeSlider.value;
    gridSizeLabel.textContent = `${a}x${a}`;
    gridSize = a;
    createGrid()
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
            square.setAttribute("data-shade", 0);
            grid[i][j] = square;
            gridContainer.appendChild(square);
        }
    }
}

function paint(e) {
    e.preventDefault();
    if (mouseIsDown){
        if (rainbowSelected) {
            let r = Math.floor((Math.random() * 255));
            let g = Math.floor((Math.random() * 255));
            let b = Math.floor((Math.random() * 255));
            currentColor = `rgb(${r}, ${g}, ${b})`;
            e.target.style.backgroundColor = currentColor;
        } else if (shadeSelected) {
            let shadeStep = Number(e.target.dataset.shade);
            if (shadeStep < 10) {
                e.target.dataset.shade = shadeStep + 1;
            }
            console.log(e.target.dataset.shade);
        } else {
            e.target.style.backgroundColor = currentColor;
        }
    }
}


createGrid();

gridContainer.addEventListener("mousedown", e => {
    paint(e);
    mouseIsDown = true;
})

gridContainer.addEventListener("mouseup", () => {
    mouseIsDown = false;
})

gridContainer.addEventListener("mouseleave", () => {
    mouseIsDown = false;
})

gridContainer.addEventListener("mouseover", e => {
    paint(e);
})

gridContainer.addEventListener("click", e => {
    mouseIsDown = true;
    paint(e);
    mouseIsDown = false;
})

clearBtn.addEventListener("click", () => {
    grid.forEach(row => {
        row.forEach(square => {
            square.style.backgroundColor = "#ffffff";
        })
    })
});