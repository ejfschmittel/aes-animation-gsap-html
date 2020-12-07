

import AnimatedPage from "../AnimatedPage.js"
import {createSVGRoundedRect} from "../utils.js"

class Page5 extends AnimatedPage{
    constructor(id){
        super(id, "page5.html", "html/page5.css");
    }

   
    init(){
        //this.createAnimations();

        const grid = document.querySelector(".p5-grid")

        const svgContainer = document.createElement("div")
        const [svg, path] = createSVGRoundedRect(300, 300)

        this.loopPath = path;
        svgContainer.appendChild(svg)
        svgContainer.classList.add("p5-svg-rect")
        svgContainer.style.transform = "translateX(50%)"
        grid.appendChild(svgContainer);

        this.createAnimations();

        
    }


    setCounter(count){
        this.counter = count;
        const counter = document.querySelector("#counter-display")
        counter.innerHTML = count;
    }
    
    createMainAnimation(){

        this.createMainTimeline()

        const pathSegment1 = document.querySelector("#svg1 svg path"); 
        const pathSegment2 = document.querySelector("#svg2 svg path"); 

        this.setCounter(0)

        this.getMainTL().to("#p5-runner", {
            motionPath: {
                path: pathSegment1,
                align: pathSegment1,
                alignOrigin: [0.5, 0.5],
                autoRotate: false
            },
            duration: 1,
            ease: "power1.inOut"
        });

        this.getMainTL().to("#p5-runner", {
            motionPath: {
                path: this.loopPath,
                align: this.loopPath,
                alignOrigin: [0.5, 0.5],
                autoRotate: false
            },
            repeat: 7,
            duration: 3,
            ease: "power1.inOut",
            onRepeat: () => {
                this.getMainTL().timeScale(3)
                this.setCounter(this.counter + 1)
            },
            onComplete: () => {
                this.getMainTL().timeScale(1)
                this.setCounter(this.counter + 1)
            }
        });

        
        this.getMainTL().to("#p5-runner", {
            motionPath: {
                path: this.loopPath,
                align: this.loopPath,
                alignOrigin: [0.5, 0.5],
                autoRotate: false,
                start: 0,
                end: .2,
            },
            duration: 1,
            ease: "none",
            onComplete: () => {
                this.setCounter(this.counter + 1)
            }
        });

        this.getMainTL().to("#p5-runner", {
            motionPath: {
                path: pathSegment2,
                align: pathSegment2,
                alignOrigin: [0.5, 0.5],
                autoRotate: false,
            },
            duration: 1,
            ease: "none",
            onComplete: () => {
                this.setCounter(this.counter + 1)
            }
        });
        
        
    }




}

export default new Page5("page5");