function nactiDataZBanky(url) {
  let seznam_div = document.getElementById("poke-seznam");
  seznam_div.innerHTML = "<ul id='poke-seznam-ul'></ul>";
  let seznam_ul = document.getElementById("poke-seznam-ul");

  stahniJSON(url, (data) => {
    for (let pokemon of data.results) {
      let novaPolozka = document.createElement("li");
      novaPolozka.innerText = pokemon.name;
      seznam_ul.appendChild(novaPolozka);
      let poke_url = pokemon.url;
      novaPolozka.addEventListener("click", () => nactiPokemona(poke_url));
    }
  });
}

function vratDnesniDatumUrl() {
  let datum = new Date();
  let datumUrl =
    String(datum.getFullYear()) +
    String(datum.getMonth()).padStart(2, "0") +
    String(datum.getDay()).padStart(2, "0");
  return datumUrl;
}

function vratKurzovniListekJSON() {
  let listek;
  let mujRequest = new XMLHttpRequest();
  mujRequest.open("GET", "https://data.kurzy.cz/json/meny/b[6].json");
  mujRequest.onload = function () {
    if (mujRequest.status >= 200 && mujRequest.status < 400) {
      let data = JSON.parse(mujRequest.responseText);
      listek = filtrujData(data);
    } else {
      alert("Chyba při načítání dat z ČNB");
    }
  };
  mujRequest.send();
}
console.log(vratKurzovniListekJSON());


function filtrujData(data) {
  let filtrovanaMena;
  let cistaData = [];

  for (mena in data.kurzy) {
    filtrovanaMena = {};
    filtrovanaMena.zkratka = mena;
    filtrovanaMena.nazev = data.kurzy[mena].nazev;
    filtrovanaMena.kurz =
      data.kurzy[mena].dev_stred / data.kurzy[mena].jednotka;
    cistaData.push(filtrovanaMena);
  }
  return cistaData;
}
