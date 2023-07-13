

const loadEvent = function() {

  
  let insertIdToBody = document.querySelector("body");
  insertIdToBody.id = "root"
  let all = document.getElementById("all")
  getCommonNames(countries);
  let countryElement = document.getElementById("country")


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
    console.log(countryNameList)
    
    return countryNameList
  }

  function createOptions(inputList) {
    inputList.forEach(names => {
      let chooseName = document.createElement("option");
      chooseName.innerHTML = names;
      chooseName.addEventListener("click", (e) => {
        showOneCountry(inputList)
      })
      all.appendChild(chooseName)
      
    });
  }

  function showOneCountry(inputList) {
    dataHolder.innerHTML = "";
    console.log("ShowOneCountry clicked");
    dataHolder.appendChild(createOneCountry(inputList))

  }

  function createOneCountry(inputList) {
    
    inputList.forEach(country => {
      let region = document.createElement("h2")
      let regionName = country["region"];
      region.innerHTML = regionName
      
    });
  }










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


