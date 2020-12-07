

import AnimatedPage from "../AnimatedPage.js"


class Page6 extends AnimatedPage{
    constructor(id){
        super(id, "page6.html", "html/page6.css");
    }

   
    init(){
        this.createAnimations();  
    }    

    
    createMainAnimation(){

        this.createMainTimeline()

        const container = document.querySelector("#page6 .flex")
        const headline = document.querySelector("#page6 h2")

        this.getMainTL().to(container, {scale: 1, translateX: 0, duration: 1.5})
        this.getMainTL().to(headline, {opacity: 1,duration: .5})
        
    }




}

export default new Page6("page6");