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

  zobrazit(tabulkaObjednavek);
  skryt(zpravaVTabulce);
  tabulkaObjednavek.appendChild(objednavka);
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
