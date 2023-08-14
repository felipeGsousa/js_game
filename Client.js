class Client {
    constructor(){
        this.socket = false;
    }   

    createConn() {
        this.socket = io();
        return this.socket;
    }
}


