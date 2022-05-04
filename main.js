let MakingList = {
  create: function (firstInput, ul, error) {
    let secondInput = document.createElement("input");
    let changeBtn = document.createElement("button");
    let DoneBtn = document.createElement("button");
    let DeleteBtn = document.createElement("button");
    let list = document.createElement("li");

    this.firstInput = firstInput;
    this.secondInput = secondInput;
    this.list = list;
    this.ul = ul;
    this.changeBtn = changeBtn;
    this.DoneBtn = DoneBtn;
    this.DeleteBtn = DeleteBtn;
    this.error = error;
    this.doneUl = this.doneUl;
  },

  createList: function () {
    this.changeBtn.innerHTML = "Ändra";
    this.DoneBtn.innerHTML = "Färdig";
    this.DeleteBtn.innerHTML = "Radera";
    this.secondInput.setAttribute("disabled", null);
    this.secondInput.value = this.firstInput;

    if (this.firstInput === "") {
      this.errorMessage();
    } else if (this.firstInput !== "") {
      this.errorMessage();

      this.ul.append(this.list),
        this.list.append(
          this.secondInput,
          this.changeBtn,
          this.DoneBtn,
          this.DeleteBtn
        );
    }
  },

  errorMessage: function () {
    if (this.firstInput === "") {
      this.error.innerHTML = "Får ej skapa tomma sysslor";
      this.error.style.color = "Red";
    } else if (this.firstInput !== "") {
      this.error.innerHTML = "";
    }
  },
  errorMessageSecondInput: function () {
    if (this.secondInput.value.trim() === "") {
      this.error.innerHTML = "Får ej spara tomma sysslor";
      this.error.style.color = "Red";
    } else if (this.secondInput.value.trim() !== "") {
      this.error.innerHTML = "";
    }
  },

  changeInput: function () {
    if (this.secondInput.value.trim() === "") {
      this.errorMessageSecondInput();
    } else if (this.secondInput.value.trim() !== "") {
      this.errorMessageSecondInput();
      this.secondInput.toggleAttribute("disabled");
      let changeText = this.changeBtn.previousSibling.value;
      this.secondInput.value = changeText;
      if (this.changeBtn.innerHTML === `Ändra`) {
        this.changeBtn.innerHTML = `spara`;
      } else {
        this.changeBtn.innerHTML = `Ändra`;
      }
    }
  },

  DoneInput: function (doneUl, e) {
    if (
      this.secondInput.value === "" ||
      e.target.previousSibling.innerHTML === "spara"
    ) {
      this.error.innerHTML = "Antingen är din syssla tom eller inte sparad";
      this.error.style.color = "Red";
    } else {
      this.error.innerHTML = "";
      this.doneUl = doneUl;
      let input = e.target.parentNode;
      console.log(e.target);
      e.target.remove();
      this.doneUl.append(input);
    }
  },

  Erase: function (e) {
    e.target.parentNode.remove();
  },

  reset: function () {
    this.list.remove();
    this.error.innerHTML = "";
    input = document.getElementById("input");
    input.value = "";
  },
};

// hämtar knappen återställ
let resetButton = document.getElementById("reset");

// Placerar återställning innan lätttill för att det ska gå att radera input. value  när man trycker på återställ, innan man skapat ett inlägg.
resetButton.addEventListener("click", function () {
  input = document.getElementById("input");
  input.value = "";
});

//Hämtar knappen läggtill
let addButton = document.getElementById("addBtn");

//När man trycker på läggtill hämtas input och Ul för att placera listan i att göra.
addButton.addEventListener("click", function () {
  let firstInput = document.getElementById("input");
  let ulList = document.getElementById("toDoUl");
  let error = document.getElementById("error");

  //skapar ett object
  let myList = Object.create(MakingList);

  // anropar metoden create och skickar in inputs value, ul och plats för errormassage.
  myList.create(firstInput.value.trim(), ulList, error);

  //anropar Metoden som skapar en lista
  myList.createList();

  //När mantrycker på knappen Ändra anropas metoden changeInput.
  myList.changeBtn.addEventListener("click", function () {
    myList.changeInput();
  });

  // knappen för att fördigställa item/input
  myList.DoneBtn.addEventListener("click", function (e) {
    //Ul för placering av fördig listan
    let doneUl = document.getElementById("doneUl");

    //anropar DoneInput och skickar in färdiglistan för att kunna placera in input i listan. Och e för att kunna nå knappen som triggar eventet.
    myList.DoneInput(doneUl, e);
  });

  //knappen för readera.
  myList.DeleteBtn.addEventListener("click", function (e) {
    //anropar metoden Erase och skickar in e för att nå knappen som triggar eventet.
    myList.Erase(e);
  });

  // hämtar knappen återställ
  let resetButton = document.getElementById("reset");

  //anropar metoden reset.
  resetButton.addEventListener("click", function () {
    myList.reset();
  });
});
