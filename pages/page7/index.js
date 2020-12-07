

import AnimatedPage from "../../AnimatedPage.js"
import {createSubstitutionTable, create4By4, getBounds, getAbsoluteOffset, getCenterAboveOffset, hexStringToInt} from "../../utils.js"


/*


  needed helper methods 


  // getBounds(el) => x,y, widht,height (widht y scroll??)
  // getAbsoluteBounds(el, parent) => x,y, width, height
  // getOffset(el1, el2)
  // getCenterAboveOffest(el1, el2, offsetTop)



*/

class Page7 extends AnimatedPage{
    constructor(id){
        super(id);
        this.CREATE_ANIMATIONS_ON_EVERY_PLAY = true;
    }

   
    init(){
        this.fourByFour = create4By4();

        this.subTable = createSubstitutionTable();

        const sBoxContainer = document.querySelector("#page7 #s-box")
        const fourByFour = document.querySelector("#page7 .p7-grid")
        fourByFour.appendChild(this.fourByFour)
        sBoxContainer.appendChild(this.subTable)
    }  
    


   getRow = (x) => {
    const elements = []
    this.cells.forEach((e, idx) => Math.floor(idx / 16) == x ? elements.push(e) : null)
     return elements;
   }

   getCol = (y) => {
     const elements = []
     this.cells.forEach((e, idx) => idx % 16 == y ? elements.push(e) : null)
      return elements;
   }


    createMainAnimation(){
      const page = document.querySelector("#page7")
      const firstCell = document.querySelector("#page7 .p7-grid .cell")
      this.cells = document.querySelectorAll("#page7 .s-box-cell");

      const hexString = firstCell.innerHTML
      const c = this.getCol(hexStringToInt(hexString[0]))
      const r = this.getRow(hexStringToInt(hexString[1]))
      const highlightedCell = c[hexStringToInt(hexString[1])];
      const firstCellBounds = getBounds(firstCell)


      const highlightBounds = getAbsoluteOffset(highlightedCell, page)
      const yelowGridTopLeft = getAbsoluteOffset("#page7 .p7-grid", page)

    
      const firstCellOffset = getCenterAboveOffset(firstCell, "#page7 .s-box")

      const newCell = this.createCell(highlightedCell.innerHTML, highlightBounds.width, highlightBounds.height)
      page.appendChild(newCell)

      this.createMainTimeline()

      this.getMainTL().set(newCell, {x: highlightBounds.x , y: highlightBounds.y })
      this.getMainTL().to(firstCell, {translateX:firstCellOffset.x +25, translateY: firstCellOffset.y,duration: 1});
      this.getMainTL().to(c, {background: "red", duration: .5})
      this.getMainTL().to(r, {background: "red", duration: .5})
      this.getMainTL().to(newCell, {opacity: 1, duration: .5})
      this.getMainTL().to(newCell, {width: firstCellBounds.width, height: firstCellBounds.height, duration: .5})
      this.getMainTL().to(newCell, {background: "orange", x: yelowGridTopLeft.x, y: yelowGridTopLeft.y, duration: .5}, "moveback")
      this.getMainTL().to(firstCell, {opacity: 0,  duration: .5}, "moveback+=0")
      this.getMainTL().to(c, {background: "white",  duration: .5}, "moveback+=0")
      this.getMainTL().to(r, {background: "white",  duration: .5}, "moveback+=0")



      this.getMainTL().add(this.createTest())    
    }


    createCell(text, width, height){
      const newCell = document.createElement("div")
      newCell.classList.add("cell")
      newCell.classList.add("r-cell")
      newCell.style.width = `${width}px`;
      newCell.style.height = `${height}px`;
      newCell.innerHTML = text;
      newCell.style.opacity = 0;

      return newCell
    }

    createTest(delay=.5){
      const p7GridCells = document.querySelectorAll("#page7 .p7-grid .cell")
      const tl =  gsap.timeline();


      let prevCell;
      for(let i = 1; i < p7GridCells.length; i++){
        const cell = p7GridCells[i];

        const string = cell.innerHTML
        const firstHex = hexStringToInt(string[0])
        const secondHex = hexStringToInt(string[1])

        const sBoxCell = this.cells[secondHex * 16 + firstHex]



        tl.to(p7GridCells[i], {background: "orange", innerHTML: sBoxCell.innerHTML, duration: 0, delay}, `cell-${i}`)
        tl.to(sBoxCell, {background: "orange", duration: 0, delay}, `cell-${i}+=0`)
     

        if(prevCell){
          tl.to(prevCell, {background: "#fff", duration: 0, delay}, `cell-${i}+=0`)
        }

        prevCell = sBoxCell;
      }

      return tl;
    }




}

export default new Page7("page7");