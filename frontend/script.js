

let all;
let countryElement;
let populationButton;
let areaElement;

const loadEvent = function() {
  
  // INFO: all = getAllView(); siehe allerletzte Funktion, nur als INFO

  all = document.getElementById("all")
  countryElement = document.getElementById("country")

 
  populationButton = document.getElementById("population");
  areaElement = document.getElementById("area");
 

  //hide both buttons (population, area) for task 3
  populationButton.style.display = "none";
  areaElement.style.display = "none";

  let noCountry = document.createElement("option")
  noCountry.innerHTML = "Select a country from the List!";
  all.appendChild(noCountry)
  
  
  getCommonNames(countries);

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
    chooseName.innerHTML = names;
    all.appendChild(chooseName)

  });

  all.addEventListener("change", (e) => {
    showOneCountry(e.target.value);
    //https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_option_selected2
  });
};

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
      } else {
        thereIsNoBorder(country)
      }

      //get neighbour with largest area
      // if(country.area) {
      //   let areaArray = 
      //   getNeighbourCountryLargestArea()
      // }
    }
  };
  createFlagImageElement(flag);
  createH1Element(commonName);
  createH2Element(region);
  createh3Element(subRegion);
  createh4Element(capitalCity);


}



function getNeighbourCountryLargestPopulation (borders) {
  let populationObject= [];

  for (let country of countries) {
    for (let border of borders ) {
      if (country["cca3"] === border) {
        let obj = {}
        obj.name = country.name.common;
        obj.pop = country.population;
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
    
    
  })
  return highestPopulation
  
}



function thereIsNoBorder (country) {
  let noBorder = document.createElement("div");
  noBorder.innerHTML = `${country.name.common} has no direct neighbours.`
  countryElement.appendChild(noBorder)

}

function makeButtonsVisible() {
  populationButton = document.getElementById("population").style.display = "inline";
  areaElement = document.getElementById("area").style.display = "inline";
}

function createFlagImageElement(flag) {
  let flagElement = document.createElement("img");
  flagElement.src = flag;
  flagElement.style.display = "block";
  countryElement.appendChild(flagElement);
};

function createH1Element(commonName) {
  let h1Element = document.createElement("h1");
  h1Element.innerHTML = commonName;
  h1Element.style.display = "block";
  countryElement.appendChild(h1Element);
};

function createH2Element(region) {
  let h2Element = document.createElement("h2");
  h2Element.innerHTML = "Region: " + region;
  h2Element.style.display = "block";
  countryElement.appendChild(h2Element);
};

function createh3Element(sub) {
  let h3Element = document.createElement("h3"); 
  h3Element.innerHTML = "Subregion: " + sub;
  h3Element.style.display = "block";
  countryElement.appendChild(h3Element);
}

function createh4Element(capital) {
  let h4Element = document.createElement("h4");
  h4Element.innerHTML = "Capital: " + capital;
  h4Element.style.display = "block";
  countryElement.appendChild(h4Element);
}



  
 


//INFO
// function getAllView() {
//   //so kann ich mir ohne einer globalen Variable die root immer überalle holen
  
//   return document.getElementById("all")
// }


window.addEventListener("load", loadEvent);


