

import AnimatedPage from "../AnimatedPage.js"
import {stringAsListOfSpans} from '../utils.js';

class Page1 extends AnimatedPage{
    constructor(id, htmlPath){
        super(id, htmlPath);
    }

    init(){
        const headline1 = document.querySelector("#p1-headline1")
        const headline2 = document.querySelector("#p1-headline2")

        this.headline1Chars = stringAsListOfSpans("Rijandael")
        this.headline2Chars = stringAsListOfSpans("Cipher")

        this.headline1Chars.map(span => {span.style.opacity = 0; headline1.appendChild(span); })
        this.headline2Chars.map(span => {span.style.opacity = 0;headline2.appendChild(span); })   

        this.createAnimations();
    }

    createMainAnimation(){
        this.createMainTimeline();

        this.getMainTL().fromTo(this.headline1Chars, {
            opacity: 0,
        }, {
            opacity: 1,
            duration: 1,
            stagger: .2
        }, "rijndael")

        
        this.getMainTL().fromTo(this.headline1Chars, {
            scaleX: 2,
            scaleY: 2,
        },{
                scaleX: 1,
            scaleY: 1,
            duration: .5,
            stagger: .2,
        }, "<")


        this.getMainTL().fromTo(this.headline2Chars, {
            opacity: 0,
        }, {
            opacity: 1,
            duration: 2,
            stagger: .2
        })

        
        this.getMainTL().fromTo(this.headline2Chars, {
               scaleX: 2,
            scaleY: 2,
        },{
             scaleX: 1,
            scaleY: 1,
            duration: .5,
            stagger: .2,
        }, "<")
    }


}

export default new Page1("page1", "page1.html");