const LISTOFCOUNTRIES = countries; //connection through index.html

const loadEvent = function (){
  listAllCountries (LISTOFCOUNTRIES);
}

function listAllCountries (countriesArr){
  const selectionE = document.getElementById("all");
  const details = document.getElementById("country");

  for (let country of countriesArr){
    selectionE.insertAdjacentHTML("beforeend", element("option", country.name.common));
  }

  selectionE.addEventListener("input", (e) =>{
    const selectedCountry = countriesArr.find(country => country.name.common === e.target.value);
    details.innerHTML = "";

    if (selectedCountry){
      details.insertAdjacentHTML("beforeend", element("img", selectedCountry.flag))
      details.insertAdjacentHTML("beforeend", element("h1", selectedCountry.name.common))
      details.insertAdjacentHTML("beforeend", element("h2", selectedCountry.region))
      details.insertAdjacentHTML("beforeend", element("h3", selectedCountry.subregion))

      if (selectedCountry.capital.length === 1){
        details.insertAdjacentHTML("beforeend", element("h4", selectedCountry.capital[0]))
      }
      else { //Antarctia has issues --> is empty
        details.insertAdjacentHTML("beforeend", element("h4", "There is no capital listed."))
      }
    }
  })
}

function element (tag, inner) {
  return `<${tag}>${inner}</${tag}>`;
}

window.addEventListener("load", loadEvent);