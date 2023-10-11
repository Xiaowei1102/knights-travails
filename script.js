//use BFS to search for shortest path on 2D grid
//generate 2d grid

function generate2DGrid() {
    return Array.from(Array(8), () => new Array(8));
}

//about how to save the route: use a separate queue to store the path(one node corresponds to one path)

board = generate2DGrid();
const move = [[1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]];


//we need a visited array, but checking is a bit tricky since normally, bfs spread in 4 directions but this one in 8 directions and also not continously... so just checking if this element is already in the stored path (not sure if this works...)
function visited(node, path) {
    for (let i = 0; i < path.length; i++) {
        if(path[i][0] === node[0] && path[i][1] === node[1]) {
            return 1;
        }
        return 0;
    }
} 

//this function returns array
function knightMoves(board, start, end) {
    //store paths;
    let paths = [];
    //current path;
    let path = [];
    path.push(start);
    //this is the equivlant of java: new ArrayList<>(path);
    paths.push(path.slice());
    //this is equivlant of java: !paths.isEmpty()
    while (paths.length) {
        const size = paths.length;
        for (i = 0; i < size; i++) {
            //this is equivlant of java: paths.offer()
            path = paths.shift();
            let node = path[path.length - 1];
            if (node[0] === end[0] && node[1] === end[1]) {
                
                return path;
            }
            //add all the relative relative nodes 
            for (let i = 0; i < move.length; i++) {
                const nextY = node[0] + move[i][0];
                const nextX = node[1] + move[i][1];
                //these nodes are out of range
                if (nextX < 0 || nextY < 0 || nextX >= board[0].length || nextY >= board.length) {
                    continue;
                }
                if (!visited([nextY, nextX], path)) {
                    let newPath = path.slice();
                    newPath.push([nextY, nextX]);
                    paths.push(newPath);
                }
            }
        }
    }
}

console.log(knightMoves(board, [3, 3], [0, 0]));


