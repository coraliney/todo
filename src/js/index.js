import { Djur } from "./modules/class";

let todo = []; //min lista/array

todo.push(new Djur("feed animal", false, "zebra")); //listans innehåll; mina objekt med klass- trycks in i listan
todo.push(new Djur("pet animal", true, "lejon")); //listans innehåll; mina objekt med klass- trycks in i listan
todo.push(new Djur("walk with animal", false, "antilop")); //listans innehåll; mina objekt klass- trycks in i listan
todo.push(new Djur("run with animals", false, "skalpadda")); //listans innehåll; mina objekt klass- trycks in i listan

let container = document.getElementById("container"); //hämtar min div, från html:n för att lägga "klarlista" i min div
let listan = document.getElementById("listan"); //detta är min ul från html:n som jag hämtat - false
let klarLista = document.createElement("ul"); //nytt element skapat i js. rollas i loopen sedan - true
klarLista.id = "klarLista";
container.appendChild(klarLista); //containern är förälder, klarListan barnet. Berättar var den ska placeras- barnet alltså.

function visaUppdrag() {
  listan.innerHTML = "";
  klarLista.innerHTML = ""; //dessa två är för att inte loopas om för mycket, tömmer innehållet så att den bara en loopas en gång.. Ser innehållet från en loop menar jag.

  for (let i = 0; i < todo.length; i++) {
    //detta är min loop
    let animals = document.createElement("li"); //här i min loop har jag skapat en li-variabel. Är en lokal variabel

    animals.className = "flexar"; //gör en klass till animals/elementet som heter flexar.
    let spanTag = document.createElement("span"); //skapat ett span-element och döpt till spanTag.
    let deleteIcon = document.createElement("i"); //gör en variabel, deleteIcon, för ett nytt element av i/ett i-element
    deleteIcon.className = "bi bi-stars";

    if (todo[i].klar === true) {
      //om mitt objekt har "klar" "true"
      spanTag.innerHTML = todo[i].task; //så ska den prutta ut det som står i task

      klarLista.appendChild(animals); //säger åt klarlistan att lägga till ett barn som är min "li" dvs animals
      animals.appendChild(spanTag); // appendChild är vårt sätt att berätta för DOM att visa grejerna vart de ska ligga i DOM.
      animals.appendChild(deleteIcon); //lägger till min ikon från bootstrap, i animals
    }

    if (todo[i].klar === false) {
      //om mitt objekt har "klar" "false"
      spanTag.innerText = todo[i].task; //så ska den prutta ut det som står i task

      listan.appendChild(animals); //säger åt listan att lägga till ett barn som är min "li" dvs animals
      animals.appendChild(spanTag);
      animals.appendChild(deleteIcon); //lägger till min ikon från bootstrap, i animals
    }

    animals.addEventListener("click", () => {
      changeStatus(animals, todo[i]);
    }); //vi har gjort en addeventlistener som väntar/lyssnar på animals får ett klick där ett funktionsanrop påbörjas. Vill hämta variabler och position (i), från loopen så har vi gjort en anonym funktion.
    deleteIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteUppdrag(i);
    });
  }
}

function deleteUppdrag(item) {
  //delete-funktion. använder sig av i för att splica det objekt jag tar bort.
  todo = todo.filter((t) => t !== item);
  visaUppdrag(); //är min loop.
}

function changeStatus(liItemAnimals, listPositioni) {
  if (listPositioni.klar === true) {
    //om den har klar true så ska listpunkten flyttas från klar till inte klar
    listan.appendChild(liItemAnimals); //byter förälder så att säga, till listan från klarlista.
    listPositioni.klar = false; //byter boolean/värde från true till false.
  } else {
    klarLista.appendChild(liItemAnimals);
    listPositioni.klar = true;
  }
  visaUppdrag(); //är min loop.
}
visaUppdrag(); //är min loop.
