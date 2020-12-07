

import AnimatedPage from "../../AnimatedPage.js"


class Page4 extends AnimatedPage{
    constructor(id){
        super(id);
    }

   
    init(){
        this.createAnimations();
    }

    
    createMainAnimation(){

        let o = {val: 0}
        this.createMainTimeline()

        this.getMainTL().to(o, {val: 20, duration: 5})

      
        
        
    }




}

export default new Page4("page4");