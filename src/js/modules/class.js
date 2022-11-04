export class Djur {
  //skapar en klass (mall) som heter djur. Klassnamn börjar med stor bokstav//
  constructor(uppdrag, klar, art) {
    //konstruktor
    this.task = uppdrag; //behöver inte ändra task. högersida refererar uppåt.
    this.klar = klar; //ändrar båda här bara för att visa mig själv att det också går.
    this.art = art;
  }
}
