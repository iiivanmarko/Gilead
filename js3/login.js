import { data, states } from "./main.js";

export async function loginhandler(){

    if (window.localStorage.getItem("owner")) {
       await data.loaddata();
            
        
        states.setState("intropage")
        // return
    }
    
    const person = document.querySelector('[data-person]')
    
    const enter = document.querySelector('[data-enter]')
    
    enter.addEventListener('click', async () => {
 
        
        if(person.value != "andre.reitter@gilead.com" 
            && person.value != "monika.poelzleitner@gilead.com"
            && person.value != "jelena.grubesic@gilead.com"
        ){
            alert("You are not allowed to enter this site")
            return
        }
        if (person.value.length > 0) {
            window.localStorage.setItem("owner", person.value);
            await data.loaddata();
            
            
            
       
            person.value = "";
            states.setState("intropage")
        }
    })
}