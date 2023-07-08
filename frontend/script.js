
let selectAll = document.getElementById("all");
commonNames(countries);

function commonNames(countries) {
  let countrieNames =  []
  
  for (let i = 0; i < countries.length; i++) {
    const country = countries[i];
    const name = country.name.common;
    console.log(name)
    countrieNames.push(name)
  }
  createOption(countrieNames, countries)
}


function createOption(nameArray, countries) {
  nameArray.forEach((countryName) => {
    let options = document.createElement("option");
    options.textContent = countryName;

    options.addEventListener("click", (e) => {
      detailsOfSelectedCountry(countries)
    })

    //does not work 
    selectAll.appendChild(options);
    
    
    
  });
  return options
  

}

function detailsOfSelectedCountry(names) {
  console.log(countries)
  
}