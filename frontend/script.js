

const loadEvent = function() {

  
  let insertIdToBody = document.querySelector("body");
  insertIdToBody.id = "root"

  let all = document.getElementById("all")
  let countryElement = document.getElementById("country")


  getCommonNames(countries);
  //getRestOfCountry(countries);


  function getCommonNames(inputCountries) {
    let countryNameList = [];

    
    inputCountries.forEach(country => {
      //console.log(country);
      //array
      let names = country["name"]
      countryNameList.push(names.common)
    });
    //createUnorderedList(countryNameList)

    createOptions(countryNameList)
    //console.log(countryNameList)
    
    return countryNameList
  }

  function createOptions(inputList) {
    
    inputList.forEach(names => {
      let chooseName = document.createElement("option");
      chooseName.innerHTML = names;
      all.appendChild(chooseName)

    });

    all.addEventListener("change", (e) => {
      showOneCountry(e.target.value)
    });
  }

  function showOneCountry(oneCountryName) {
    //need to have it to clear the Page
    countryElement.innerHTML = ""
    countryElement.appendChild(createOneCountryFromObject(oneCountryName))
    
    
  }

  function createOneCountryFromObject(countryName) {
    let flag = [];                  //img
    let commonName = [];            //h1
    let region = [];                //h2
    let subRegion = [];             //h3
    let capitalCity = [];           //h4

    
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
        
      }
      
      
    };
    createFlagImageElement(flag);
    createH1Element(commonName);
    createH2Element(region);
    createh3Element(subRegion);
    createh4Element(capitalCity);
    
  }

  function createFlagImageElement(flag) {
    let flagElement = document.createElement("img");
    flagElement.src = flag;
    countryElement.appendChild(flagElement);
  };

  function createH1Element(commonName) {
    let h1Element = document.createElement("h1");
    h1Element.innerHTML = commonName;
    countryElement.appendChild(h1Element);
  };

  function createH2Element(region) {
    let h2Element = document.createElement("h2");
    h2Element.innerHTML = "Region: " + region;
    countryElement.appendChild(h2Element);
  };

  function createh3Element(sub) {
    let h3Element = document.createElement("h3"); 
    h3Element.innerHTML = "Subregion: " + sub;
    countryElement.appendChild(h3Element);
  }

  function createh4Element(capital) {
    let h4Element = document.createElement("h4");
    h4Element.innerHTML = "Capital: " + capital;
    countryElement.appendChild(h4Element);
  }

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


