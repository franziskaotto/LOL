const LISTOFCOUNTRIES = countries; //connection through index.html

const loadEvent = function (){
  listAllCountries (LISTOFCOUNTRIES);
}

function listAllCountries (countriesArr){
  const selectionE = document.getElementById("all");

  for (let country of countriesArr){
    selectionE.insertAdjacentHTML("beforeend", element("option", country.name.common));
  }

  
}

function element (tag, inner) {
  return `<${tag}>${inner}</${tag}>`;
}

window.addEventListener("load", loadEvent);