function zobrazitVyberProduktu(varianta) {
  let vyberProduktu = document.getElementById("vyberProduktu");
  if (varianta == 1) {
    vyberProduktu.innerHTML = varianta1;
  } else if (varianta == 2) {
    vyberProduktu.innerHTML = varianta2;
  } else {
    vyberProduktu.innerHTML = "";
  }
}

const varianta1 = `<div class="col-12 col-md-7">
<div class="row g-2">
  <div class="col-6">
    <select
      class="form-select"
      id="produkt"
      aria-placeholder="Vyberte variantu"
    >
      <option selected value="0">Vyberte produkt</option>
      <option value="1">Kalhoty</option>
      <option value="2">Ponožky</option>
      <option value="3">Tričko</option>
      <option value="4">Boty</option>
      <option value="5">Rukavice</option>
    </select>
  </div>
  <div class="col-6">
    <select class="form-select" id="varianta">
      <option selected value="0">Vyberte variantu</option>
      <option value="1">zelené</option>
      <option value="2">modré</option>
      <option value="3">červené</option>
      <option value="4">bavlněné</option>
      <option value="5">kouzelné</option>
    </select>
  </div>
</div>
</div>
<div class="col-4 col-md-2">
<input
  type="number"
  class="form-control"
  placeholder="Počet kusů"
  id="pocetKusu"
/>
</div>
<div class="col-4 col-md-2">
<input
  type="number"
  class="form-control"
  placeholder="Cena/ks"
  id="cenaZaKus"
/>
</div>
<div class="col-1">
<a
  data-bs-toggle="tooltip"
  data-bs-placement="bottom"
  data-bs-custom-class="custom-tooltip"
  data-bs-title="Přidat do objednávky"
  class="link-success p-2"
  href="#ulozit"
  onclick="pridejDoObjednavky()"
  id="ulozitBtn"
>
<i class="bi-floppy fs-2"></i>
</a>
</div>`;

const varianta2 = `<div class="col-12 col-md-7">
            <input
              class="form-control"
              type="text"
              placeholder="Zadejte vlastní název produktu"
            />
          </div>
          <div class="col-4 col-md-2">
            <input
              type="number"
              class="form-control"
              placeholder="Počet kusů"
              id="pocetKusu"
            />
          </div>
          <div class="col-4 col-md-2">
            <input
              type="number"
              class="form-control"
              placeholder="Cena/ks"
              id="cenaZaKus"
            />
          </div>
          <div class="col-1">
            <a
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              data-bs-custom-class="custom-tooltip"
              data-bs-title="Přidat do objednávky"
              class="link-success p-2"
              href="#ulozit"
              onclick="pridejDoObjednavky()"
              id="ulozitBtn"
            >
              <i class="bi bi-floppy fs-2"></i>
            </a>
          </div>`;
