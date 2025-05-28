import { FLOWERS } from "./flower.js";

let person = localStorage.getItem("owner");

export class DATA {
  constructor() {
    this.data = [];
  }
  async loaddata() {
    return new Promise((resolve, reject) => {
      if (localStorage.getItem("data")) {
        this.data = JSON.parse(localStorage.getItem("data"));
        resolve(this.data);
        return;
      }

      $.post("php/loadData.php", {
        owner: person,
      })
        .done((ret) => {
          const parsedData = JSON.parse(ret);
          window.localStorage.setItem("data", JSON.stringify(parsedData));
          this.data = parsedData;
          resolve(this.data);
        })
        .fail(function (error) {
          reject(error);
        });
    });
  }

  addItem(text, owner) {
    let foundItem = this.data.find((item) => {
      return item.wunsch === "" && item.owner === owner;
    });
    if (foundItem === undefined)  {
      alert('Alle Blumen vergeben!');
      return;
    }
    foundItem.wunsch = text;
    foundItem.time = new Date().getTime().toString();
    FLOWERS.get(foundItem.id).grow();
  }

  editItem(id, wunsch) {
    let foundItem = this.data.find((item) => {
      return item.id == id;
    });
    foundItem.wunsch = wunsch;
    foundItem.time = new Date().getTime().toString();
  }

renderData() {
  // Filter flowers with both .wunsch and .time
  const valid = this.data.filter(e => e.wunsch && e.time);

  // Nothing to show
  if (valid.length === 0) return;

  // Get the most recently added entry (assumes `time` is a number or sortable string)
  const last = valid.reduce((a, b) => (a.time > b.time ? a : b));

  // Render all: grow the most recent, appear the others
  valid.forEach(e => {
    const flower = FLOWERS.get(e.id);
    if (!flower) return;

    if (e === last) {
      gsap.delayedCall(1,()=>{
        flower.grow();    // animate the latest one
      })
    } else {
      flower.grow();    // animate the latest one
      flower.appear();  // just show the rest
      flower.idle();  // just show the rest
    }
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
      .fail(function (error) {});
  }
}
