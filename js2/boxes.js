import { states } from "./main.js"

export function initBoxes(){
const flowerboxes = document.querySelector('[data-flowerboxes]')
const BOXES = new Map()
class BOX{constructor(){

    this.box = document.createElement('div')
    this.box.classList.add('box')
    
    
    this.edit = document.createElement('div')

    this.text = document.createElement('div')
   this.text.textContent = "Noch verfügbar"
    this.edit.classList.add('edit')
    this.edit.innerHTML = "<img src='img/edit.svg' alt='edit'>"
    this.box.appendChild(this.text)
    this.box.appendChild(this.edit)

    gsap.set(this.edit,{autoAlpha:0})

    flowerboxes.appendChild(this.box)

    this.edit.addEventListener('click',()=>{
        this.editBox()
    })

}

belegen(){
    this.text.textContent = "Belegt (Datum TT.MM.JJJJ)"
    this.box.classList.add('belegt')
    gsap.to(this.edit,{autoAlpha:1})
}

editBox(){

 
states.setState("editbox")

}


}


for (let i = 0; i < 70; i++) {
 BOXES.set(i,new BOX()) 
}
BOXES.get(0).belegen()
BOXES.get(1).belegen()
BOXES.get(2).belegen()
BOXES.get(3).belegen()

}