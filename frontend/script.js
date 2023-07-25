
let toolbar;
let all;
let countryElement;
let populationButton;
let areaElement;
let next;
let prev;
let alertDiv;


const loadEvent = function() {
  
  // INFO: all = getAllView(); siehe allerletzte Funktion, nur als INFO
  toolbar = document.getElementById("toolbar")
  workOnToolbar(toolbar)
  

  all = document.getElementById("all")

  countryElement = document.getElementById("country")

 
  populationButton = document.getElementById("population");
  workOnPopButton(populationButton);

  areaElement = document.getElementById("area");
  workOnAreaButton(areaElement)
 
  alertDiv = document.getElementById("alertDiv");

  

  //With BOOTSTRAP:
  next = document.getElementById("next")
  prev = document.getElementById("prev")
  //Without BOOTSTRAP:
  prev = prevButton();
  next = nextButton();
  
  //hide both buttons (population, area) for task 3
  populationButton.style.display = "none";
  areaElement.style.display = "none";
  alertDiv.style.display = "none"
  

  let noCountry = document.createElement("option");
  noCountry.innerHTML = "Select a country from the List!";
  all.appendChild(noCountry);
  
  
  let names = getCommonNames(countries);

};



function getCommonNames(inputCountries) {
  let countryNameList = [];
  
  inputCountries.forEach(country => {
    let names = country["name"]
    countryNameList.push(names.common)
  });
  
  createOptions(countryNameList)
  return countryNameList
}

function createOptions(inputList) {
  // let all = document.getElementById("all")
  // let countryElement = document.getElementById("country")
  inputList.forEach(names => {
    let chooseName = document.createElement("option");
    chooseName.id = names;
    chooseName.innerHTML = names;
    all.appendChild(chooseName)
    createChangeEvent(inputList)
  });
};

function createChangeEvent (inputList) {
  
  all.addEventListener("change", (e) => {
    let target = e.target.value
    showOneCountry(target, inputList);
  });
}

function showOneCountry (oneCountryName) {
  countryElement.innerHTML = ""
  createOneCountryFromObject(oneCountryName);
  
}

function createOneCountryFromObject (countryName) {
  let flag = [];                  //img
  let commonName = [];            //h1
  let region = [];                //h2
  let subRegion = [];             //h3
  let capitalCity = [];           //h4

  makeButtonsVisible()
  
  
  for(let country of countries) {
    if (country.name.common === countryName) {
      //flag
      let flags = country.flags.png;
      flag.push(flags);

      //commonName
      let names = country.name.common;
      commonName.push(names);

      //region
      let regionName = country.region;
      region.push(regionName);
      
      //subRegion
      let sub = country.subregion;
      subRegion.push(sub);

      //capital
      let capital = country.capital[0];
      capitalCity.push(capital);

      //get borders
      if(country.borders) {
        let borderArray = country.borders;
        
        getNeighbourCountryLargestPopulation(borderArray)
        getNeighbourCountryLargestArea (borderArray);
      } else {
        thereIsNoBorder(country)
      };
    };
  };
  createFlagImageElement(flag);
  createH1Element(commonName);
  createH2Element(region);
  createh3Element(subRegion);
  createh4Element(capitalCity);
}


function getNeighbourCountryLargestPopulation (borders) {
  let populationObject= [];
  alertDiv = document.getElementById("alertDiv").style.display = "none"

  for (let country of countries) {
    for (let border of borders ) {
      if (country["cca3"] === border) {
        let obj = {}
        obj.name = country.name.common;
        obj.pop = country.population;
        obj.area = country.area;
        populationObject.push(obj);
        
      }
    };
  };
  
  let slicedObj = populationObject.slice(0);
  slicedObj.sort(function(a, b) {
    return b.pop - a.pop
  })
  let highestPopulation = slicedObj[0].name
  
  
  //INFO: kann ich auch hier definieren, weil es sonst nicht global war
  let populationButton = document.getElementById("population");

  populationButton.addEventListener("click", (e) => {
    countryElement.innerHTML = "";
    createOneCountryFromObject(highestPopulation);
    let selectedOption = all.options[highestPopulation]
    // console.log(selectedOption)
    selectedOption.selected = true;
    
  })
  return highestPopulation
  
}

function getNeighbourCountryLargestArea (borders) {
  let areaObject= [];
  

  for (let country of countries) {
    for (let border of borders) {
      if (country["cca3"] === border) {
        let obj = {}
        obj.name = country.name.common;
        obj.area = country.area;
        areaObject.push(obj);
        
      }
    };
  };

  let slicedObj = areaObject.slice(0);
  slicedObj.sort(function(a, b) {
    return b.area - a.area
  })
  let largestArea = slicedObj[0].name
  // console.log(largestArea)
  // console.log(areaObject)
  addClickEventOnAreaButton(largestArea)
}

function addClickEventOnAreaButton (largestArea) {
  let areaElement = document.getElementById("area");
  areaElement.addEventListener("click", (e) => {
    console.log("click happend")
    countryElement.innerHTML = "";
    createOneCountryFromObject(largestArea);
    let selectedOption = all.options[largestArea]
    // console.log(selectedOption)
    selectedOption.selected = true;
  })
}

function thereIsNoBorder (country) {
  let noBorder = document.getElementById("alertDiv");
  noBorder.innerHTML = `${country.name.common} has no direct neighbours.`
  noBorder.style.fontSize = "25px";
  noBorder.style.padding =  "10px 10px 10px 30px";
  noBorder.style.margin = "10px 10px 10px 30px"
  noBorder.style.width = "500px"
  
  // countryElement.appendChild(noBorder)

}

function makeButtonsVisible() {
  populationButton = document.getElementById("population").style.display = "inline";
  areaElement = document.getElementById("area").style.display = "inline";
  alertDiv = document.getElementById("alertDiv").style.display = "block"
}

function nextButton () {
  //nextBtn = document.createElement("button");
  //nextBtn.innerHTML = "Next Country";
  //nextBtn.id = "next";
  //toolbar.appendChild(nextBtn);

  let nextBtn = document.getElementById("next")
  let prevBtn = document.getElementById("prev")
  nextBtn.style.margin = "10px 10px 10px 2px";
  nextBtn.addEventListener("click", (e) => {
    console.log("Click next");
    countryElement.innerHTML = "";
    let selectedIndex = all.selectedIndex;
    let nextIndex = (selectedIndex + 1) % all.options.length;
    all.options[nextIndex].selected = true;
    let outputNext = all.options[nextIndex].value
    createOneCountryFromObject(outputNext)
    if (selectedIndex < countries.length) {
      
      prevBtn.style.display = "inline";
    } else {
      countryElement.innerHTML = "";
      nextBtn.style.display = "none";
    }
  })
}

function prevButton () {
  // prevBtn = document.createElement("button");
  // prevBtn.innerHTML = "Previous Country";
  // prevBtn.id = "prev";
  // toolbar.appendChild(prevBtn)
  let nextBtn = document.getElementById("next")
  let prevBtn = document.getElementById("prev")
  prevBtn.style.margin = "10px 2px 10px 30px";
  prevBtn.addEventListener("click", (e) => {
    console.log("Click prev");
    countryElement.innerHTML = "";

    let selectedIndex = all.selectedIndex;
    let prevIndex = (selectedIndex - 1) % all.options.length;
    all.options[prevIndex].selected = true;
    let outputPrev = all.options[prevIndex].value
    createOneCountryFromObject(outputPrev)
    if (selectedIndex > 1) {
      nextBtn.style.display = "inline";
    } else {
      console.log("HERE")
      countryElement.innerHTML = "";
      prevBtn.style.display = "none";
    }

  })


}

function createFlagImageElement(flag) {
  let flagElement = document.createElement("img");
  flagElement.src = flag;
  //flagElement.style.display = "block";
  flagElement.style.margin = "20px 10px 20px 30px";
 
  countryElement.appendChild(flagElement);
};

function createH1Element(commonName) {
  let h1Element = document.createElement("h1");
  h1Element.innerHTML = commonName;
  h1Element.style.display = "block";
  h1Element.style.margin = "10px 10px 10px 30px";
  countryElement.appendChild(h1Element);
};

function createH2Element(region) {
  let h2Element = document.createElement("h2");
  h2Element.innerHTML = "Region: " + region;
  h2Element.style.display = "block";
  h2Element.style.margin = "10px 10px 10px 30px";
  countryElement.appendChild(h2Element);
};

function createh3Element(sub) {
  let h3Element = document.createElement("h3"); 
  h3Element.innerHTML = "Subregion: " + sub;
  h3Element.style.display = "block";
  h3Element.style.margin = "10px 10px 10px 30px";
  countryElement.appendChild(h3Element);
}

function createh4Element(capital) {
  let h4Element = document.createElement("h4");
  h4Element.innerHTML = "Capital: " + capital;
  h4Element.style.display = "block";
  h4Element.style.margin = "10px 10px 10px 30px";
  countryElement.appendChild(h4Element);
}



function workOnToolbar (tool) {
  tool.style.margin = "10px 10px 10px 30px";
}

function workOnPopButton (pop) {
  pop.style.margin = "10px 2px 10px 10px";
}

function workOnAreaButton (area) {
  area.style.margin = "10px 10px 10px 2px";
}


//INFO von Adrian
// function getAllView() {
//   //so kann ich mir ohne einer globalen Variable die root immer überall holen
  
//   return document.getElementById("all")
// }


window.addEventListener("load", loadEvent);


