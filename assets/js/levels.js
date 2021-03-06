import Brick from './brick.js';
export function buildLevel(game, level){
    let bricks = [];
    level.forEach((row, rowIndex) => {
        row.forEach((brick, brickIndex) => {
            if(brick === 1){
                let position = {
                    x: 120 * brickIndex,
                    y: 40 + 30 * rowIndex,
                };
                bricks.push(new Brick(game, position));
            }
        })
    })
    return bricks;
}
export const level1 = [

    [1,0,1,0,1,0,1,0,1,0,],
    [1,1,1,1,1,1,1,1,1,1,],
];

export const level2 = [
    [1,0,1,0,1,0,1,0,1,0],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
];

export const level3 = [
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
];
export const level4 = [
    [1,0,1,0,1,0,1,0,1,0],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
];
export const level5 = [
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
];