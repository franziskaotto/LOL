const selectElement = document.getElementById('all');
const mainElement = document.getElementById('country');
const populationBtn = document.getElementById('population');
const areaBtn = document.getElementById('area');
const previousBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
let visitedCountries = [];

//console.log(visitedCountries);

window.onload = loadEvent();

function loadEvent() {
    createCountryOptions();
    dropDownMenu();
    makePopButtonClickable();
    makeAreaBtnClickable();
    makePrevBtnClickable();
    makeNextBtnClickable();
}

function createCountryOptions() {

  const initialOption = document.createElement("option");
  initialOption.value = "";
  initialOption.textContent = "Select a country from the list";
  selectElement.appendChild(initialOption);

  //Hide buttons at init
  hideButtons();
  
  countries.forEach((country) => {
    const optionElement = document.createElement("option");
    optionElement.value = country["name"]["common"];
    optionElement.textContent = country["name"]["common"];
    selectElement.appendChild(optionElement);
  });
}

function hideButtons() {
  populationBtn.style.visibility= 'hidden';
  areaBtn.style.visibility = 'hidden';
  previousBtn.style.visibility = 'hidden';
  nextBtn.style.visibility = 'hidden'; 
}

function displayButtons() {
  populationBtn.style.visibility= 'visible';
  areaBtn.style.visibility = 'visible';
}

function displayDetails() {
  let country = getSelectedCountry();

  mainElement.innerHTML = null;

  let flag = document.createElement("img");
  flag.src = country["flags"]["png"];
  mainElement.appendChild(flag);

  let commonName = document.createElement("h1");
  commonName.innerHTML = country["name"]["common"];
  mainElement.appendChild(commonName);

  let region = document.createElement("h2");
  region.innerHTML = country["region"];
  mainElement.appendChild(region);

  let subregion = document.createElement("h3");
  subregion.innerHTML = country["subregion"];
  mainElement.appendChild(subregion);
}

function dropDownMenu() {

  selectElement.addEventListener("input", (e) => {
    //console.log(e.target.value);
    const selectedCountry = e.target.value;
    const country = countries.find((c) => c.name.common === selectedCountry);
    
    if (country) {
      
      displayDetails();

      //display buttons when country is selected
      displayButtons();
    } else {
      //Reset mainElement & hide buttons
      mainElement.innerHTML = null;       
      hideButtons();
    }

    //console.log(selectedCountry);
    visitedCountries.push(e.target.value);
    //Prev and next buttons are visible if conditions are true
    displayPrevAndNextBtn();
    
    //console.log(visitedCountries);
  })
}

//Get country through cca3 code to display neighbouring country with largest population
function getCountry(neighbour) {
  
  for (let country of countries) {
    if (country['cca3'] === neighbour) {
      return country;
    }
  }
}

function biggestPop(selectedCountry) {
  //1. array of neighbours
  //2. save temp with pop 0
  //3. if country biggest return
  //4. add EventListener to button

  let largestPopulation = 0;
  let largestNeighbour = null;
  // Check if 'borders' property exists and is an array
  //Check if neighbouringCountry is not undefined or null, else code doesn't execute
  if (Array.isArray(selectedCountry.borders) && selectedCountry.borders.length > 0) {
    for (let neighbourCode of selectedCountry.borders) {
      let neighbouringCountry = getCountry(neighbourCode);

      if (neighbouringCountry.population > largestPopulation) {
        largestPopulation = neighbouringCountry.population;
        largestNeighbour = neighbouringCountry;
      }
    }
  }
  return largestNeighbour;
} 

//Largest population button
function makePopButtonClickable() {
  
  populationBtn.addEventListener('click', () => { 
    //Clear page
    mainElement.innerHTML = null;  

    //console.log(getSelectedCountry());

    //Get selected country from dropdown menu
    let selectedCountry = getSelectedCountry();

    //Find largest neighbour for displayed country
    let largestNeighbour = biggestPop(selectedCountry);

    if (largestNeighbour) {
      mainElement.innerHTML = `The neighbouring country of ${selectElement.value} with the largest population is: <br> `

      //Selected country in dropdown menu changes to neighbour with larges pop
      selectElement.value = largestNeighbour.name.common;

      //Saved as visited
      visitedCountries.push(selectElement.value);

      let flag = document.createElement("img");
      flag.src = largestNeighbour["flags"]["png"];
      mainElement.appendChild(flag);

      let commonName = document.createElement("h1");
      commonName.innerHTML = largestNeighbour["name"]["common"];
      mainElement.appendChild(commonName);

      let region = document.createElement("h2");
      region.innerHTML = largestNeighbour["region"];
      mainElement.appendChild(region);

      let subregion = document.createElement("h3");
      subregion.innerHTML = largestNeighbour["subregion"];
      mainElement.appendChild(subregion); 
    } else {
      mainElement.innerHTML = 'No neighbouring country found.'
    }

    //Prev and next buttons are visible
    displayPrevAndNextBtn();
  })
}

function largestArea(selectedCountry) {
  let largestArea = 0;
  let neighbourWithLargestArea = null;

  if (Array.isArray(selectedCountry.borders) && selectedCountry.borders.length > 0) {
    for (let neighbourCode of selectedCountry.borders) {
      let neighbouringCountry = getCountry(neighbourCode);

      if (neighbouringCountry.area > largestArea) {
        largestArea = neighbouringCountry.area;
        neighbourWithLargestArea = neighbouringCountry;
      }
    }
  }
  return neighbourWithLargestArea;
}

 //Largest area button
function makeAreaBtnClickable() {

  areaBtn.addEventListener('click', () => {
      //Clear page
      mainElement.innerHTML = null;

      //Get selected country from dropdown menu
      let selectedCountry = getSelectedCountry();
      //console.log(largestArea(selectedCountry));
      let largestAreaNeighbour = largestArea(selectedCountry);

      //console.log(largestAreaNeighbour);

      if (largestAreaNeighbour) {
       // console.log('szia');
        mainElement.innerHTML = `The neighbouring country of ${selectElement.value} with the largest area is: <br> `

        //Selected country in dropdown menu changes to neighbour with largest area 
        selectElement.value = largestAreaNeighbour.name.common;
        //Saved as visited
        visitedCountries.push(selectElement.value);

        let flag = document.createElement("img");
        flag.src = largestAreaNeighbour["flags"]["png"];
        mainElement.appendChild(flag);

        let commonName = document.createElement("h1");
        commonName.innerHTML = largestAreaNeighbour["name"]["common"];
        mainElement.appendChild(commonName);

        let region = document.createElement("h2");
        region.innerHTML = largestAreaNeighbour["region"];
        mainElement.appendChild(region);

        let subregion = document.createElement("h3");
        subregion.innerHTML = largestAreaNeighbour["subregion"];
        mainElement.appendChild(subregion); 
      } else {
        mainElement.innerHTML = 'No neighbouring country found.'
      }

      //Prev and next buttons are visible
      displayPrevAndNextBtn();
    })
} 

//Get currently selected country from dropdown menu
function getSelectedCountry() {
    let selectedCountryName = selectElement.value;
    let selectedCountry = countries.find((c) => c.name.common === selectedCountryName);

    return selectedCountry;
}

//Previous and next buttons
//1. push selected country into empty array DONE
//2. PREV button: indexOf selected country -1
//    only displayed if array > 1 DONE
//3.NEXT button: indexoF selected country +1 
//    only displayed if array.length > 2 DONE
//4. largest pop & area pushed into array DONE
//5. add eventListeners

function displayPrevAndNextBtn() {
  if (visitedCountries.length > 2) {
    nextBtn.style.visibility = 'visible';
  } else {
    nextBtn.style.visibility = 'hidden';
  }

  if (visitedCountries.length > 1) {
    previousBtn.style.visibility = 'visible';
  } else {
    previousBtn.style.visibility = 'hidden';
  }
}

function findCurrentIndex () {
  let selectedCountry = getSelectedCountry();
  let currentIndex = visitedCountries.indexOf(selectedCountry['name']['common']);

  console.log(currentIndex);
  return currentIndex;
}

function makePrevBtnClickable() {
  previousBtn.addEventListener('click', () => {
    //find Index
    //i-1
    //display details
    let index = findCurrentIndex();

    if (index > 0) {
      //there are min. 2 elements in visitedCountries array
      index--;
      selectElement.value = visitedCountries[index];
      //console.log(selectElement.value);
      displayDetails();
    }
  }) 
}

function makeNextBtnClickable() {
  nextBtn.addEventListener('click', () => {
    let index = findCurrentIndex();

    if (index > 1) {
      index++;
      selectElement.value = visitedCountries[index];
      displayDetails();
    }
  })
}

console.log(visitedCountries);

//TODO hide next button if there is no next country: index === array.length-1 - check if current country is last element in array
