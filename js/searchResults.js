export const deleteSearchResults = () => {
    const parentElement = document.getElementById("searchResults");
    let child = parentElement.lastElementChild;
    while (child) {
        parentElement.removeChild(child);
        child = parentElement.lastElementChild;
    };
};

//main function
export const buildSearchResults = (resultArray) => {
    resultArray.forEach(result => {
        const resultItem = createResultItem(result);
        const resultContents = document.createElement("div");
        resultContents.classList.add("resultContents");
        const resultText = createResultText(result);
        resultContents.append(resultText);
        resultItem.append(resultContents);
        const searchResults = document.getElementById("searchResults");
        searchResults.append(resultItem);
    });
};


//helper functions
const createResultItem = (result) => {
    const resultItem = document.createElement("div");
    resultItem.classList.add("resultItem");
    const resultTitle = document.createElement("div");
    resultTitle.classList.add("resultTitle");
    const link = document.createElement("a");
    link.href = '#';
    link.textContent = "The airport name is " + result.name;
    resultTitle.append(link);
    resultItem.append(resultTitle);
    return resultItem;
};

const createResultText = (result) => {
    const resultText = document.createElement("div");
    resultText.classList.add("resultText");
    const resultDescription = document.createElement("p");
    resultDescription.classList.add("resultDescription");
    resultDescription.textContent = "The region is " + result.region;
    resultText.append(resultDescription);
    return resultText;
};

export const clearStatsLine = () => {
    document.getElementById("stats").textContent = "";
};

export const setStatsLine = (numberofResults) => {
    const statLine = document.getElementById("stats");
    if (numberofResults) {
        statLine.textContent = `Displaying ${numberofResults} results`;
    } else {
        statLine.textContent = 'No results found';
    }
};