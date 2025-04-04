let tabulkaObjednavek = document.getElementById("tabulkaObjednavek");
let zpravaVTabulce = document.getElementById("zpravaVTabulce");

// Array s položkami objednávky
let kosik = [];

// Vytvoří SELECT nabídku měn v rekapitulaci objednávky
vytvorSelectNabidkuMen();

// Vypíše jménao a příjmení z formuláře na objednávku
let jmeno = document.getElementById("jmeno");
let prijmeni = document.getElementById("prijmeni");
jmeno.addEventListener("input", function () {
  document.getElementById("jmenoZakaznika").textContent = this.value;
});
prijmeni.addEventListener("input", function () {
  document.getElementById("prijmeniZakaznika").textContent = this.value;
});

function validujAPridejDoObjednavky(variantaVstupu) {
  let celyNazev;

  // Výběr ze dvou variant vkládání produktu
  if (variantaVstupu == 1) {
    let produkt = document.getElementById("produkt");
    let nazevProduktu = produkt.options[produkt.value].text; //Text z vybraného option

    let varianta = document.getElementById("varianta");
    let variantaProduktu = varianta.options[varianta.value].text; //Text z vybraného option
    celyNazev = nazevProduktu + " " + variantaProduktu;
  } else if (variantaVstupu == 2) {
    celyNazev = document.getElementById("vlastniNazevProduktu").value;
  }

  let pocetKusu = document.getElementById("pocetKusu").value;
  let cenaZaKus = document.getElementById("cenaZaKus").value;

  // Validace vstupů při vkládání produktu
  if (variantaVstupu == 1) {
    if (produkt.value == 0) {
      alert("Vyberte prosím produkt");
    } else if (varianta.value == 0) {
      alert("Vyberte prosím variantu produktu");
    } else if (pocetKusu <= 0) {
      alert("Počet kusů musí být alespoň 1");
    } else if (cenaZaKus <= 0) {
      alert("Cena musí být alespoň 1kč");
    } else {
      pridejDoObjednavky(celyNazev, pocetKusu, cenaZaKus);
    }
  } else {
    if (celyNazev.length < 3) {
      alert("Celý vlastní název musí mít alespoň 3 znaky");
    } else if (pocetKusu <= 0) {
      alert("Počet kusů musí být alespoň 1");
    } else if (cenaZaKus <= 0) {
      alert("Cena musí být alespoň 1kč");
    } else {
      pridejDoObjednavky(celyNazev, pocetKusu, cenaZaKus);
    }
  }
}

// Přidá položku do objednávky
function pridejDoObjednavky(nazev, pocetKusu, cenaZaKus) {
  zobrazitVyberProduktu(0); //skryje formulář pro zadání produktu

  let cenaCelkem = cenaZaKus * pocetKusu;

  // Přidání položky to HTML tabulky
  let objednavka = document.createElement("tr");
  objednavka.innerHTML = `<td>${nazev}</td>
                          <td>${pocetKusu}</td>
                          <td>${cenaZaKus} kč</td>
                          <td>${cenaCelkem} kč</td>`;
  tabulkaObjednavek.querySelector("tbody").appendChild(objednavka);

  // Přidání položky do košíku ARRAY
  let polozkaDoKosiku = {};
  polozkaDoKosiku.nazev = nazev;
  polozkaDoKosiku.pocetKusu = pocetKusu;
  polozkaDoKosiku.cenaZaKus = cenaZaKus;
  polozkaDoKosiku.cenaCelkem = cenaCelkem;
  kosik.push(polozkaDoKosiku);

  zobrazit(tabulkaObjednavek);
  skryt(zpravaVTabulce);
}

async function generujRekapitulaciObjednavky() {
  let ciziMenaSelect = document.getElementById("vyberMenySelect");
  let ciziMenaVybrana = ciziMenaSelect.options[ciziMenaSelect.value];
  let kurzCiziMeny;
  let zkratkaCiziMeny;

  if (ciziMenaVybrana) {
    kurzCiziMeny = ciziMenaVybrana.getAttribute("kurz");
    zkratkaCiziMeny = ciziMenaVybrana.getAttribute("zkratka");
  }

  let rekapitulaceTabukla = document.getElementById("rekapitulaceTabulka");
  zobrazit(rekapitulaceTabukla);

  rekapitulaceTabukla.querySelector("tbody").innerHTML = "";
  for (let polozka of kosik) {
    let tr = document.createElement("tr");
    tr.innerHTML = `<td scope="row">${polozka.nazev}</td>
                    <td>${polozka.pocetKusu}</td>
                    <td>${polozka.cenaZaKus} kč</td>
                    <td>${polozka.cenaCelkem} kč</td>
                    <td>${(polozka.cenaCelkem * 1.21).toFixed(2)} kč</td>
                    <td>${vypisCiziMenu(
                      polozka.cenaCelkem,
                      kurzCiziMeny,
                      zkratkaCiziMeny
                    )}</td>`;
    rekapitulaceTabukla.querySelector("tbody").appendChild(tr);
  }

  // Patička tabulky -> cena za všechny položky
  if (kosik.length > 0) {
    let cenaVsechPolozek = kosik.reduce(
      (acc, item) => acc + item.cenaCelkem,
      0
    );
    let tr = document.createElement("tr");
    tr.innerHTML = `<td colspan=2 class="bg-light"></td>
                    <td class="bg-light"><b>Celkem:</b></td>
                    <td class="bg-light"><b>${cenaVsechPolozek} kč</b></td>
                    <td class="bg-light"><b>${(cenaVsechPolozek * 1.21).toFixed(
                      2
                    )} kč</b></td>
                    <td class="bg-light"><b>${vypisCiziMenu(
                      cenaVsechPolozek,
                      kurzCiziMeny,
                      zkratkaCiziMeny
                    )}</b></td>`;
    rekapitulaceTabukla.querySelector("tbody").appendChild(tr);
  }
}

let ciziMenaSelect = document.getElementById("vyberMenySelect");
ciziMenaSelect.addEventListener("change", generujRekapitulaciObjednavky);

// Vrátí (str) výpočet cizí měny a její zkratku
function vypisCiziMenu(cena, kurz, zkratkaCiziMeny) {
  if (kurz) {
    return `${(cena / kurz).toFixed(2)} ${zkratkaCiziMeny}`;
  }
  return "--";
}

// Aktivace BS tooltips - pomohl mi ChatGPT
document.addEventListener("DOMContentLoaded", function () {
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
});
