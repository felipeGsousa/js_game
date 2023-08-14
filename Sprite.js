class Sprite {
    constructor(config) {

        this.animationsList = {
            "idle-up":[[87,0]],"idle-down":[[0,0]],
            "idle-left":[[58,0]],"idle-right":[[29,0]],

            "idle-shield-up":[[87,145]],"idle-shield-down":[[0,145]],
            "idle-shield-left":[[58,145]],"idle-shield-right":[[29,145]],

            "walking-up":[[0,87],[29,87],[58,87],[87,87]],
            "walking-down":[[0,29],[29,29],[58,29],[87,29]],
            "walking-left":[[0,116],[29,116],[58,116],[87,116]],
            "walking-right":[[0,58],[29,58],[58,58],[87,58]],

            "walking-shield-up":[[0,232],[29,232],[58,232],[87,232]],
            "walking-shield-down":[[0,174],[29,174],[58,174],[87,174]],
            "walking-shield-left":[[0,261],[29,261],[58,261],[87,261]],
            "walking-shield-right":[[0,203],[29,203],[58,203],[87,203]],

            "defending-up":[[232,29]],"defending-down":[[145,29]],
            "defending-left":[[203,29]],"defending-right":[[174,29]],

            "attacking-up":[[232,0]],"attacking-down":[[145,0]],
            "attacking-left":[[203,0]],"attacking-right":[[174,0]],

            "attacking-shield-up":[[232,58]],"attacking-shield-down":[[145,58]],
            "attacking-shield-left":[[203,58]],"attacking-shield-right":[[174,58]],

            "attacking-wand-up":[[232,87]],"attacking-wand-down":[[145,87]],
            "attacking-wand-left":[[203,87]],"attacking-wand-right":[[174,87]],
        }
        
        this.name = config.name;
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = () => {
            this.isLoaded = true;
        } 

        this.animations = config.animations || this.animationsList;
            
        this.currentAnimation = config.currentAnimation || "idle-down";
        this.currentAnimationFrame = 0;

        this.animationFrameLimit = config.animationFrameLimit || 6;
        this.animationFrameProgress = this.animationFrameLimit;

        this.gameObject = config.gameObject;
    }

    get frame() {
        return this.animations[this.currentAnimation][this.currentAnimationFrame];
    }

    setAnimation(key) {
        if (this.currentAnimation !== key) {
            this.currentAnimation = key;
            this.currentAnimationFrame = 0;
            this.animationFrameProgress = this.animationFrameLimit;
        }
    }

    updateAnimationProgress() {
        if (this.animationFrameProgress>0) {
            this.animationFrameProgress -= 1;
            return;
        }

        this.animationFrameProgress = this.animationFrameLimit;
        this.currentAnimationFrame += 1;

        if (this.frame === undefined) {
            this.currentAnimationFrame = 0
        }
    }

    draw(ctx, cameraPlayer) {
        const x = this.gameObject.x - 1 + utils.withGrid(3) - cameraPlayer.x;
        const y = this.gameObject.y - 7  + utils.withGrid(2) - cameraPlayer.y;

        const [frameX, frameY] = this.frame;

        ctx.fillStyle = "white"
        ctx.fillRect(x-5,y-8,40,10)
        
        ctx.font = "8px pixel";
        ctx.lineWidth = 2;
        ctx.textAlignt = "center";
        ctx.fillStyle = "black"
        ctx.strokeRect(x-5,y-8,40,10);   
        ctx.textRendering = "geometricPrecision";
        let txt = this.name;
        ctx.fillText(txt, x, y)
        
        this.isLoaded && ctx.drawImage(this.image,
        frameX, frameY,29,29,x,y,29,29)

        this.updateAnimationProgress();
    }
} 
