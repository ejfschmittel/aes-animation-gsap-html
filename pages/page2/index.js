

import AnimatedPage from "../../AnimatedPage.js"

class Page2 extends AnimatedPage{
    constructor(id){
        super(id);
    }

    generateBinary = (count, length=9) => {
        const binaryArray = []
        for (var j = 0; j < count; j++){        
            let binaryString = "";
            for(var i = 0; i < length; i++){
                binaryString += Math.round(Math.random()).toString()
            }
            binaryArray.push(binaryString)
        }
        return binaryArray;
    }


    init(){
        // add content

        this.num1 = document.getElementById("p2-num1")
        this.num2= document.getElementById("p2-num2")
        this.num3 = document.getElementById("p2-num3")

        this.binaries = this.generateBinary(20)

        this.createAnimations();
    }

    
    createMainAnimation(){

        this.createMainTimeline()

        const binaryCounter = {val: 0}

        this.getMainTL().to(binaryCounter, {
            val: this.binaries.length -1,
            duration: 2,
            repeat: 2,
            ease:  `none`,

            onUpdate: () => {
                const val = Math.round(binaryCounter.val)
            
               this.num1.innerHTML = this.binaries[val]
               this.num2.innerHTML = this.binaries[(val + 2) % this.binaries.length]
               this.num3.innerHTML = this.binaries[(val + 5) % this.binaries.length]
            }
        })

        
    }

    createOutAnimation(){
        const box = document.querySelector(".p2-center-box");
        this.createOutTimeline();

        this.getOutTL().to(box, {scale: 3, duration: 1})
    }


}

export default new Page2("page2");