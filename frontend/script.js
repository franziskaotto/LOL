
const loadEvent = function () {

    //Define empty array to save visited countries for previous/next button
    let contentStack = []
    let selectedCountryPush;
    let currentStack = 0;

    // Create a dropdown for each countryname
    countries.forEach(function (country) {
        const commonValue = country.name.common;
        //console.log(commonValue);
        const opt = document.createElement('option')
        opt.innerHTML = commonValue
        all.appendChild(opt);
    });

    //Details of the selected country
    const selectElement = document.getElementById('all');
    const mainElement = document.getElementById('country');
    mainElement.textContent = 'Select a country from the list';

    //Button population
    const buttonPopulation = document.getElementById('population')
    buttonPopulation.style.display = 'none';
    //Previous and next button
    const prevButton = document.getElementById('prev')
    prevButton.style.display = 'none';
    const nextButton = document.getElementById('next')
    nextButton.style.display = 'none';

    function showCountry(selectedCountryx) {
        if (selectedCountryx === undefined) {
            mainElement.textContent = 'Select a country from the list'
        } else {
            const flag = selectedCountryx.flag;
            const commonName = selectedCountryx.name.common;
            const regionName = selectedCountryx.region;
            const subregionName = selectedCountryx.subregion;
            const capitalCity = selectedCountryx.capital;
            //if country is selected both buttons are displayed
            buttonPopulation.style.display = 'inline-block';
            buttonArea.style.display = 'inline-block';


            const content = `
      <img>${flag}</img>
      <h1>${commonName}</h1>
      <h2>${regionName}</h2> 
      <h3>${subregionName}</h3>
      <h4>${capitalCity}</h4>
    `;


            // Set the HTML content in the <main> element
            mainElement.innerHTML = content;

            selectedCountryPush = selectedCountryx
        }
    }
    selectElement.addEventListener('change', function () {
        const selectedCountry = countries[selectElement.selectedIndex - 1];
        if (selectedCountry && 'borders' in selectedCountry) {

            //function call showCountry with values selectedCountry
            showCountry(selectedCountry)
            //Push in array for previous/next button
            pushContentStack(selectedCountryPush)
            prevNext()
        } else {
            showCountry(selectedCountry)
            pushContentStack(selectedCountryPush)
            //if country has NO borders
            buttonArea.style.display = 'none';
            buttonPopulation.style.display = 'none';
            prevNext();
        }
    })

    //Function push in array for previous/next button
    function pushContentStack(selectedCountryx) {
        console.log(contentStack)
        contentStack.push(selectedCountryx)
        currentStack = contentStack.length
    }


    //Function previous /next buttons
    function prevNext() {
        //prev /next buttons
        if (currentStack > 1) {
            prevButton.style.display = 'inline-block'
        } else {
            prevButton.style.display = 'none'
        }
        if (currentStack < contentStack.length) {
            nextButton.style.display = 'inline-block'
        } else {
            nextButton.style.display = 'none'
        }
    }

    //Neighbour with the largest population
    buttonPopulation.addEventListener('click', function () {
        const selectedCountry = countries[selectElement.selectedIndex - 1];
        let highestPopulation = 0;
        let countryWithHighestPopulation = '';
        if (selectedCountry && selectedCountry.borders) {

            for (const border of selectedCountry.borders) {
                const borderCountry = countries.find(country => country.cca3 === border);
                if (borderCountry && borderCountry.population > highestPopulation) {
                    highestPopulation = borderCountry.population;
                    countryWithHighestPopulation = borderCountry;

                    //Display neighbour name with largest population in select 'all' dropdown
                    document.getElementById('all').value = countryWithHighestPopulation.name.common;

                }
            }
        }

        //Display neighbour with largest population in main country
        showCountry(countryWithHighestPopulation)
        pushContentStack(countryWithHighestPopulation)
        prevNext()
    })

    //Button largest area
    const buttonArea = document.getElementById('area')
    buttonArea.style.display = 'none';

    buttonArea.addEventListener('click', function () {
        const selectedCountry = countries[selectElement.selectedIndex - 1];
        let largestArea = 0;
        let countryWithLargestArea = '';
        if (selectedCountry && selectedCountry.borders) {

            for (const border of selectedCountry.borders) {
                const borderCountry = countries.find(country => country.cca3 === border);
                if (borderCountry && borderCountry.area > largestArea) {
                    largestArea = borderCountry.area;
                    countryWithLargestArea = borderCountry;
                    //Display neighbour name with largest area in select 'all' dropdown
                    document.getElementById('all').value = countryWithLargestArea.name.common;
                }
            }
        }
        //Display neighbour with largest population in main country
        showCountry(countryWithLargestArea)
        pushContentStack(countryWithLargestArea)
        prevNext()
    })

    //Clickevent prevButton
    prevButton.addEventListener('click', function () {
        const selectedCountry = countries[selectElement.selectedIndex - 1];
        console.log(currentStack)
        console.log(selectedCountry)
        // Show the previous item from contentStack array
        let previousContent = contentStack[currentStack - 2];
        currentStack = currentStack - 1;
        document.getElementById('all').value = previousContent.name.common;

        //Display neighbour with largest population in main country
        showCountry(previousContent)
        prevNext()
    })

    //Clickevent nextButton
    nextButton.addEventListener('click', function () {
        // Show the next content
        if (currentStack < contentStack.length) {
            let nextContent = contentStack[currentStack];
            console.log(currentStack)
            showCountry(nextContent)
            document.getElementById('all').value = nextContent.name.common;
            currentStack = currentStack + 1;
        }
        prevNext()
    })

}
window.addEventListener('load', loadEvent)


/* also works, without list
const loadEvent = function () {
    countries.forEach(function (country) {
      const commonValue = country.name.common;
      const opt = document.createElement('option');
      opt.innerHTML = commonValue;
      all.appendChild(opt);
    });
  };
  
  window.addEventListener('load', loadEvent);
*/
