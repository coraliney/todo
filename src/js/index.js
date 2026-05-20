import { Adventures } from "./modules/class";

let todo = []; //min lista/array

todo.push(new Adventures("Climb Kilimanjaro", true, "travel")); //listans innehåll; mina objekt med klass- trycks in i listan
todo.push(new Adventures("Visit the 'Seven wonders'", false, "travel")); //listans innehåll; mina objekt med klass- trycks in i listan
todo.push(new Adventures("Learn a new skill", false, "travel")); //listans innehåll; mina objekt med klass- trycks in i listan

let container = document.getElementById("container"); //hämtar min div, från html:n för att lägga "klarlista" i min div
let listan = document.getElementById("listan"); //detta är min ul från html:n som jag hämtat - false
let klarLista = document.createElement("ul"); //nytt element skapat i js. rollas i loopen sedan - true
klarLista.id = "klarLista";
container.appendChild(klarLista); //containern är förälder, klarListan barnet. Berättar var den ska placeras- barnet alltså.

//input och knapp för egen todo
let todoInput = document.getElementById("todoInput"); //hämtar input
let addTodoBtn = document.getElementById("addTodoBtn"); //hämtar knapp

function visaUppdrag() {
  listan.innerHTML = "";
  klarLista.innerHTML = ""; //dessa två är för att inte loopas om för mycket, tömmer innehållet så att den bara en loopas en gång.. Ser innehållet från en loop menar jag.

  for (let i = 0; i < todo.length; i++) {
    //detta är min loop
    let adventure = document.createElement("li"); //här i min loop har jag skapat en li-variabel. Är en lokal variabel

    adventure.className = "flexar"; //gör en klass till adventure/elementet som heter flexar.
    let spanTag = document.createElement("span"); //skapat ett span-element och döpt till spanTag.
    let deleteIcon = document.createElement("i"); //gör en variabel, deleteIcon, för ett nytt element av i/ett i-element
    deleteIcon.className = "bi bi-trash3";

    // Sätt alltid texten
    spanTag.innerText = todo[i].task;

    // Lägg alltid till span och ikon
    adventure.appendChild(spanTag);
    adventure.appendChild(deleteIcon);

    if (todo[i].klar === true) {
      //om mitt objekt har "klar" "true"
      adventure.classList.add("klar");
      klarLista.appendChild(adventure);
    } else {
      listan.appendChild(adventure);
    }
    spanTag.innerText = todo[i].task; //så ska den prutta ut det som står i task

    /*   klarLista.appendChild(adventure); */ //säger åt klarlistan att lägga till ett barn som är min "li" dvs adventure
    adventure.appendChild(spanTag); // appendChild är vårt sätt att berätta för DOM att visa grejerna vart de ska ligga i DOM.
    adventure.appendChild(deleteIcon); //lägger till min ikon från bootstrap, i adventure


    if (todo[i].klar === false) {
      //om mitt objekt har "klar" "false"
      spanTag.innerText = todo[i].task; //så ska den prutta ut det som står i task

      listan.appendChild(adventure); //säger åt listan att lägga till ett barn som är min "li" dvs adventure
      adventure.appendChild(spanTag);
      adventure.appendChild(deleteIcon); //lägger till min ikon från bootstrap, i adventure
    }

    adventure.addEventListener("click", () => {
      changeStatus(adventure, todo[i]);
    }); //vi har gjort en addeventlistener som väntar/lyssnar på adventure får ett klick där ett funktionsanrop påbörjas. Vill hämta variabler och position (i), från loopen så har vi gjort en anonym funktion.

    deleteIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteUppdrag(todo[i]); // FIX: skickar objektet istället för index
    });
  }
}

function deleteUppdrag(item) {
  //delete-funktion. använder sig av i för att splica det objekt jag tar bort.
  todo = todo.filter((t) => t !== item);
  visaUppdrag(); //är min loop.
}

function changeStatus(liItemAdventure, listPositioni) {
  if (listPositioni.klar === true) {
    //om den har klar true så ska listpunkten flyttas från klar till inte klar
    listan.appendChild(liItemAdventure); //byter förälder så att säga, till listan från klarlista.
    listPositioni.klar = false; //byter boolean/värde från true till false.
  } else {
    klarLista.appendChild(liItemAdventure);
    listPositioni.klar = true;
  }
  visaUppdrag(); //är min loop.
}

//funktion för att lägga till egen todo
function addNewTodo() {
  let text = todoInput.value.trim();
  if (text === "") return;

  todo.push(new Adventures(text, false, "egen")); //ny todo startar som ej klar/röd
  todoInput.value = "";
  visaUppdrag();
}

//klick på knapp
addTodoBtn.addEventListener("click", addNewTodo);

//Enter funkar i input
todoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addNewTodo();
  }
});

visaUppdrag(); //är min loop.