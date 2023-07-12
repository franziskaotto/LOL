
// let insertIdToBody = document.querySelector("body");
// insertIdToBody.id = "root"

getCommonNames(countries);


function getCommonNames(inputCountries) {
  let countryNameList = [];
  
  inputCountries.forEach(country => {
   //console.log(country);
  
   let names = country["name"]
   countryNameList.push(names.common)

  });
  createUnorderedList(countryNameList)
  console.log(countryNameList)
  return countryNameList
}


function createUnorderedList(inputList) {
  const list = document.createElement('ul');

  inputList.forEach(names => {
    const li = document.createElement('li');
    li.textContent = names
    list.appendChild(li)
  });
  const inject = document.querySelector('all');
  inject.appendChild(list)

}