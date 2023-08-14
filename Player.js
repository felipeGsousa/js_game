class Player extends GameObject {
    constructor(config) {
        super(config);
        this.movingProgressRemaining = config.movingProgressRemaining || 0;
        this.isMe = config.isMe || false;
        this.direction = config.direction || "down";
        this.state = config.state || {
            arrow: null,
            action: null,
        };
        this.directionUpdate = {
            "up":["y",-1],
            "down":["y",1],
            "left":["x",-1],
            "right":["x",1]
        }

        this.name = config.name;
    }

    setState(state) {
        this.state = state;
    }

    update(state) {
        if (state.action) {
            this.action = state.action;
        }

        if (this.movingProgressRemaining > 0){
            this.updatePosition();
        } else {
            if (this.movingProgressRemaining === 0 && state.arrow) {
                this.startBehavior(state, {
                    type: "walking",
                    direction: state.arrow
                });
            }
            this.updateSprite(state);
        }
    }

    startBehavior(state, behaviour) {
        this.direction = behaviour.direction;
        if (behaviour.type === "walking") {
            if (state.map.isSpaceTaken(this.x, this.y, this.direction)){
                return;
            }
            this.movingProgressRemaining = 31;
        }
    }

    updatePosition() {
        const [property, change] = this.directionUpdate[this.direction];
        this[property] += change;
        this.movingProgressRemaining -= 1; 
    }

    updateSprite(state) {
        if (state.action && !state.arrow) {
            this.sprite.setAnimation(state.action + "-"+this.direction);
            return;
        }

        if (this.movingProgressRemaining > 0) {
            this.sprite.setAnimation("walking-"+this.direction);
            return;
        }
        this.sprite.setAnimation("idle-"+this.direction);
    }
}