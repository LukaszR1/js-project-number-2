const button = document.getElementById("currency-button");
const input = document.getElementById("currencies-input");
const select = document.getElementById("select-currencies");
const counter = document.getElementById("currency-converter");
const total = document.getElementById("calculate-result");
const errorMessage = document.getElementById("error-message");
const loader = document.getElementById("loader");

let currencies = "EUR";

select.addEventListener("change", (event) => {
  currencies = event.target.value;
});
button.addEventListener("click", fetchData);

function loaderStart() {
  loader.classList.add("display");
  setTimeout(() => {
    loader.classList.remove("display");
  }, 5000);
}
function loaderEnd() {
  loader.classList.remove("display");
}

function fetchData() {
  total.innerHTML = "";
  if (input.value <= 0 || input.value === "") {
    errorMessage.innerHTML = "wpisz kwotę wyższą od zera";
  } else if (select.value === "Wybierz walutę") {
    errorMessage.innerHTML = "wybierz walutę";
  } else {
    loaderStart();
    fetch(`https://api.nbp.pl/api/exchangerates/rates/A/${currencies}/`)
      .then((response) => response.json())
      .then((data) => {
        const getcurrency = data.rates[0].mid;
        total.innerHTML = `${(getcurrency * input.value).toFixed(2)} ${"PLN"}`;
        input.value = "";
        select.value = "Wybierz walutę";
        errorMessage.innerHTML = "";
      })
      .catch((error) => console.log(error))
      .finally(() => loaderEnd());
  }
}
