

import AnimatedPage from "../AnimatedPage.js"
import {createSubstitutionTable, create4By4} from "../utils.js"

class Page8 extends AnimatedPage{
    constructor(id){
        super(id, "page8.html", "html/page8.css");
        this.CREATE_ANIMATIONS_ON_EVERY_PLAY = true;
    }

   
    init(){
        //this.createAnimations();  


    }  
    
    

    createMainAnimation(){

        this.createMainTimeline()

      /*  const rect = document.querySelector("#page8 .my-rect")
        const firstCell = document.querySelector("#page8 h1")
        const bounds2 = rect.getBoundingClientRect()
        const bounds = firstCell.getBoundingClientRect()
        console.log(bounds2)
        this.getMainTL().set(rect, {x: (bounds.x - bounds2.x), y: 0})*/

        
      

        
    }




}

export default new Page8("page8");