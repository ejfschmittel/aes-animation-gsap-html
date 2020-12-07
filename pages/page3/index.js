

import AnimatedPage from "../../AnimatedPage.js"
import {create4By4} from "../../utils.js"

class Page3 extends AnimatedPage{
    constructor(id){
        super(id);
        this.FADE_IN_TIME = 0;
  
    }

   
    init(){
        // add content
        this.yellowGrid = document.getElementById("p3-grid-yellow");     
        const yellow4By4 = create4By4()
        this.yellowGrid.appendChild(yellow4By4)

        this.blueGrid = document.getElementById("p3-grid-blue");     
        const blue4By4 = create4By4()
        this.blueGrid.appendChild(blue4By4)
        

        this.createAnimations();
    }

    
    createMainAnimation(){

        this.createMainTimeline()

        const headline = document.querySelector("#page3 h1")
        const headlines = document.querySelectorAll("#page3 h3")



        const yellowCells = document.querySelectorAll("#p3-grid-yellow .cell")
        const blueCells = document.querySelectorAll("#p3-grid-blue .cell")

        const arrowLeft = document.querySelector(".left .arrow") 
        const arrowRight = document.querySelector(".right .arrow") 

        const texts = document.querySelectorAll(".p3-text")
        const circles = document.querySelectorAll("#page3 .circled")

        this.getMainTL().to(headline, {opacity: 1, duration: .5})
        this.getMainTL().to(headlines, {opacity: 1, duration: .5})
        this.getMainTL().to(this.yellowGrid, {opacity: 1, duration: .5})
        this.getMainTL().to(this.blueGrid, {opacity: 1, duration: .5}, "<")
        this.getMainTL().to(yellowCells, {color: "#000", stagger: .2, duration: 3}, "yellowgrid")
        this.getMainTL().to(blueCells, {color: "#fff", stagger: .2, duration: 3}, "yellowgrid+=.5")


        this.getMainTL().to(arrowLeft, {opacity: 1, duration: .5})
        this.getMainTL().to(arrowRight, {opacity: 1, duration: .5}, "-=.3")

        this.getMainTL().to(texts, {opacity: 1, duration: .5}, "+=.3")
        this.getMainTL().to(circles, {opacity: 1, duration: .5}, "<")
        
        
    }




}

export default new Page3("page3");