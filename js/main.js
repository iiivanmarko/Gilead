import { DATA } from "./data.js";



const data = new DATA();
data.loaddata();
data.renderData();

const adds = document.querySelectorAll('[data-add]')


adds.forEach(add => {
    add.addEventListener('click', () => {  
    
    data.addItem("test", add.dataset.add);
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