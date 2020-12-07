

import AnimatedPage from "../../AnimatedPage.js"
import { create4By4, getBounds} from "../../utils.js"

class Page8 extends AnimatedPage{
    constructor(id){
        super(id);
        this.CREATE_ANIMATIONS_ON_EVERY_PLAY = true;
    }

   
    init(){

        const fourByFourContainer = document.querySelector(".p8-grid")
        this.fourByFour = create4By4();

        fourByFourContainer.appendChild(this.fourByFour)
        //this.createAnimations();  


    }  
    
    

    createMainAnimation(){
        const fourByFourContainer = document.querySelectorAll(".p8-grid .cell")


        const RowOneCellOne = fourByFourContainer[1]
        const RowOneCellTwo= fourByFourContainer[5]
        const RowOneCellThree= fourByFourContainer[9]
        const RowOneCellfour= fourByFourContainer[13]

        const RowThreeCellOne = fourByFourContainer[2]
        const RowThreeCellTwo= fourByFourContainer[6]
        const RowThreeCellThree= fourByFourContainer[10]
        const RowThreeCellfour= fourByFourContainer[14]

        
        const RowFourCellOne = fourByFourContainer[3]
        const RowFourCellTwo= fourByFourContainer[7]
        const RowFourCellThree= fourByFourContainer[11]
        const RowFourCellfour= fourByFourContainer[15]


        const cellBounds = getBounds(".p8-grid .cell")

        this.createMainTimeline()

        this.getMainTL().add(this.rotateRow(RowOneCellOne, [RowOneCellTwo, RowOneCellThree, RowOneCellfour]))
        this.getMainTL().add(this.rotateRow(RowThreeCellOne, [RowThreeCellTwo, RowThreeCellThree, RowThreeCellfour]))
        this.getMainTL().add(this.rotateRow(RowThreeCellTwo, [ RowThreeCellThree, RowThreeCellfour, RowThreeCellOne]))

        this.getMainTL().add(this.rotateRow(RowFourCellOne, [ RowFourCellTwo, RowFourCellThree, RowFourCellfour]))
        this.getMainTL().add(this.rotateRow(RowFourCellTwo, [ RowFourCellThree, RowFourCellfour, RowFourCellOne]))
        this.getMainTL().add(this.rotateRow(RowFourCellThree, [RowFourCellTwo, RowFourCellfour, RowFourCellOne]))


        
      

        
    }


    rotateRow = (el, pushovers) => {
        const bounds = getBounds(el)
        const tl = gsap.timeline();
        const w = Math.floor(bounds.width)
        const middle = Math.floor(w * pushovers.length / 2);

        tl.set(el, {zIndex: 100})
        tl.to(el, {y: -100, x: `+=${middle}`, duration: .5})
        tl.to(pushovers, {x: `-=${w}` , duration: .5})
        tl.to(el, {y: 0, x: `+=${middle }` ,duration: .5})
        tl.set(el, {zIndex: 1})

        return tl
    }




}

export default new Page8("page8");