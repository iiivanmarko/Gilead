import { states } from "./main.js";

export function Backs(){

    const backs = document.querySelectorAll('.back,.go')
    backs.forEach(back => {




        back.addEventListener('click', () => {
            states.setState(back.dataset.goto)

        })
    });

}