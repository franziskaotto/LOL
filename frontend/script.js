//TODO get rid of global variables 

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
    createTransDropDown();
    selectLang();
}

function createCountryOptions() {

  const initialOption = document.createElement("option");
  initialOption.value = "";
  initialOption.textContent = "Select a country from the list";
  mainElement.innerHTML = initialOption.textContent;
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
  if (country) {
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

  //Add languages as options elements to translation dropdown
  createLangOptions();
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
      mainElement.innerHTML = "Select a country from the list";       
      hideButtons();
     
      //Hide translation dropdown
      let transElement = document.getElementById('translations');
      transElement.style.visibility = 'hidden';
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


//TODO if element has been pushed several times into array, prev and next button checks the first appearance of element 

function displayPrevAndNextBtn(prevClick) {
  let index = findCurrentIndex();
  //console.log(index);

  //next button only visible, if prev button was clicked OR selectedCountry is NOT last element in visitedCountries array
  
  if (prevClick || selectElement.value !== visitedCountries[visitedCountries.length-1]) {
    nextBtn.style.visibility = 'visible';
  } else {
    nextBtn.style.visibility = 'hidden';
  }

  if (visitedCountries.length > 1 && index > 0) {
    previousBtn.style.visibility = 'visible';
  } else {
    previousBtn.style.visibility = 'hidden';
  }
}

function findCurrentIndex () {
  let selectedCountry = getSelectedCountry();
  let currentIndex = visitedCountries.indexOf(selectedCountry['name']['common']);

  return currentIndex;
}

function makePrevBtnClickable() {
  previousBtn.addEventListener('click', (e) => {
    //find Index
    //i-1
    //display details
    let index = findCurrentIndex();

      //there are min. 2 elements in visitedCountries array
      index--;
      selectElement.value = visitedCountries[index];
      //console.log(selectElement.value);
      displayDetails();
      displayPrevAndNextBtn(e)
  }) 
}

function makeNextBtnClickable() {
  nextBtn.addEventListener('click', () => {
    let index = findCurrentIndex();

      index++;
      selectElement.value = visitedCountries[index];
      displayDetails();
      displayPrevAndNextBtn()
  })
}

function createTransDropDown() {
  const toolBar = document.getElementById('toolbar');
  let transElement = document.createElement('select');
  transElement.setAttribute('id', 'translations');
  toolBar.appendChild(transElement);

  transElement.style.visibility = 'hidden';
}

function  createLangOptions() {
  let selectedCountry = getSelectedCountry();
  let transElement = document.getElementById('translations');
  transElement.style.visibility = 'visible';

  //Initial option
  const initialOption = document.createElement("option");
  initialOption.value = "";
  initialOption.textContent = "Select language";
  transElement.appendChild(initialOption);

  // Loop through countries to get the translation keys
   
  for (lang in selectedCountry["translations"]) {
    
    let langElement = document.createElement('option');
    langElement.value = lang;
    langElement.textContent = lang;
    transElement.appendChild(langElement);
  } 
}

function selectLang() {
  let selectedLang = "";

  document.getElementById('translations').addEventListener('input', (e) => {
    selectedLang = e.target.value;
  })

}


  