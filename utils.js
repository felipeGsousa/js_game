const utils = {
    withGrid(n) {
        return n * 31
    },

    asGridCoords(x,y) {
        return `${x*31},${y*31}`
    },

    nextPos(initialX, initialY, direction){
        let x = initialX;
        let y = initialY;
        const size = 31;
        if (direction === "left") {
            x -= size;
        } else if (direction === "right") {
            x += size;
        } else if (direction === "up") {
            y -= size;
        } else if (direction === "down") {
            y += size;
        }
        return {x, y};
    }
}
