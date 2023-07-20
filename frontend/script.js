
const LISTOFCOUNTRIES = countries; //connection through index.html

const loadEvent = function (){
  listAllCountries (LISTOFCOUNTRIES);
}

function listAllCountries (countriesArr){
  const selectionE = document.getElementById("all");
  const detailsE = document.getElementById("country");
  const populationBtn = document.getElementById("population");
  populationBtn.style.display = "none";

  selectionE.innerHTML = "<option>--Select a country from the list--</option>";
  fillSelection(countriesArr, selectionE);

  selectionE.addEventListener("input", (e) =>{
    const selectedCountry = countriesArr.find(country => country.name.common === e.target.value);
    detailsE.innerHTML = "";

    if (selectedCountry){
      fillPage(selectedCountry, detailsE);
      populationBtn.style.display = "inline";
    }
    //need to add event listener for button
    populationBtn.addEventListener("click", (e) =>{
      let largestCountry = listLargestPopulation(selectedCountry, detailsE);
      selectionE.innerHTML = `<option>${largestCountry}</option>`;
      listAllCountries (LISTOFCOUNTRIES)
    })
  })
}

function fillSelection (countriesArr, selectionE){
  for (let country of countriesArr){
    selectionE.insertAdjacentHTML("beforeend", element("option", country.name.common));
  }
}

function element (tag, inner) {
  return `<${tag}>${inner}</${tag}>`;
}

function fillPage (selectedCountry, detailsE){
  detailsE.innerHTML = "";
  detailsE.insertAdjacentHTML("beforeend", element("img", selectedCountry.flag)) //flag needs some worky work
  detailsE.insertAdjacentHTML("beforeend", element("h1", selectedCountry.name.common))
  detailsE.insertAdjacentHTML("beforeend", element("h2", selectedCountry.region))
  
  if (typeof selectedCountry.subregion === "undefined"){
    detailsE.insertAdjacentHTML("beforeend", element("h3", "There is no subregion listed."))
  } else {
    detailsE.insertAdjacentHTML("beforeend", element("h3", selectedCountry.subregion))
  }

  if (typeof selectedCountry.capital === "undefined"){
    detailsE.insertAdjacentHTML("beforeend", element("h4", "There is no capital listed."))
  } else {
    detailsE.insertAdjacentHTML("beforeend", element("h4", selectedCountry.capital[0]))
  }
}

function listLargestPopulation (country, detailsE){
  if (country.hasOwnProperty("borders")){ //if there are neighbouring countries, start the search
    let largestNeighbour = getLargestNeighbour (country);
    fillPage(largestNeighbour, detailsE);
    return largestNeighbour.name.common;
  }
  else  {
    detailsE.innerHTML = "";
    detailsE.insertAdjacentHTML("beforeend", element("h1", "Country has no neighbouring countries."));
  }
}

function getLargestNeighbour (country){
  for (let neighbourCCA3 of country.borders){ //i get the cca3 of the borders array
    let neededCountry = findCountry(neighbourCCA3);
    let tempPopulation = neededCountry.population;
    let largestNeighbour = neededCountry;
    
    if (tempPopulation < neededCountry.population){
      largestNeighbour = neededCountry;
      tempPopulation = neededCountry.population
    }
    return largestNeighbour;
  }
}

function findCountry (cca3){
  for (let country of LISTOFCOUNTRIES){
    if (country.cca3 === cca3){ // i search with the given cca3 in the list of countries and return the needed country
      return country;
    }
  }
}





window.addEventListener("load", loadEvent);