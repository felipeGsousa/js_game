let engine = false;
(function(){
    
    engine = new Engine({
        element: document.querySelector(".game-container")
    });

    engine.init()

})();

function onChange(){
    let name = document.getElementById('name').value;
    if(name.length > 0 && name.length < 7) {
        engine.onChange();
    }
}