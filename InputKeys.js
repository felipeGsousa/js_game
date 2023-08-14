class InputKeys {
    constructor() {
        this.heldDirections = [];
        this.heldActions = [];
        this.map = {
            "ArrowUp": "up",
            "ArrowDown": "down",
            "ArrowLeft": "left",
            "ArrowRight": "right",
        }

        this.actions = {
            "KeyX": "defending",
            "KeyC": "attacking",
        }

        this.keyCPressed = false;
        this.keyXPressed = false;
    }

    get direction() {
        return this.heldDirections[0];
    }

    get action() {
        return this.heldActions[0];
    }

    init() {
        document.addEventListener("keydown", e => {
            const dir = this.map[e.code];
            if (dir && this.heldDirections.indexOf(dir) === -1) {
                this.heldDirections.unshift(dir);
            }
            
            if(e.code == "KeyC" && !this.keyCPressed && !this.keyXPressed || e.code == "KeyX" && !this.keyCPressed) {
                const act = this.actions[e.code];
                if (act && this.heldActions.indexOf(act) === -1) {
                    this.heldActions.unshift(act);
                } if(e.code == "KeyC") {
                    this.keyCPressed = true;
                    setTimeout(()=>{
                        this.heldActions = [];
                    },200);
                } if(e.code == "KeyX") {
                    this.keyXPressed = true;
                }
            }
        })

        document.addEventListener("keyup", e => {
            const dir = this.map[e.code];
            const index = this.heldDirections.indexOf(dir);
            if(index>-1) {
                this.heldDirections.splice(index, 1);
            }

            if(e.code == "KeyC") {
                this.keyCPressed = false;
            } if(e.code == "KeyX") {
                this.keyXPressed = false;
            }
            const act = this.actions[e.code];
            const indexActions = this.heldActions.indexOf(act);
            if(indexActions>-1) {
                this.heldActions.splice(indexActions, 1);
            }
        })
    }
}