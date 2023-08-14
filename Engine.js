class Engine {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.context =  this.canvas.getContext("2d");
        this.map = null;
        this.client = new Client();
        this.players = {};
        this.myId = false;
        this.socket = false;
        this.name = false;
    }

    gameLoop() {
        const step = () => {
            if(this.name!==false){
            this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
            if(Object.keys(this.players).length > 0) {
                this.map.gameObjects = this.players
                const cameraPlayer = this.map.gameObjects[this.myId];           
                Object.values(this.map.gameObjects).forEach(object => {
                    object.update({
                        arrow: object.state.arrow,
                        action: object.state.action,
                        map: this.map,
                    })
                })

                this.map.drawLevelImage(this.context, cameraPlayer);

                Object.values(this.map.gameObjects).forEach(object =>{
                    object.sprite.draw(this.context, cameraPlayer);
                })
                if (this.myId != false){
                    const getCircularReplacer = () => {
                        const seen = new WeakSet();
                        return (key, value) => {
                            if (typeof value === 'object' && value !== null) {
                                if (seen.has(value)) {
                                return;
                                }
                                seen.add(value);
                            }
                            return value;
                        };
                    };
                        

                    this.map.gameObjects[this.myId].setState({
                        arrow: this.inputKeys.direction,
                        action: this.inputKeys.action,
                    });
                    let player = this.map.gameObjects[this.myId];
                    player.isMe = false;
                    player.sprite = this.map.gameObjects[this.myId].sprite
                    player = JSON.stringify(player, getCircularReplacer());
                    this.socket.emit('playerAction',player);
                    this.map.gameObjects[this.myId].isMe = true;
                }
            }
            }
            requestAnimationFrame(()=>{   
                step();
            })
        }
        step(); 
    }
    
    onChange(){
        let name = document.getElementById('name').value;
        if(name.length > 0 && name.length < 7) {
            this.name = name;
            this.map = new WorldMap(window.WorldMaps.World);
            this.socket = this.client.createConn();
    
            this.socket.on('updatePlayers', (playersList)=>{
            for(const id in playersList) {
                const player = playersList[id];
                let me = false
                if (id == this.socket.id){
                    this.myId = id;
                    me = true; 
                } 
                if (this.players[id] && id != this.myId){
                    this.players[id] = new Player(player);
                    if(this.players[id].sprite != undefined && player.sprite != undefined){
                        this.players[id].sprite.currentAnimation = player.sprite.currentAnimation;
                        this.players[id].sprite.animationFrameProgress = player.sprite.animationFrameProgress;
                        this.players[id].sprite.currentAnimationFrame = player.sprite.currentAnimationFrame;
                    }
                        
                } else if(!this.players[id]){
                    this.players[id] = new Player({
                        name: this.name,
                        isMe: me,
                        x: player.x,
                        y: player.y,
                    });
                }
            }
            for(const id in this.players){
                if (!playersList[id]){
                    delete this.players[id]
                }
            }
        });
        document.getElementById("player-form").remove();
        this.inputKeys = new InputKeys();
        this.inputKeys.init();
        this.inputKeys.direction; 
        }
    }

    init() {
        this.gameLoop();
    }
};


