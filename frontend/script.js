
const LISTOFCOUNTRIES = countries; //connection through index.html

const loadEvent = function (){
  listAllCountries (LISTOFCOUNTRIES);
}

function listAllCountries (countriesArr){
  const selectionE = document.getElementById("all");
  const details = document.getElementById("country");

  selectionE.innerHTML = "<option>--Select a country from the list--</option>";
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
      
      
      if (typeof selectedCountry.subregion === "undefined"){
        details.insertAdjacentHTML("beforeend", element("h3", "There is no subregion listed."))
      } else {
        details.insertAdjacentHTML("beforeend", element("h3", selectedCountry.subregion))
      }

      if (typeof selectedCountry.capital === "undefined"){
        details.insertAdjacentHTML("beforeend", element("h4", "There is no capital listed."))
      } else {
      details.insertAdjacentHTML("beforeend", element("h4", selectedCountry.capital[0]))
      }

      listLargestPopulation(selectedCountry);
    }
  })
}

function listLargestPopulation (country){
  if (country.hasOwnProperty("borders")){ //if there are neighbouring countries, start the search
    let largest = getLargestNeighbour (country);
  }
  else  {
    console.log("Country has no neighbouring countries."); //later displayed on website
  }

}

//need to add event listener for button
function getLargestNeighbour (country){

  //need to check in the borders array every population if the population is the biggest

  //loop over borders array - done
  //take the fifa code to find the country in the country list - done
  //save the population in a temp variable
  //return country with the biggest population
  

  for (let neighbourCCA3 of country.borders){ //i get the cca3 of the borders array
    let neededCountry = findCountry(neighbourCCA3);
    let tempPopulation = 0;
    let largest;

    //console.log(neededCountry);
  }

}

function findCountry (cca3){
  for (let country of LISTOFCOUNTRIES){
    if (country.cca3 === cca3){ // i search with the given cca3 in the list of countries and return the needed country
      return country;
    }
  }
}

function element (tag, inner) {
  return `<${tag}>${inner}</${tag}>`;
}

window.addEventListener("load", loadEvent);