import { data } from "./main.js";

export function loginhandler(){

    if (window.localStorage.getItem("owner")) {
        data.loaddata();
        data.renderData();
        gsap.set('.login',{autoAlpha:0})
        return
    }
    
    const person = document.querySelector('[data-person]')
    
    const enter = document.querySelector('[data-enter]')
    
    enter.addEventListener('click', async () => {
        if(person.value != "person1" 
            && person.value != "person2"
            && person.value != "person3"
        ){
            alert("You are not allowed to enter this site")
            return
        }
        if (person.value.length > 0) {
            window.localStorage.setItem("owner", person.value);
            await data.loaddata();
            data.renderData();
            person.value = "";
            gsap.set('.login',{autoAlpha:0})
        }
    })
}