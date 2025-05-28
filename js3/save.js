import { states } from "./main.js"

export function initsave(){

const nachricht = document.querySelector('[data-nachricht]')

const save = document.querySelector('[data-save]')

save.addEventListener("click",()=>{


    const textarea = document.querySelector('[data-textarea]')
    const zeichen = document.querySelector('[data-zeichen]')

    
    if(textarea.value.length == 0){
        alert("Bitte Text eingeben")
        return
    }

    states.setState("flowerspage")


nachricht.textContent = textarea.value

textarea.value = ""
zeichen.innerHTML = `Maximal 200 Zeichen`

})

}