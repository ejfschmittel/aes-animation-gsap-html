

import AnimatedPage from "../AnimatedPage.js"
import {createSubstitutionTable, create4By4} from "../utils.js"


/*


  needed helper methods 


  // getBounds(el) => x,y, widht,height (widht y scroll??)
  // getAbsoluteBounds(el, parent) => x,y, width, height
  // getOffset(el1, el2)
  // getCenterAboveOffest(el1, el2, offsetTop)



*/

class Page7 extends AnimatedPage{
    constructor(id){
        super(id, "page7.html", "html/page7.css");
        this.CREATE_ANIMATIONS_ON_EVERY_PLAY = true;
    }

   
    init(){
        //this.createAnimations();  

        this.fourByFour = create4By4();

        this.subTable = createSubstitutionTable();

        const sBoxContainer = document.querySelector("#page7 #s-box")
        const fourByFour = document.querySelector("#page7 .p7-grid")
        fourByFour.appendChild(this.fourByFour)
        sBoxContainer.appendChild(this.subTable)


 




      //  this.createAnimations();
    }  
    
    

   getCell = (x,y) => {

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

    getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      x: rect.x,
      y: rect.y,
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY,
      width: rect.width,
      height: rect.height,
    };
  }

  getCombinedOffest(el,el2){
    const offset1 = this.getOffset(el)
    const offset2 = this.getOffset(el2)
    console.log(offset1)
    console.log(offset2)

    return {x: offset2.left -offset1.left, y:offset2.top -offset1.top}
  }

  getCenterTopOffset(el,el2, height=20){
    const offset1 = this.getOffset(el);

    const offset2 = this.getOffset(el2);

   /* console.log(offset1)
    console.log(offset2)*/


    const offsetX = offset2.left -offset1.left + (offset2.width/2) - (offset1.width/2)
    const offsetY = offset2.top -offset1.top + -offset1.height - height;


    return {x: offsetX, y:offsetY}
  }


    hexToInt(h){
      var hex = parseInt(h.replace(/^#/, ''), 16);
      return hex
    }
    
    createMainAnimation(){
      const page = document.querySelector("#page7")
        const firstCell = document.querySelector("#page7 .p7-grid .cell")
        const sBoxContainer = document.querySelector("#page7 .s-box")
        const p7Grid = document.querySelector("#page7 .p7-grid")
        const p7GridCells = document.querySelectorAll("#page7 .p7-grid .cell")
        this.cells = document.querySelectorAll("#page7 .s-box-cell");


        const p7Bounds = this.getOffset(page)
        const p7GridBounds = this.getOffset(p7Grid)
      
       // console.log(p7Bounds)


       const string = firstCell.innerHTML
       const firstHex = this.hexToInt(string[0])
       const secondHex = this.hexToInt(string[1])
      const c = this.getCol(firstHex)
      const r = this.getRow(secondHex)
      const highlightedCell = c[secondHex];
      const bounds3 = this.getOffset(highlightedCell);
      const firstCellBounds = this.getOffset(firstCell)
     // console.log(bounds3)
              // create 9D element
              const newCell = document.createElement("div")
              newCell.classList.add("cell")
              newCell.classList.add("r-cell")
              newCell.style.width = `${bounds3.width}px`;
              newCell.style.height = `${bounds3.height}px`;
              newCell.innerHTML = highlightedCell.innerHTML;
              newCell.style.opacity = 0;
        const test = this.getCombinedOffest(newCell, highlightedCell)
        console.log(test)
      
        const offset = this.getCenterTopOffset(firstCell, sBoxContainer)

        page.appendChild(newCell)
        this.createMainTimeline()
        this.getMainTL().set(newCell, {x: test.x -p7Bounds.x, y: bounds3.y - p7Bounds.y})
        this.getMainTL().to(firstCell, {translateX:offset.x +25, translateY: offset.y,duration: 1});
        this.getMainTL().to(c, {background: "red", duration: .5})
        this.getMainTL().to(r, {background: "red", duration: .5})
        this.getMainTL().to(newCell, {opacity: 1, duration: .5})
        this.getMainTL().to(newCell, {width: firstCellBounds.width, height: firstCellBounds.height, duration: .5})
        this.getMainTL().to(newCell, {background: "orange", x: p7GridBounds.x -p7Bounds.x, y: p7GridBounds.y -p7Bounds.y, duration: .5}, "moveback")
        this.getMainTL().to(firstCell, {opacity: 0,  duration: .5}, "moveback+=0")
        this.getMainTL().to(c, {background: "white",  duration: .5}, "moveback+=0")
        this.getMainTL().to(r, {background: "white",  duration: .5}, "moveback+=0")

        let current = {val: 1, oldCell: null}


        this.getMainTL().add(() => this.createTest())
       /* this.getMainTL().to(current, {val: 15, duration: 5, ease: "steps(14)", onUpdate: () => {
          console.log(current.val)
         /* if(current.val == 16) return;
          const currCell = p7GridCells[Math.floor(current.val)]
          const string = currCell.innerHTML
          const firstHex = this.hexToInt(string[0])
          const secondHex = this.hexToInt(string[1])

          if(val)

         
          const cell = this.cells[(firstHex * 16) + secondHex]

         
          currCell.style.background = "orange";
          cell.style.background = "orange";
          //currCell.innerHTML = cell.innerHTML;
        }})*/



     

        
    }

    createTest(delay=.5){
      const p7GridCells = document.querySelectorAll("#page7 .p7-grid .cell")
      const tl =  gsap.timeline();


      let prevCell;
      for(let i = 1; i < p7GridCells.length; i++){
        const cell = p7GridCells[i];

        const string = cell.innerHTML
        const firstHex = this.hexToInt(string[0])
        const secondHex = this.hexToInt(string[1])

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