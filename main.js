'use-strict';

/* Config */
const CELL_SIZE = 15;

const GRID_SIZE_X = 40;
const GRID_SIZE_Y = 40;

const IN_SET_X = 3;
const IN_SET_Y = 3;

const BORDER_CANVAS = 3;

/* -------------------------------------------- */
const CANVAS_SIZE_X = (GRID_SIZE_X * CELL_SIZE) + (GRID_SIZE_X * IN_SET_X) + IN_SET_X;
const CANVAS_SIZE_Y = (GRID_SIZE_Y * CELL_SIZE) + (GRID_SIZE_Y * IN_SET_Y) + IN_SET_Y;

// Initializes the environment (setting up the canvas and centering it).
function initEnv() {
    document.querySelector('body').style = `
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
    background-color: #212121;
    min-height: 100vh;
    `;
    const canvas = document.createElement('canvas');
    canvas.style = `border: ${BORDER_CANVAS}px solid #888;
                    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
                                rgba(0, 0, 0, 0.12) 0px -12px 30px,
                                rgba(0, 0, 0, 0.12) 0px 4px 6px,
                                rgba(0, 0, 0, 0.17) 0px 12px 13px,
                                rgba(0, 0, 0, 0.09) 0px -3px 5px;`;
    canvas.width = CANVAS_SIZE_X;
    canvas.height = CANVAS_SIZE_Y;
    document.querySelector('body').appendChild(canvas);

    return canvas;
}

function createGridCell() {
    const grid = [];

    for (let i = 0; i < GRID_SIZE_X; i++) {
        grid[i] = [];
        for (let j = 0; j < GRID_SIZE_Y; j++) {
            grid[i][j] = { // Object Cell
                posX: i * CELL_SIZE,
                posY: j * CELL_SIZE,
                aLife: false,
            };
        }
    }
    return grid;
}

function drawGrid(grid, ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j].aLife) {
                ctx.fillStyle = '#888';
            } else {
                ctx.fillStyle = '#111';
            }
            ctx.fillRect(i * (CELL_SIZE + IN_SET_X) + IN_SET_X, j * (CELL_SIZE + IN_SET_Y) + IN_SET_Y, CELL_SIZE, CELL_SIZE);
        }
    }
}

window.onload = () => {
    const canvas = initEnv();
    const ctx = canvas.getContext('2d');

    let gridCell = createGridCell();

    document.addEventListener('click', e => {
        const mouseX = e.pageX - canvas.offsetLeft;
        const mouseY = e.pageY - canvas.offsetTop;
        console.clear();

        for (let i = 0; i < gridCell.length; i++) {
            for (let j = 0; j < gridCell[i].length; j++) {
                if (mouseX > (gridCell[i][j].posX + IN_SET_X) + (i * IN_SET_X) + IN_SET_X &&
                    mouseX < (gridCell[i][j].posX + CELL_SIZE + IN_SET_X) + (i * IN_SET_X) + IN_SET_X &&
                    mouseY > (gridCell[i][j].posY + IN_SET_Y) + (j * IN_SET_Y) + IN_SET_Y &&
                    mouseY < (gridCell[i][j].posY + CELL_SIZE + IN_SET_Y) + (j * IN_SET_Y) + IN_SET_Y) {
                        console.log(`Cell(x:${i}, y:${j})`);

                        if (gridCell[i][j].aLife) {
                            gridCell[i][j].aLife = false;
                            drawGrid(gridCell, ctx, canvas);
                        } else {
                            gridCell[i][j].aLife = true;
                            drawGrid(gridCell, ctx, canvas);
                        }

                    }
            }
        }
    });

    drawGrid(gridCell, ctx, canvas);
}