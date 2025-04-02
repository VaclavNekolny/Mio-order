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
