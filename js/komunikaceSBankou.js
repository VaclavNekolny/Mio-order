// function vratDnesVUrlFormatu() {
//   let datum = new Date();
//   let datumUrl =
//     String(datum.getFullYear()) +
//     String(datum.getMonth()).padStart(2, "0") +
//     String(datum.getDay()).padStart(2, "0");
//   return datumUrl;
// }

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

async function vratfiltrovanaData() {
  data = await vratKurzovniListekJSON();

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

async function main() {
  let cistaData = await vratfiltrovanaData();
  let menaText = "";
  for (mena in cistaData) {
    // menaText = `<td>${mena.zkratka}</td><td>${mena.nazev}</td><td>${mena.kurz}</td>`;
  }
  console.log(cistaData);
}

main();
