import { loginhandler } from "./login.js";
import { Backs } from "./back.js";
import { DATA } from "./data.js";
import { initBoxes } from "./boxes.js";
import { FLOWERS } from "./flower.js";
import { initsave } from "./save.js";
import { States } from "./states.js";
import { initText } from "./textarea.js";






initsave()

Backs()
initText()
initBoxes()
FLOWERS.forEach(f => {
   f.hide()
   
});

export const data = new DATA();
export const states = new States()






const reload = document.querySelector('[data-reload]')

reload.addEventListener('click', () => { 

   data.syncData()

 })



const legalbutton = document.querySelector('[data-legalbutton]')
legalbutton.addEventListener('click', () => {





   states.setState("legalpage")

})

loginhandler();






window.addEventListener('online', () => {


});

window.addEventListener('offline', () => {

});




