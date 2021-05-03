$(document).ready(function() {

    //on hover or click or touchstart change border - (used javascript instead of css :hover method)
    var n = 0;
    $("#container")
        .mouseenter(function() {
            n += 1;
            $(this).css("border-radius", "10px");
            $(this).css("border", "5px solid #0b76c5");
        })
        .mouseleave(function() {
            $(this).css("border-radius", "0px");
            $(this).css("border", "none");
        });

});

///////////////////////////////////////

import { setSearchFocus, showClearTextButton, clearSearchText, clearPushListener } from "./searchbar.js";
import { getSearchTerm, retrieveSearchResults } from "./locationFunctions.js";
import { deleteSearchResults, buildSearchResults, setStatsLine, clearStatsLine } from "./searchResults.js";


document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        initApp();
    }
});

const initApp = () => {
    //set focus straight away on text input
    setSearchFocus();
    //3 listeners
    const search = document.getElementById("search");
    search.addEventListener("input", showClearTextButton);
    const clear = document.getElementById("clear");
    clear.addEventListener("click", clearSearchText);
    clear.addEventListener("keydown", clearPushListener);
    const form = document.getElementById("searchBar");
    form.addEventListener("submit", submitTheSearch);
}

// Call functions in order
const submitTheSearch = (e) => {
    //stop form reloading the page 
    e.preventDefault();
    //delete search results
    deleteSearchResults();
    //run the search
    runTheSearch();
    //set the focus
    setSearchFocus();
}

const runTheSearch = async() => {
    // clear the stats line
    clearStatsLine();
    const searchTerm = getSearchTerm();
    //run function after 1 character
    if (searchTerm.length <= 1) return;
    const resultArray = await retrieveSearchResults(searchTerm);
    // if there are results
    if (resultArray.length) buildSearchResults(resultArray);
    setStatsLine(resultArray.length)
};