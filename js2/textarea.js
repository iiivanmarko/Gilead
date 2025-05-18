export function initText(){
    
    const textarea = document.querySelector('[data-textarea]')
    




adjstTextareaHeight()   
textarea.addEventListener('input', ()=>{
    adjstTextareaHeight()   
})



}
export function adjstTextareaHeight() {  
    const textarea = document.querySelector('[data-textarea]')
    const zeichen = document.querySelector('[data-zeichen]')
    const maxLength = 200
      
    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
    zeichen.innerHTML = textarea.value.length
    const remaining = maxLength - textarea.value.length
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