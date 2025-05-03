import { DATA } from "./data.js";
import { FLOWERS } from "./flower.js";
import { loginhandler } from "./login.js";



FLOWERS.forEach(f => {
   f.hide()
});






export const data = new DATA();

loginhandler();

const adds = document.querySelectorAll('[data-add]')


adds.forEach(add => {
    add.addEventListener('click', () => {  
    
    data.addItem("test", localStorage.getItem("owner"));
    data.saveData();
    data.renderData();
    
});
})

const sync = document.querySelector('[data-sync]')
sync.addEventListener('click',async () => {
   await data.syncData();
}
)

const reset = document.querySelector('[data-reset]')
reset.addEventListener('click',async () => {
   fetch("php/reset.php").then(async ()=>{
    window.localStorage.removeItem("data");
    await data.loaddata();
    data.renderData();
   })
}
)

const breaker = document.querySelector('[data-break]')
breaker.addEventListener('click',async () => {
   fetch("php/break.php").then( ()=>{
    window.location.reload();
   })
}
)