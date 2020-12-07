

class PageController {
    constructor(parentId){
        this.parentId = parentId;
        this.parent = document.getElementById(parentId);
        this.currentPage = 0;
        this.pages = [];
        
        this.init();
    }

    init(){

        this.controls = document.createElement("div")
        this.controls.classList.add("animation-controls")

        this.controls.innerHTML = `
            <div class="page-controls"></div>
        `

        this.parent.appendChild(this.controls)
    }

    renderPageControlls = () => {
        const pageControls = this.parent.querySelector(`.page-controls`)
        pageControls.innerHTML = ""; 

        for(let i = 0; i < this.pages.length; i++){

            const button = document.createElement("div");
            button.addEventListener("click", () => this.onButtonClick(i))
            button.classList.add("page-control")
            if(this.currentPage == i){
                button.classList.add("page-control--active")
            }
            pageControls.appendChild(button)
            
        }
        
    }

    onButtonClick = (num) => {
        this.goToPage(num)
    }

    registerPage = async (animationPage) => {
        // load html and add to parent 
        animationPage.setController(this)
        const html = await animationPage.loadHTML();
        animationPage.loadCss();
        const pageContainer = document.createElement("div");
        pageContainer.id = animationPage.getID();
        pageContainer.classList.add("page-container");
        pageContainer.innerHTML = html;

        this.parent.appendChild(pageContainer)
        animationPage.init();
        if(this.pages.length != 0) animationPage.hide();
        this.currentPage = 0;
        //add to array
        this.pages.push(animationPage)

        this.renderPageControlls();
    }

    goToPage(pageNum){
        console.log("go to page" + pageNum)
        if(pageNum < 0 || pageNum >= this.pages.length) return
        this.pages[this.currentPage].hide();
        this.currentPage = pageNum;
        this.renderPageControlls();
        this.pages[this.currentPage].show();
    }

    currentPageAnimationEnded(){
        console.log(`PageController: go to next page ${this.currentPage + 1}`)
        this.goToPage(this.currentPage + 1)

    }
}

export default PageController