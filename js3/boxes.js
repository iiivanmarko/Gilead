import { data, states } from "./main.js"

export function initBoxes(){
    const flowerboxes = document.querySelector('[data-flowerboxes]')
    const BOXES = new Map()
    class BOX{constructor(time,id,text){


        this.id = id
        this.wunsch = text

        
        
        
        this.time = toReadableDate(parseFloat(time))

  

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
    this.text.textContent = `Belegt am ${this.time}`
    this.box.classList.add('belegt')
    gsap.to(this.edit,{autoAlpha:1})
}

editBox(){

   
    
    const boxnachricht = document.querySelector('[data-boxnachricht]')
    boxnachricht.value = this.wunsch
    boxnachricht.id = this.id
 
states.setState("editbox")

}


}

const syncing = document.querySelector('[data-syncing]')

const editflower = document.querySelector('[data-editflower]')
editflower.addEventListener("click",()=> {
    const textarea = document.querySelector('[data-boxnachricht]')
    if(textarea.value.length == 0) {
        alert("Bitte Text eingeben")
        return
    }
    data.editItem(textarea.id, textarea.value)
    data.saveData()
    data.syncData()
    createBoxes()
})


syncing.addEventListener('click', () => {
    data.syncData()
    createBoxes()
  })

function createBoxes(){

    console.log(data.data);
    
    flowerboxes.innerHTML = ""
    BOXES.clear()

    // sort data so the ones with time are first
    data.data.sort((a,b) => {
        if(a.time == "" && b.time != ""){
            return 1
        }else if(a.time != "" && b.time == ""){
            return -1
        }else{
            return 0
        }
    })

    data.data.forEach((item,id) => {
        
        BOXES.set(id,new BOX(item.time,item.id,item.wunsch)) 
        if(item.time != ""){
                BOXES.get(id).belegen()
            }
        })

}

function toReadableDate(input) {
  const date = new Date(input);
  if (isNaN(date)) return 'Invalid Date';

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');

  return `${day}.${month}.${year}`;
}
}

