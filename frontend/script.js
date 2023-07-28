//countries for the list of countries from data.js!
let selectE;
let mainE;
let populationBtn;
let areaBtn;
let toolbar;
let previousBtn;
let nextBtn;

const loadEvent = function(){
  selectE = document.getElementById("all");
  mainE = document.getElementById('country');
  populationBtn = document.getElementById('population');
  areaBtn = document.getElementById('area');
  toolbar = document.getElementById('toolbar');
  createPreviousAndNextBtn();
  listCountries();
}

function listCountries(){
  const initialOption = document.createElement("option");
  initialOption.textContent = "--Select a country from the list--";
  selectE.appendChild(initialOption);
  hideButtons();
  fillSelection();

  selectE.addEventListener("input", (e) =>{
    const selectedCountry = countries.find(country => country.name.common === e.target.value);
    mainE.innerHTML = "";
    
    if (selectedCountry){
      fillPage(selectedCountry);
      showButtons();
    }

    populationAndAreaButton (selectedCountry)
    previousAndNextButton(selectedCountry);
  })
}

function fillSelection (){
  for (let country of countries){
    let option = document.createElement("option");
    option.textContent = country.name.common;
    selectE.appendChild(option);
  }
}

function fillPage (selectedCountry){
  mainE.innerHTML = "";

  mainE.insertAdjacentHTML("beforeend", flagElement(selectedCountry.flags.png));
  mainE.insertAdjacentHTML("beforeend", element("h1", selectedCountry.name.common));
  mainE.insertAdjacentHTML("beforeend", element("h2", selectedCountry.region));
  
  if (typeof selectedCountry.subregion === "undefined"){
    mainE.insertAdjacentHTML("beforeend", element("h3", "There is no subregion listed."));
  } else {
    mainE.insertAdjacentHTML("beforeend", element("h3", selectedCountry.subregion));
  }

  if (typeof selectedCountry.capital === "undefined"){
    mainE.insertAdjacentHTML("beforeend", element("h4", "There is no capital listed."));
  } else {
    mainE.insertAdjacentHTML("beforeend", element("h4", selectedCountry.capital[0]));
  }
}

function populationAndAreaButton (selectedCountry){
  populationBtn.addEventListener("click", () =>{
    let largestPopulation = listLargestPopulation(selectedCountry);
    selectE.innerHTML = `<option>${largestPopulation}</option>`;
    listCountries();
  })

  areaBtn.addEventListener("click", ()=>{
    let largestArea = listLargestArea(selectedCountry);
    selectE.innerHTML = `<option>${largestArea}</option>`;
    listCountries();
  })
}

function listLargestPopulation (selectedCountry){
  if (selectedCountry.hasOwnProperty("borders")){ //if there are neighbouring countries, start the search
    let largestNeighbour = getLargestNeighbourByPopulation (selectedCountry);
    fillPage(largestNeighbour);
    return largestNeighbour.name.common;
  }
  else  {
    mainE.innerHTML = "";
    mainE.insertAdjacentHTML("beforeend", element("h1", "Country has no neighbouring countries."));
  }
}

function getLargestNeighbourByPopulation (selectedCountry){
  for (let neighbourCCA3 of selectedCountry.borders){ //i get the cca3 of the borders array
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
  for (let country of countries){
    if (country.cca3 === cca3){ // i search with the given cca3 in the list of countries and return the needed country
      return country;
    }
  }
}

function listLargestArea(selectedCountry){
  if (selectedCountry.hasOwnProperty("borders")){ //if there are neighbouring countries, start the search
    let largestNeighbour = getLargestNeighbourByArea (selectedCountry);
    fillPage(largestNeighbour);
    return largestNeighbour.name.common;
  }
  else  {
    mainE.innerHTML = "";
    mainE.insertAdjacentHTML("beforeend", element("h1", "Country has no neighbouring countries."));
  }
}

function getLargestNeighbourByArea(selectedCountry){
  for (let neighbourCCA3 of selectedCountry.borders){ //i get the cca3 of the borders array
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

function createPreviousAndNextBtn(){
  previousBtn = document.createElement("button");
  previousBtn.innerText = "Previous country";
  previousBtn.setAttribute("id", "prev")

  nextBtn = document.createElement("button");
  nextBtn.innerText = "Next country";
  nextBtn.setAttribute("id", "next")

  toolbar.appendChild(previousBtn);
  toolbar.appendChild(nextBtn);
}

function previousAndNextButton(selectedCountry){
  let index = countries.indexOf(selectedCountry);

  previousBtn.addEventListener("click", ()=>{
    fillPage(countries[index-1]);
    selectE.innerHTML = `<option>${countries[index-1].name.common}</option>`;
    fillSelection();
    index --;
    nextBtn.style.visibility = "visible";
  })

  nextBtn.addEventListener("click", ()=> {
    fillPage(countries[index+1]);
    selectE.innerHTML = `<option>${countries[index+1].name.common}</option>`;
    fillSelection();
    index ++;
  })
}

//mini functions
function hideButtons(){
  populationBtn.style.visibility = "hidden";
  areaBtn.style.visibility = "hidden";
  previousBtn.style.visibility = "hidden";
  nextBtn.style.visibility = "hidden";
}

function showButtons(){
  populationBtn.style.visibility = "visible";
  areaBtn.style.visibility = "visible";
  previousBtn.style.visibility = "visible";
  
}

function element (tag, inner) {
  return `<${tag}>${inner}</${tag}>`;
}

function flagElement(link) {
  return `<img src=${link}>`;
}

window.addEventListener("load", loadEvent);

