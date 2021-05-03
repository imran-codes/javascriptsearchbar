export const getSearchTerm = () => {
    const rawSearchTerm = document.getElementById("search").value.trim();
    //trim more than one space - global and case sensitive
    const regex = /[ ]{2,}/gi;
    const searchTerm = rawSearchTerm.replaceAll(regex, " ");
    return searchTerm;
}

export const retrieveSearchResults = async(searchTerm) => {
    const carsSearchString = getCarsSearchString(searchTerm);
    const carsSearchresults = await requestData(carsSearchString);
    let resultArray = [];
    if (carsSearchresults.hasOwnProperty("results")) {
        resultArray = processCarResults(carsSearchresults.results.docs);
        console.log(carsSearchresults.results.docs);
    }
    //does leave possible empty array because if it was was it will skip over this
    return resultArray;

    //return carsSearchresults.results.docs
}

const getCarsSearchString = (searchTerm) => {
    const maxChars = getMaxChars();
    const rawSearchString = `https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=6&solrTerm=${searchTerm}`;
    //define search string  so that if new yourk is typed then the space would be encode as %20
    const searchString = encodeURI(rawSearchString);
    return searchString;
}

const getMaxChars = () => {
    const width = window.innerWidth;
    let maxChars;
    if (width < 414) maxChars = 50
    if (width >= 414 && width < 1400) maxChars = 100;
    return maxChars;
};

const requestData = async(searchString) => {
    try {
        //get url and convert to json
        const response = await fetch(searchString);
        const data = await response.json();
        return data;
    } catch (e) {
        console.error(e);
    }
}

const processCarResults = (results) => {
    const resultArray = [];
    Object.keys(results).forEach(key => {
        const id = key;
        const name = results[key].name;
        const region = results[key].region;
        const item = {
                id: id,
                name: name,
                region: region
            }
            //push the item into the array
        resultArray.push(item)
    });
    return resultArray;
}