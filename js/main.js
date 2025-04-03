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

// Jméno a příjmení z inputů na fakturu
jmeno = document.getElementById("jmeno");
prijmeni = document.getElementById("prijmeni");
jmeno.addEventListener("input", function () {
  document.getElementById("jmenoZakaznika").textContent = this.value;
});
prijmeni.addEventListener("input", function () {
  document.getElementById("prijmeniZakaznika").textContent = this.value;
});

function pridejDoObjednavky() {
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

// Aktivace BS tooltips - pomohl mi ChatGPT
document.addEventListener("DOMContentLoaded", function () {
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
});
