class WorldMap {
    constructor (config) {
        this.gameObjects = config.gameObjects;

        this.walls = config.walls || {};

        this.levelImage = new Image();
        this.levelImage.src = config.levelImageSrc;
    }

    drawLevelImage(ctx, cameraPlayer) {
        ctx.drawImage(this.levelImage, 
            utils.withGrid(3) - cameraPlayer.x, 
            utils.withGrid(2) - cameraPlayer.y
        )
    }

    isSpaceTaken(currentX, currentY, direction) {
        const {x, y} = utils.nextPos(currentX, currentY, direction);
        return this.walls[`${x},${y}`] || false;
    }
}

window.WorldMaps = {
    World: {
        levelImageSrc: "assets/world/collisionMap.png",
        gameObjects: {
            player: new Player({
               
            })
        },
        walls: {
            //"16,16": true
            [utils.asGridCoords(2,2)] : true,
            [utils.asGridCoords(2,3)] : true,
            [utils.asGridCoords(2,4)] : true,
            [utils.asGridCoords(2,5)] : true,
            [utils.asGridCoords(2,6)] : true,
            [utils.asGridCoords(2,7)] : true,
            [utils.asGridCoords(2,8)] : true,
            [utils.asGridCoords(2,9)] : true,
            [utils.asGridCoords(2,10)] : true,
            [utils.asGridCoords(2,11)] : true,
            [utils.asGridCoords(2,12)] : true,
            [utils.asGridCoords(13,2)] : true,
            [utils.asGridCoords(13,3)] : true,
            [utils.asGridCoords(13,4)] : true,
            [utils.asGridCoords(13,5)] : true,
            [utils.asGridCoords(13,6)] : true,
            [utils.asGridCoords(13,7)] : true,
            [utils.asGridCoords(13,8)] : true,
            [utils.asGridCoords(13,9)] : true,
            [utils.asGridCoords(13,10)] : true,
            [utils.asGridCoords(13,11)] : true,
            [utils.asGridCoords(13,12)] : true,
        
            [utils.asGridCoords(3,2)] : true,
            [utils.asGridCoords(4,2)] : true,
            [utils.asGridCoords(5,2)] : true,
            [utils.asGridCoords(6,2)] : true,
            [utils.asGridCoords(7,2)] : true,
            [utils.asGridCoords(8,2)] : true,
            [utils.asGridCoords(9,2)] : true,
            [utils.asGridCoords(10,2)] : true,
            [utils.asGridCoords(11,2)] : true,
            [utils.asGridCoords(12,2)] : true,
            [utils.asGridCoords(13,2)] : true,

            [utils.asGridCoords(3,12)] : true,
            [utils.asGridCoords(4,12)] : true,
            [utils.asGridCoords(5,12)] : true,
            [utils.asGridCoords(6,12)] : true,
            [utils.asGridCoords(7,12)] : true,
            [utils.asGridCoords(8,12)] : true,
            [utils.asGridCoords(9,12)] : true,
            [utils.asGridCoords(10,12)] : true,
            [utils.asGridCoords(11,12)] : true,
            [utils.asGridCoords(12,12)] : true,  
        }
    }
}

//x = 2, 13
//y = 2, 12
