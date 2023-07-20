const LISTOFCOUNTRIES = countries; //connection through index.html

const loadEvent = function (){
  listAllCountries (LISTOFCOUNTRIES);
}

function listAllCountries (countriesArr){
  const selectionE = document.getElementById("all");
  const detailsE = document.getElementById("country");
  const populationBtn = document.getElementById("population");
  const areaBtn = document.getElementById("area");

  populationBtn.style.display = "none"; //don't know if that is allowed??
  areaBtn.style.display = "none";

  selectionE.innerHTML = "<option>--Select a country from the list--</option>";
  fillSelection(countriesArr, selectionE);

  selectionE.addEventListener("input", (e) =>{
    const selectedCountry = countriesArr.find(country => country.name.common === e.target.value);
    detailsE.innerHTML = "";

    if (selectedCountry){
      fillPage(selectedCountry, detailsE);
      populationBtn.style.display = "inline";
      areaBtn.style.display = "inline";
    }
    
    populationBtn.addEventListener("click", (e) =>{
      let largestPopulation = listLargestPopulation(selectedCountry, detailsE);
      selectionE.innerHTML = `<option>${largestPopulation}</option>`;
      listAllCountries (LISTOFCOUNTRIES)
    })

    areaBtn.addEventListener("click", (e)=>{
      let largestArea = listLargestArea(selectedCountry, detailsE);
      selectionE.innerHTML = `<option>${largestArea}</option>`;
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

function flagElement(link) {
  return `<img src=${link}>`;
}

function fillPage (selectedCountry, detailsE){
  detailsE.innerHTML = "";

  detailsE.insertAdjacentHTML("beforeend", flagElement(selectedCountry.flags.png));
  detailsE.insertAdjacentHTML("beforeend", element("h1", selectedCountry.name.common));
  detailsE.insertAdjacentHTML("beforeend", element("h2", selectedCountry.region));
  
  if (typeof selectedCountry.subregion === "undefined"){
    detailsE.insertAdjacentHTML("beforeend", element("h3", "There is no subregion listed."));
  } else {
    detailsE.insertAdjacentHTML("beforeend", element("h3", selectedCountry.subregion));
  }

  if (typeof selectedCountry.capital === "undefined"){
    detailsE.insertAdjacentHTML("beforeend", element("h4", "There is no capital listed."));
  } else {
    detailsE.insertAdjacentHTML("beforeend", element("h4", selectedCountry.capital[0]));
  }
}

function listLargestPopulation (country, detailsE){
  if (country.hasOwnProperty("borders")){ //if there are neighbouring countries, start the search
    let largestNeighbour = getLargestNeighbourByPopulation (country);
    fillPage(largestNeighbour, detailsE);
    return largestNeighbour.name.common;
  }
  else  {
    detailsE.innerHTML = "";
    detailsE.insertAdjacentHTML("beforeend", element("h1", "Country has no neighbouring countries."));
  }
}

function getLargestNeighbourByPopulation (country){
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

function listLargestArea(country, detailsE){
  if (country.hasOwnProperty("borders")){ //if there are neighbouring countries, start the search
    let largestNeighbour = getLargestNeighbourByArea (country);
    fillPage(largestNeighbour, detailsE);
    return largestNeighbour.name.common;
  }
  else  {
    detailsE.innerHTML = "";
    detailsE.insertAdjacentHTML("beforeend", element("h1", "Country has no neighbouring countries."));
  }
}

function getLargestNeighbourByArea(country){
  for (let neighbourCCA3 of country.borders){ //i get the cca3 of the borders array
    let neededCountry = findCountry(neighbourCCA3);
    let tempArea = neededCountry.area;
    let largestNeighbour = neededCountry;
    
    if (tempArea < neededCountry.area){
      largestNeighbour = neededCountry;
      tempPopulation = neededCountry.area;
    }
    return largestNeighbour;
  }
}



window.addEventListener("load", loadEvent);