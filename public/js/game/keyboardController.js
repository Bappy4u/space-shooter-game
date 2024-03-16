class keyBoardController{
    constructor(){

    }
    handleKeyPress(key, obj, maxWidth, maxHeight){

        if(key=="ArrowRight"){
            this.handleRightArrowPress(obj, maxWidth);
        }else if(key=="ArrowLeft"){
            this.handleLeftArrowPress(obj, maxWidth);
        }else if(key=="ArrowUp"){
            this.handleUpArrowPress(obj, maxHeight);
        }else if(key=="ArrowDown"){
            this.handleDownArrowPress(obj, maxHeight);
        }
    }
    handleRightArrowPress(obj, maxWidth){
        if(obj.position.x <maxWidth/2 - 5){
            obj.position.x +=0.1;
        }

    }
    handleLeftArrowPress(obj, maxWidth){

        if(obj.position.x > - maxWidth/2 + 5)
        {
            obj.position.x -=0.1;
        }

    }
    handleUpArrowPress(obj, maxHeight){
        if(obj.position.z > 0)
        {
            obj.position.z -=0.1;
        }
    }
    handleDownArrowPress(obj, maxHeight){
        if(obj.position.z  < maxHeight/2 - 3)
        {
            obj.position.z +=0.1;
        }

    }

}

module.exports = keyBoardController;