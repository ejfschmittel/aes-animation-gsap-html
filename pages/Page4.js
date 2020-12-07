

import AnimatedPage from "../AnimatedPage.js"


class Page4 extends AnimatedPage{
    constructor(id){
        super(id, "page4.html", "html/page4.css");
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