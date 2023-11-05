const gridContainer = document.querySelector("#gridContainer");
const clearBtn = document.querySelector("#clearBtn");
const gridSizeLabel = document.querySelector("#gridSizeLabel");
const sizeSlider = document.querySelector("#sizeSlider");
const selectColor = document.querySelector("#selectColor");
const rainbow = document.querySelector("#rainbow");
const darken = document.querySelector("#darken");
const lighten = document.querySelector("#lighten");

let grid = [];
let gridSize = 32;

let mouseIsDown = false;

selectColor.value = "#bb0000";
let currentColor = selectColor.value;
let backgroundColor = window.getComputedStyle(gridContainer).backgroundColor;

let rainbowSelected = false;
let darkenSelected = false;
let lightenSelected = false;

lighten.addEventListener("click", () => {
    if (lightenSelected) {
        lighten.classList.remove("toolPressed");
        lightenSelected = false;
    } else {
        // make this pressed
        lighten.classList.add("toolPressed");
        lightenSelected = true;
        // make other tools unpressed
        darken.classList.remove("toolPressed");
        darkenSelected = false;
        rainbow.classList.remove("toolPressed");
        rainbowSelected = false;
    }
})

darken.addEventListener("click", () => {
    if (darkenSelected) {
        darken.classList.remove("toolPressed");
        darkenSelected = false;
    } else {
        // make this pressed
        darken.classList.add("toolPressed");
        darkenSelected = true;
        // make other tools unpressed
        lighten.classList.remove("toolPressed");
        lightenSelected = false;
        rainbow.classList.remove("toolPressed");
        rainbowSelected = false;
    }
})

rainbow.addEventListener("click", () => {
    if (rainbowSelected) {
        rainbow.classList.remove("toolPressed")
        rainbowSelected = false;
    } else {
        // make this pressed
        rainbow.classList.add("toolPressed")
        rainbowSelected = true;
        // make other tools unpressed
        darken.classList.remove("toolPressed");
        darkenSelected = false;
        lighten.classList.remove("toolPressed");
        lightenSelected = false;
    }
})

selectColor.addEventListener("input", () => {
    currentColor = selectColor.value;
    selectColor.style.backgroundColor = currentColor;
    selectColor.style.borderColor = currentColor;
})

sizeSlider.addEventListener("change", () => {
    createGrid()
})

sizeSlider.addEventListener("input", () => {
    let a = sizeSlider.value;
    gridSizeLabel.textContent = `${a}x${a}`;
    gridSize = a;
})

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
            grid[i][j] = square;
            gridContainer.appendChild(square);
        }
    }
}

function paint(e) {
    e.preventDefault();
    if (mouseIsDown){
        if (rainbowSelected) {
            r = Math.floor((Math.random() * 255));
            g = Math.floor((Math.random() * 255));
            b = Math.floor((Math.random() * 255));
            currentColor = `rgb(${r}, ${g}, ${b})`;
        } else if (darkenSelected) {
            color = rgbToHsl(window.getComputedStyle(e.target).backgroundColor);
            let hsl = color.replace(/[hsl()%]/g, "").split(", ");
            let h=hsl[0], s=hsl[1], l=hsl[2];
            l = l - (l % 10);
            l = Math.max(0, l - 10);
            currentColor = `hsl(${h}, ${s}%, ${l}%)`;
        } else if (lightenSelected) {
            color = rgbToHsl(window.getComputedStyle(e.target).backgroundColor);
            let hsl = color.replace(/[hsl()%]/g, "").split(", ");
            let h=hsl[0], s=hsl[1], l=hsl[2];
            l = l - (l % 10);
            l = Math.min(100, l + 10);
            currentColor = `hsl(${h}, ${s}%, ${l}%)`;
        } else {
            currentColor = selectColor.value;
        }
        e.target.style.backgroundColor = currentColor;
    }
}

createGrid();

gridContainer.addEventListener("mousedown", e => {
    mouseIsDown = true;
    paint(e);
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

clearBtn.addEventListener("click", () => {
    grid.forEach(row => {
        row.forEach(square => {
            square.style.backgroundColor = backgroundColor;
        })
    })
});

function rgbToHsl(rgb) {
    rgb = rgb.replace(/[rgb()]/g, "").split(", ");
    let r=Number(rgb[0]), g=Number(rgb[1]), b=Number(rgb[2]);

    r /= 255;
    g /= 255;
    b /= 255;

    // Find greatest and smallest channel values
    let cmin = Math.min(r,g,b);
    let cmax = Math.max(r,g,b);
    let delta = cmax - cmin;
    let h = 0, s = 0, l = 0;
    
    if (delta == 0) {
        h = 0;
    } else if (cmax == r) {
        h = ((g - b) / delta) % 6;
    } else if (cmax == g) {
        h = (b - r) / delta + 2;
    } else {
        h = (r - g) / delta + 4;
    }

    h = Math.round(h * 60);
    
    // Make negative hues positive behind 360°
    if (h < 0) {
        h += 360;
    }

    // Calculate lightness
    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    
    // Multiply l and s by 100
    s = +(s * 100).toFixed(0);
    l = +(l * 100).toFixed(0);

    return `hsl(${h}, ${s}%, ${l}%)`;
}
