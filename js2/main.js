import { Backs } from "./back.js";
import { initBoxes } from "./boxes.js";
import { DATA } from "./data.js";
import { FLOWERS } from "./flower.js";
import { loginhandler } from "./login.js";
import { initsave } from "./save.js";
import { States } from "./states.js";
import { initText } from "./textarea.js";



export const states = new States()

Backs()
initText()
initBoxes()
initsave()
FLOWERS.forEach(f => {
   f.hide()
  
});



export const data = new DATA();


const legalbutton = document.querySelector('[data-legalbutton]')
legalbutton.addEventListener('click', () => {





   states.setState("legalpage")

})

loginhandler();






window.addEventListener('online', () => {


});

window.addEventListener('offline', () => {

});




