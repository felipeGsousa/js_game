class GameObject {
    constructor(config) {
        this.name = config.name;
        this.x = config.x || 0;
        this.y = config.y || 0;
      
        this.sprite = new Sprite({
            name: this.name,
            gameObject: this,
            src: config.src || "assets/player/player_assets.png",
        });
    }

    update() {

    }
}