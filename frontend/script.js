

const loadEvent = function() {

  //try for me if connection between HTML and JS works
  let insertIdToBody = document.querySelector("body");
  insertIdToBody.id = "root"

  let all = document.getElementById("all")
  let countryElement = document.getElementById("country")

  //hide both buttons (population, area) for task 3
  let populationElement = document.getElementById("population");
  let areaElement = document.getElementById("area");

  populationElement.style.visibility = "hidden";
  areaElement.style.visibility = "hidden";

  getCommonNames(countries);


  function getCommonNames(inputCountries) {
    let countryNameList = [];
    
    inputCountries.forEach(country => {
      let names = country["name"]
      countryNameList.push(names.common)
    });
    //createUnorderedList(countryNameList)

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
    });

    if (!all){ //document.queryselector
      let noCountry = document.createElement("div")
      noCountry.innerHTML = "Select a country from the list";
      countryElement.appendChild(noCountry)
    }
  }

  function showOneCountry(oneCountryName) {
    //need to have it to clear the Page
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

          let borderArray = country.borders
          console.log(borderArray)
        } else {
          createThereIsNoBorder(country)
        }

        //getNeighbourCountryLargestPopulation(countries)
      }
    };
    createFlagImageElement(flag);
    createH1Element(commonName);
    createH2Element(region);
    createh3Element(subRegion);
    createh4Element(capitalCity);
  }


  function makeButtonsVisible() {
    populationElement = document.getElementById("population").style.visibility = "visible";
    areaElement = document.getElementById("area").style.visibility = "visible";
  }
  
  function createFlagImageElement(flag) {
    let flagElement = document.createElement("img");
    flagElement.src = flag;
    flagElement.style.visibility = "visible";
    countryElement.appendChild(flagElement);
  };

  function createH1Element(commonName) {
    let h1Element = document.createElement("h1");
    h1Element.innerHTML = commonName;
    h1Element.style.visibility = "visible";
    countryElement.appendChild(h1Element);
  };

  function createH2Element(region) {
    let h2Element = document.createElement("h2");
    h2Element.innerHTML = "Region: " + region;
    h2Element.style.visibility = "visible";
    countryElement.appendChild(h2Element);
  };

  function createh3Element(sub) {
    let h3Element = document.createElement("h3"); 
    h3Element.innerHTML = "Subregion: " + sub;
    h3Element.style.visibility = "visible";
    countryElement.appendChild(h3Element);
  }

  function createh4Element(capital) {
    let h4Element = document.createElement("h4");
    h4Element.innerHTML = "Capital: " + capital;
    h4Element.style.visibility = "visible";
    countryElement.appendChild(h4Element);
  }

  function createThereIsNoBorder (country) {
    let noBorder = document.createElement("div");
    noBorder.innerHTML = `${country.name.common} has no direct neighbour.`
    countryElement.appendChild(noBorder)

  }

 /* function getNeighbourCountryLargestPopulation (countries) {
    let listAllBorders = []
    
    countries.forEach(country => {
      if(country.borders) {
        let borderArray = country.borders;
        
        console.log(borderArray)
        
      }
      
    });
    console.log(listAllBorders)

   
  }
  */

  /*
  function noCountrySelected() {
    let noCountry = document.createElement("div")
    noCountry.innerHTML = "Select a country from the list";
    countryElement.appendChild(noCountry)
  }
  */



  //i tried to create an unordered List 
  // function createUnorderedList(inputList) {
    
  //   const list = document.createElement("ul");

  //   inputList.forEach(names => {
  //     const li = document.createElement("li");
  //     li.textContent = names
  //     list.appendChild(li)
  //   });
    
  //   all.appendChild(list)

  // }

}

window.addEventListener("load", loadEvent);


