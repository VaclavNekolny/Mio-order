let jmeno,
  prijmeni,
  tabulkaObjednavek,
  produkt,
  varianta,
  pocetKusu,
  cenaZaKus,
  cenaCelkem,
  objednavka,
  ulozitBtn;

let polozky = [];
let polozka = {
  nazev: `krtečkovy kalhotky`,
  cena: 500,
  pocet: 1,
  cenaCelkem: 500,
};
polozky.push(polozka);
polozka = {
  nazev: `moje džíny`,
  cena: 100,
  pocet: 1,
  cenaCelkem: 100,
};
polozky.push(polozka);


function pridejDoObjednavky() {
  jmeno = document.getElementById("jmeno").value.trim();
  prijmeni = document.getElementById("prijmeni").value.trim();
  tabulkaObjednavek = document.getElementById("tabulkaObjednavek");
  zpravaVTabulce = document.getElementById("zpravaVTabulce");

  produkt = document.getElementById("produkt");
  let nazevProduktu = produkt.options[produkt.value].text; //Text z vybraného option

  varianta = document.getElementById("varianta");
  let variantaProduktu = varianta.options[varianta.value].text; //Text z vybraného option

  pocetKusu = document.getElementById("pocetKusu").value;
  cenaZaKus = document.getElementById("cenaZaKus").value;
  ulozitBtn = document.getElementById("ulozitBtn");

  cenaCelkem = cenaZaKus * pocetKusu;

  objednavka = document.createElement("tr");
  objednavka.innerHTML = `<td>${nazevProduktu} ${variantaProduktu}</td>
                          <td>${pocetKusu}</td>
                          <td>${cenaZaKus} kč</td>
                          <td>${cenaCelkem} kč</td>`;

  zobrazit(tabulkaObjednavek);
  skryt(zpravaVTabulce);
  skryt(vlastniVyberProduktu);
  skryt(vyberProduktu);
  tabulkaObjednavek.appendChild(objednavka);
}

let vyberProduktu = document.getElementById("vyberProduktu");
let vlastniVyberProduktu = document.getElementById("vlastniVyberProduktu");

function novyProdukt() {
  zobrazit(vyberProduktu);
  skryt(vlastniVyberProduktu);
}
function novyVlastniProdukt() {
  zobrazit(vlastniVyberProduktu);
  skryt(vyberProduktu);
}

// Pomocné funkce pro zobrazení a skrytí prvků
function zobrazit(prvek) {
  prvek.classList.remove("d-none");
}
function skryt(prvek) {
  prvek.classList.add("d-none");
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
