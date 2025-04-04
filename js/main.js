let jmeno,
  prijmeni,
  tabulkaObjednavek,
  produkt,
  varianta,
  celyNazevProduktu,
  pocetKusu,
  cenaZaKus,
  cenaCelkem,
  objednavka,
  ulozitBtn;

let kosik = [];

// Jméno a příjmení z inputů na fakturu
jmeno = document.getElementById("jmeno");
prijmeni = document.getElementById("prijmeni");
jmeno.addEventListener("input", function () {
  document.getElementById("jmenoZakaznika").textContent = this.value;
});
prijmeni.addEventListener("input", function () {
  document.getElementById("prijmeniZakaznika").textContent = this.value;
});

function pridejDoObjednavky(variantaVstupu) {
  tabulkaObjednavek = document.getElementById("tabulkaObjednavek");
  zpravaVTabulce = document.getElementById("zpravaVTabulce");

  // Dvě varianty vkládání produktu do objednávky
  if (variantaVstupu == 1) {
    produkt = document.getElementById("produkt");
    let nazevProduktu = produkt.options[produkt.value].text; //Text z vybraného option

    varianta = document.getElementById("varianta");
    let variantaProduktu = varianta.options[varianta.value].text; //Text z vybraného option

    celyNazevProduktu = nazevProduktu + " " + variantaProduktu;
  } else if (variantaVstupu == 2) {
    celyNazevProduktu = document.getElementById("vlastniNazevProduktu").value;
  }

  pocetKusu = document.getElementById("pocetKusu").value;
  cenaZaKus = document.getElementById("cenaZaKus").value;
  cenaCelkem = cenaZaKus * pocetKusu;

  objednavka = document.createElement("tr");
  objednavka.innerHTML = `<td>${celyNazevProduktu}</td>
                          <td>${pocetKusu}</td>
                          <td>${cenaZaKus} kč</td>
                          <td>${cenaCelkem} kč</td>`;

  let polozkaDoKosiku = {};
  polozkaDoKosiku.nazev = celyNazevProduktu;
  polozkaDoKosiku.pocetKusu = pocetKusu;
  polozkaDoKosiku.cenaZaKus = cenaZaKus;
  polozkaDoKosiku.cenaCelkem = cenaCelkem;

  kosik.push(polozkaDoKosiku);

  zobrazit(tabulkaObjednavek);
  skryt(zpravaVTabulce);
  tabulkaObjednavek.appendChild(objednavka);
}

async function generujRekapitulaciObjednavky() {
  vytvorSelectNabidkuMen();
  let ciziMenaSelect = document.getElementById("vyberMenySelect");
  let ciziMenaVybrana = ciziMenaSelect.options[ciziMenaSelect.value];
  let kurzCiziMeny = 1;
  let zkratkaCiziMeny = "kč";

  if (ciziMenaVybrana) {
    kurzCiziMeny = ciziMenaVybrana.getAttribute("kurz");
    zkratkaCiziMeny = ciziMenaVybrana.getAttribute("zkratka");
  }

  let rekapitulaceTabukla = document.getElementById("rekapitulaceTabulka");
  rekapitulaceTabukla.innerHTML = `<tr>
                  <th scope="col">Název produktu</th>
                  <th scope="col">počet ks</th>
                  <th scope="col">CZK/ks</th>
                  <th scope="col">CZK celkem</th>
                  <th scope="col">CZK s DPH</th>
                  <th scope="col">cizí měna</th>
                </tr>`;

  for (let polozka of kosik) {
    let tr = document.createElement("tr");
    tr.innerHTML = `<td scope="row">${polozka.nazev}</td>
    <td>${polozka.pocetKusu}</td>
                    <td>${polozka.cenaZaKus} kč</td>
                    <td>${polozka.cenaCelkem} kč</td>
                    <td>${(polozka.cenaCelkem * 1.21).toFixed(2)} kč</td>
                    <td>${(polozka.cenaCelkem / kurzCiziMeny).toFixed(
                      2
                    )} ${zkratkaCiziMeny}</td>`;
    rekapitulaceTabukla.appendChild(tr);
  }

  if (kosik.length > 0) {
    let cenaVsechPolozek = kosik.reduce(
      (acc, item) => acc + item.cenaCelkem,
      0
    );
    let tr = document.createElement("tr");
    tr.innerHTML = `<td colspan=2></td>
                    <td><b>Celkem:</b></td>
                    <td><b>${cenaVsechPolozek} kč</b></td>
                    <td><b>${(cenaVsechPolozek * 1.21).toFixed(2)} kč</b></td>
                    <td><b>${(cenaVsechPolozek / kurzCiziMeny).toFixed(
                      2
                    )} ${zkratkaCiziMeny}</b></td>`;
    rekapitulaceTabukla.appendChild(tr);
  }
}

let ciziMenaSelect = document.getElementById("vyberMenySelect");
ciziMenaSelect.addEventListener("change", generujRekapitulaciObjednavky);

// Aktivace BS tooltips - pomohl mi ChatGPT
document.addEventListener("DOMContentLoaded", function () {
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
});
