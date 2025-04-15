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

    const database = await fetch("php/loadData.php");
    const fetcheddata = await database.json();

    window.localStorage.setItem("data", JSON.stringify(fetcheddata));

    this.data = fetcheddata;
  }

  addItem(text, owner) {
    let foundItem = this.data.find((item) => {
      return item.wunsch === "" && item.owner === owner;
    });

    foundItem.wunsch = text;
    foundItem.time = new Date().getTime();
  }

  renderData() {
    console.log(this.data);
  }

  saveData() {
    window.localStorage.setItem("data", JSON.stringify(this.data));
  }



async syncData() {
      window.localStorage.removeItem("data");

      $.post("php/saveData.php", {
        data: JSON.stringify(this.data),
      })
        .done(async () =>{
          await  this.loaddata();
     this.renderData()

        })
        .fail(function (error) {
          console.error("Error saving data:", error);
        });

}


}
