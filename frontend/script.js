

const loadEvent = function() {

  let all = document.getElementById("all")
  let countryElement = document.getElementById("country")

  let populationButton = document.getElementById("population");
  let areaElement = document.getElementById("area");
  
 

  //hide both buttons (population, area) for task 3
  populationButton.style.display = "none";
  areaElement.style.display = "none";

  getCommonNames(countries);
  
 populationButton.addEventListener("click", (e) => {
  console.log("Click happend")
 })
  
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
    
    inputList.forEach(names => {
      let chooseName = document.createElement("option");
      chooseName.innerHTML = names;
      all.appendChild(chooseName)

    });

    all.addEventListener("change", (e) => {
      showOneCountry(e.target.value);
      console.log(e)
    });

    if (!all){ //document.queryselector
      let noCountry = document.createElement("div")
      noCountry.innerHTML = "Select a country from the list";
      countryElement.appendChild(noCountry)
    }
  }

  function showOneCountry (oneCountryName) {
    countryElement.innerHTML = ""
    countryElement.appendChild(createOneCountryFromObject(oneCountryName));
  }
   
   

  function createOneCountryFromObject(countryName) {
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
    console.log(populationObject)
    
    let slicedObj = populationObject.slice(0);
    slicedObj.sort(function(a, b) {
      return b.pop - a.pop
    })
    let highestPopulation = slicedObj[0].name
    
    createPopulationElement(highestPopulation) 
    
   

    console.log(highestPopulation)
    return highestPopulation
    
  }
 
  

  function thereIsNoBorder (country) {
    let noBorder = document.createElement("div");
    noBorder.innerHTML = `${country.name.common} has no direct neighbour.`
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

  //When the <button id="population"> element is clicked, the neighbor country with the largest population is displayed in the <main id="country"> element.
  function createPopulationElement (country) {
    let popElement = document.createElement("div");
    popElement.innerHTML = country;
    countryElement.appendChild(popElement)
  }
  

 

}

window.addEventListener("load", loadEvent);


