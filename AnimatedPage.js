


/*

    fadeIn => animationIn => mainAnimation => animationOut => nextPage


*/


const ANIMATION_IN = "animationin"
const ANIMATION_OUT = "animationout"
const ANIMATION_MAIN = "animationmain"
const FADE_IN = "fadein"

class AnimatedPage{




    constructor(id){
        this.id = id;
        this.page = null;
        this.FADE_IN_TIME = 0.5;
        
        this.CREATE_ANIMATIONS_ON_EVERY_PLAY = false;

        this.AFTER_IN_TL_DELAY = 0;
        this.AFTER_MAIN_TL_DELAY = 3000;
        this.AFTER_OUT_TL_DELAY = 0;

        this.timelines = {
            [ANIMATION_IN]: null,
            [ANIMATION_OUT]: null,
            [ANIMATION_MAIN]: null,
            [FADE_IN]: null
        }
        this.currentAnimation = null;
    }

    createAnimations(){
        this.createInAnimation();
        this.createOutAnimation();
        this.createMainAnimation();
    }


    playMainAnimation(){
        this.currentAnimation = ANIMATION_MAIN
        if(this.CREATE_ANIMATIONS_ON_EVERY_PLAY) this.createMainAnimation()
        if(this.getMainTL()) this.getMainTL().play();
        else this.onMainTimelineComplete();  
    }

  
    playInAnimation(){
        this.currentAnimation = ANIMATION_IN
        if(this.CREATE_ANIMATIONS_ON_EVERY_PLAY) this.createInAnimation()
        if(this.getInTL()) this.getInTL().play();
        else this.onInTimelineComplete();  
    }

    playOutAnimation(){
        this.currentAnimation = ANIMATION_OUT;
        if(this.CREATE_ANIMATIONS_ON_EVERY_PLAY) this.createOutAnimation()
        if(this.getOutTL()){
            this.getOutTL().play();
        } else {
            this.onOutTimelineComplete();  
        }
    }

    createInAnimation(){}
    createOutAnimation(){}
    createMainAnimation(){}

    createMainTimeline(settings={}){
        this.timelines[ANIMATION_MAIN] = gsap.timeline({...settings, paused: true, onComplete: this.onMainTimelineComplete})
    }
    createOutTimeline(settings={}){
        this.timelines[ANIMATION_OUT] = gsap.timeline({...settings, paused: true, onComplete: this.onOutTimelineComplete})
    }
    createInTimeline(settings={}){
        this.timelines[ANIMATION_IN] = gsap.timeline({...settings, paused: true, onComplete: this.onInTimelineComplete})
    }

    onMainTimelineComplete = () => {
        console.log(`${this.id}: main timeline complete`);

        setTimeout(() => {
            this.playOutAnimation();
        },this.AFTER_MAIN_TL_DELAY)
    }


    loadCss = () => {
       
   
        //console.log("loading css")
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `pages/${this.id}/style.css`;
        document.head.appendChild(link);
        
    }





    onInTimelineComplete = () => {
        console.log(`${this.id}: in timeline complete`)
        this.playMainAnimation();
    }

    onOutTimelineComplete = () => {
        console.log(`${this.id}: out timeline complete`)
        // notify Page Controller
        this.controller.currentPageAnimationEnded();
    }

    onFadeInComplete = () => {
        console.log(`${this.id}: on fade in complete`)
        this.playInAnimation();
    }

    getMainTL(){
        return this.timelines[ANIMATION_MAIN];
    }

    getOutTL(){
        return this.timelines[ANIMATION_OUT];
    }

    getInTL(){
        return this.timelines[ANIMATION_IN];
    }




    getID = () => this.id
    getPageElement = () => {
        if(this.page) return this.page;
        return document.getElementById(this.getID())
    }


    querySelector(selector){
        return document.querySelector(`${this.id} ${selector}`);
    }


    loadHTML = () => new Promise((resolve, reject) => {
        try{
        var xhr= new XMLHttpRequest();
        xhr.open('GET', `./pages/${this.id}/page.html`, true);
        xhr.onreadystatechange= function() {

            if (this.readyState!==4) return;
            if (this.status!==200) reject("faield2"); 
            resolve(this.responseText);
        };
        xhr.send();
        }catch(e){
            console.log(e)
        }
    })


    pauseCurrentTimeline = () => {
        if(this.currentAnimation && this.timelines[this.currentAnimation]) {
            console.log(this.currentAnimation)
            console.log(this.timelines)
            this.timelines[this.currentAnimation].pause();
        }
        
    }

    hide(){
        this.pauseCurrentTimeline();
        this.getPageElement().style.opacity = 0;
        this.getPageElement().style.display = "none"
    }

    show(duration=this.FADE_IN_TIME){
        this.currentAnimation = FADE_IN;
        this.timelines[FADE_IN] = gsap.timeline({onComplete: () => this.onFadeInComplete()});
        this.timelines[FADE_IN].fromTo(this.getPageElement().style, {display: "flex", opacity: 0},{opacity: 1, duration})
    }


    setController(controller){
        this.controller = controller;
    }

    
}

export default AnimatedPage;