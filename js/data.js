import { FLOWERS } from "./flower.js";

let person = localStorage.getItem("owner");

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
      .fail(function (error) {});
  }

  addItem(text, owner) {
    let foundItem = this.data.find((item) => {
      return item.wunsch === "" && item.owner === owner;
    });

    foundItem.wunsch = text;
    foundItem.time = new Date().getTime().toString();
    FLOWERS.get(foundItem.id).grow();
  }

  renderData() {
    console.log(this.data);

    this.data.forEach((e) => {
      const flower = FLOWERS.get(e.id);
      if (flower && e.wunsch != "" && e.time != "") {
        flower.grow();
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
