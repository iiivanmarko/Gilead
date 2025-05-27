export function initText(){
    
    const textarea = document.querySelector('[data-textarea]')
    
const boxnachricht = document.querySelector('[data-boxnachricht]')



adjstTextareaHeight(textarea)   
textarea.addEventListener('input', ()=>{
    adjstTextareaHeight(textarea)   
})
boxnachricht.addEventListener('input', ()=>{
    adjstTextareaHeight(boxnachricht)   
})



}
export function adjstTextareaHeight(area) {  

    const zeichen = document.querySelector('[data-zeichen]')
    const maxLength = 200
      
    area.style.height = 'auto'
    area.style.height = `${area.scrollHeight}px`
    zeichen.innerHTML = area.value.length
    const remaining = maxLength - area.value.length
    if(remaining == 0){
        zeichen.innerHTML = `Keine Zeichen mehr möglich` 
        return
    }

    if(remaining == maxLength){
        zeichen.innerHTML = `Maximal 200 Zeichen` 
        return
    }
    zeichen.innerHTML = `Noch ${remaining} Zeichen` 
          

}