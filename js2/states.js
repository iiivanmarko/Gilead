import { data } from "./main.js"
import { adjstTextareaHeight } from "./textarea.js"



export class States{constructor(){
    
    
    
    
}

setState(state){



if(navigator.onLine == false && document.querySelector(`.${state}`).classList.contains('online')){
    state = "nointernetpage"
}
if(document.querySelector(`.${state}`).classList.contains('online')){
    gsap.set('.menu',{autoAlpha:0})
}else{
    
    gsap.set('.menu',{autoAlpha:1})
}

    const textarea = document.querySelector('[data-textarea]')
    
    if(state == "intropage"){
        
        textarea.value = ""
    }
    if(state == "enterpage"){
   adjstTextareaHeight()
    }

    if(state == "legalpage"){

        gsap.set('.legalbutton',{autoAlpha:0})
        
    }else{
        
        gsap.set('.legalbutton',{autoAlpha:1})
    }
    if(state == "flowerspage"){
        data.renderData()
        gsap.set('.top',{autoAlpha:0})
        
    }else{
        
        gsap.set('.top',{autoAlpha:1})
    }
        
    const active = document.querySelector('.active')
    if(active){
        active.classList.remove('active')
    }
    document.querySelector(`.${state}`).classList.add('active')
    gsap.fromTo(`.${state} > div>*:not(svg)`, {opacity: 0,x:-100}, {opacity: 1, duration: 0.5,x:0, stagger: 0.1})
}
}