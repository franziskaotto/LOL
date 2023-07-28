var currentCounty = null;
var countryHistory = [];
var currentCountryInHistory = null;

function addCountriesToNavigation(navigationElement, countries) {
    navigationElement.innerHTML = '';
    navigationElement.insertAdjacentHTML("beforeend", '<option selected=true></option>');
    countries.forEach(function (country) {
        navigationElement.insertAdjacentHTML("beforeend", `<option>${country["name"]["common"]}</option>`);
    });

    console.log(`${countries.length} added to dropdown box.`)
}

function getCountryDetailsFromName(countryName, countries) {
    var countryDetails = countries.find(country => country.name.common === countryName);

    return countryDetails;
}

function getCountryDetailsFromCca3(cca3, countries) {
    var countryDetails = countries.find(country => country.cca3 === cca3);

    return countryDetails;
}

function displayCountryDetailsInMain(countryDetails, mainElement) {
    mainElement.innerHTML = '';
    if (countryDetails !== undefined) {
        currentCounty = countryDetails;
        var image = document.createElement("img");
        image.setAttribute("src", `${countryDetails.flags.png}`);
        image.setAttribute("height", "200");
        image.setAttribute("width", "300");
        image.setAttribute("alt", "Flag");
        mainElement.appendChild(image);
        mainElement.insertAdjacentHTML("beforeend", `<h1>${countryDetails.name.common}</h1>`);
        mainElement.insertAdjacentHTML("beforeend", `<h1>${countryDetails.name.common}</h1>`);
        mainElement.insertAdjacentHTML("beforeend", `<h2>${countryDetails.region}</h2>`);
        mainElement.insertAdjacentHTML("beforeend", `<h3>${countryDetails.subregion}</h3>`);
        mainElement.insertAdjacentHTML("beforeend", `<h3>${countryDetails.capital}</h3>`);
    } else {
        currentCounty = undefined;
        console.log("No country selected!")
        mainElement.insertAdjacentHTML("beforeend", `Select a country from the list`);

    }

}

function getLargestNeighborByPopulation() {
    var neigborsPopulation = {};
    var largestCountry = "";
    var populationOfLargestCountry = 0;
    if ("borders" in currentCounty) {

        // console.log(`border: ${currentCounty.borders}`);

        currentCounty.borders.forEach(function (countryShortCut) {
            var country = (getCountryDetailsFromCca3(countryShortCut, countries));
            neigborsPopulation[country.name.common] = country;
            // console.log("\n");
            // console.log(`Current iteration: ${countryShortCut}`);
            // console.log(`current largest country: ${largestCountry}`);
            // console.log(`current largest population: ${populationOfLargestCountry}`);
            // console.log(`potential new largest country: ${country.name.common}`);
            // console.log(`potential new largest population: ${country.population}`);
            // console.log("\n");
            if (country.population > populationOfLargestCountry) {
                populationOfLargestCountry = country.population;
                largestCountry = country.name.common;
            }
        });

        console.log(`The neighbor with the largest population is ${largestCountry} with ${neigborsPopulation[largestCountry].population} people!`);

        return neigborsPopulation[largestCountry];

    } else {
        alert("Country has no neighbors")
        return undefined;
    }
}

function getLargestNeighborByArea() {
    var neigborsAreas = {};
    var largestCountry = "";
    var areaOfLargestCountry = 0;

    if ("borders" in currentCounty) {
        currentCounty.borders.forEach(function (countryShortCut) {
            var country = (getCountryDetailsFromCca3(countryShortCut, countries));
            neigborsAreas[country.name.common] = country;
            if (country.area > areaOfLargestCountry) {
                areaOfLargestCountry = country.area;
                largestCountry = country.name.common;
            }
        });

        console.log(`The neighbor with the largest area is ${largestCountry} with ${neigborsAreas[largestCountry].area}!`);

        return neigborsAreas[largestCountry];

    } else {
        alert("Country has no neighbors")
        return undefined;
    }
}

function checkNavigationButtonState(prevButton, nextButton) {
    if (countryHistory.length === 0) {
        prevButton.disabled = true;
        nextButton.disabled = true;
    } else if (currentCountryInHistory === 0 && countryHistory.length === 1) {
        prevButton.disabled = true;
        nextButton.disabled = true;
    } else if (currentCountryInHistory === 0) {
        prevButton.disabled = true;
        nextButton.disabled = false;
    } else if (currentCountryInHistory === countryHistory.length - 1) {
        prevButton.disabled = false;
        nextButton.disabled = true;
    } else {
        prevButton.disabled = false;
        nextButton.disabled = false;
    }
}

function addToHistory() {

    // if(currentCountryInHistory < countryHistory.length - 1) {

    // }

    // if (currentCountryInHistory === null) {
    //     currentCountryInHistory = 0;
    //     countryHistory.push(currentCounty.name.common);
    // } else {
    //     countryHistory.push(currentCounty.name.common);
    //     currentCountryInHistory = countryHistory.length - 1;
    // };
    countryHistory.push(currentCounty.name.common);
    currentCountryInHistory = countryHistory.length - 1;

    console.log(`History: ${countryHistory}`);
    console.log(`Position in History: ${currentCountryInHistory + 1} From ${countryHistory.length}`);

};

function goBackInHistory() {
    if (currentCountryInHistory > 0) {
        currentCountryInHistory--;
        var prevCountryName = countryHistory.at(currentCountryInHistory);
        console.log(prevCountryName);
        var prevCountry = getCountryDetailsFromName(prevCountryName, countries);
        console.log(`Position in History: ${currentCountryInHistory + 1} From ${countryHistory.length}`);
        return prevCountry;
    }
}

function goForwardInHistory() {
    if (currentCountryInHistory < countryHistory.length) {
        currentCountryInHistory++;
        var nextCountryName = countryHistory.at(currentCountryInHistory);
        console.log(nextCountryName);
        var nextCountry = getCountryDetailsFromName(nextCountryName, countries);
        console.log(`Position in History: ${currentCountryInHistory + 1} From ${countryHistory.length}`);
        return nextCountry;
    }
}

// MAIN CODE
const loadEvent = function () {

    var bodyElement = document.querySelector("body");
    var toolbar = document.querySelector("#toolbar");
    var navigationElement = bodyElement.querySelector("#all");
    var mainElement = bodyElement.querySelector("#country");
    var populationButton = bodyElement.querySelector("#population");
    var areaButton = bodyElement.querySelector("#area");

    var prevButtonBlueprint = `<button id="prev"> Previous country</button>`
    var nextButtonBlueprint = `<button id="next"> Next country</button>`
    toolbar.insertAdjacentHTML("beforeend", prevButtonBlueprint);
    toolbar.insertAdjacentHTML("beforeend", nextButtonBlueprint);

    var prevButton = bodyElement.querySelector("#prev");
    var nextButton = bodyElement.querySelector("#next");

    addCountriesToNavigation(navigationElement, countries);

    checkNavigationButtonState(prevButton, nextButton);

    navigationElement.addEventListener("change", (event) => {
        console.log(`You selected: ${event.target.value}`);
        var countryDetails = getCountryDetailsFromName(event.target.value, countries);
        console.log(countryDetails);
        displayCountryDetailsInMain(countryDetails, mainElement);
        addToHistory();
        checkNavigationButtonState(prevButton, nextButton);
    });

    populationButton.addEventListener("click", (event) => {
        console.log(`You clicked population button`);

        var largestNeighbor = getLargestNeighborByPopulation();
        if (largestNeighbor !== undefined) {
            displayCountryDetailsInMain(largestNeighbor, mainElement);
            currentCounty = largestNeighbor;
            navigationElement.value = `${currentCounty.name.common}`
            addToHistory();
        }
        checkNavigationButtonState(prevButton, nextButton);
    });

    areaButton.addEventListener("click", (event) => {
        console.log(`You clicked area button`);

        var largestAreaNeighbor = getLargestNeighborByArea();
        if (largestAreaNeighbor !== undefined) {
            displayCountryDetailsInMain(largestAreaNeighbor, mainElement);
            currentCounty = largestAreaNeighbor;
            navigationElement.value = `${currentCounty.name.common}`
            addToHistory();
        }
        checkNavigationButtonState(prevButton, nextButton);
    });

    prevButton.addEventListener("click", (event) => {
        console.log(`You clicked prev button`);
        var previousCountry = goBackInHistory();
        displayCountryDetailsInMain(previousCountry, mainElement);
        checkNavigationButtonState(prevButton, nextButton);
    });
    nextButton.addEventListener("click", (event) => {
        console.log(`You clicked next button`);
        var nextCountry = goForwardInHistory();
        displayCountryDetailsInMain(nextCountry, mainElement);
        checkNavigationButtonState(prevButton, nextButton);
    });
}

window.addEventListener("load", loadEvent);