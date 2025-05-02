import { FLOWERS } from "./flower.js";

let person = "person";

export class DATA {
  constructor() {
    this.data = [];
  }
  async loaddata() {
    if (localStorage.getItem("data")) {
      this.data = JSON.parse(localStorage.getItem("data"));
  
      return;
    }

    $.post("php/loadData.php", {
      owner: person,
    })
      .done(async (ret) => {
        
        const parsedData = JSON.parse(ret);
        
        window.localStorage.setItem("data", JSON.stringify(parsedData));
        this.data = parsedData;
      })
      .fail(function (error) {
        
      });
    }
    
    addItem(text, owner) {
      const item = {
        id: 0,
        wunsch: text,
        time: new Date().getTime(),
        owner: owner,
      };
      FLOWERS.get(0).grow()
      this.data.push(item);
    }
    
    renderData() {

      console.log(this.data);
      
      this.data.forEach(e => {
        FLOWERS.get(e.id).grow()
      });
      
  }

  saveData() {
    window.localStorage.setItem("data", JSON.stringify(this.data));
  }

  async syncData() {
    window.localStorage.removeItem("data");

    $.post("php/saveData.php", {
      data: JSON.stringify(this.data),
      owner: person,
    })
      .done(async () => {
        await this.loaddata();

        
        this.renderData();
      })
      .fail(function (error) {
        
      });
  }
}
