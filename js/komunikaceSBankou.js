function vratKurzovniListekJSON() {
  return new Promise((resolve, reject) => {
    let mujRequest = new XMLHttpRequest();
    mujRequest.open("GET", "https://data.kurzy.cz/json/meny/b[6].json");

    mujRequest.onload = function () {
      if (mujRequest.status >= 200 && mujRequest.status < 400) {
        resolve(JSON.parse(mujRequest.responseText));
      } else {
        reject("Chyba při načítání dat z ČNB");
      }
    };
    mujRequest.send();
  });
}

// vytáhne z kompletního JSONu jen potřebná data (Zkratku měny, název, poměr)
async function vratCistaData() {
  data = await vratKurzovniListekJSON();

  let vyfiltrovanaMena;
  let cistaData = [];

  for (mena in data.kurzy) {
    vyfiltrovanaMena = {};
    vyfiltrovanaMena.zkratka = mena;
    vyfiltrovanaMena.nazev = data.kurzy[mena].nazev;
    // přepočítá inflační měny s jinou jednotkou než 1
    vyfiltrovanaMena.kurz =
      data.kurzy[mena].dev_stred / data.kurzy[mena].jednotka;
    cistaData.push(vyfiltrovanaMena);
  }
  return cistaData; // př. [{ zkratka: "USD", nazev: "Americký dolar", kurz: 23.106 }]
}

async function vytvorSelectNabidkuMen() {
  vyberMenySelect = document.getElementById("vyberMenySelect");

  let cistaData = await vratCistaData(); // čtení dat z API
  // let cistaData = testovaciData; // čtení dat z testovací proměnné

  for (let i = 1; i < cistaData.length; i++) {
    let selectMena = document.createElement("option");
    selectMena.innerText = `${cistaData[i].zkratka} - ${cistaData[i].nazev}`;
    selectMena.value = i;
    selectMena.setAttribute("kurz", cistaData[i].kurz);
    selectMena.setAttribute("zkratka", cistaData[i].zkratka);
    vyberMenySelect.appendChild(selectMena);
  }
}

// TESTOVACÍ DATA -> slouží k tomu, aby se nevyčerpal limit dotazů na API při testování
testovaciData = [
  { zkratka: "IDR", nazev: "Indonéská rupie", kurz: 0.001395 },
  { zkratka: "ILS", nazev: "Izraelský šekel", kurz: 6.244 },
  { zkratka: "JPY", nazev: "Japonský jen", kurz: 0.15477 },
  { zkratka: "CAD", nazev: "Kanadský dolar", kurz: 16.127 },
  { zkratka: "HUF", nazev: "Maďarský forint", kurz: 0.06223 },
  { zkratka: "MXN", nazev: "Mexické peso", kurz: 1.135 },
  { zkratka: "NOK", nazev: "Norská koruna", kurz: 2.212 },
  { zkratka: "USD", nazev: "Americký dolar", kurz: 23.106 },
];
