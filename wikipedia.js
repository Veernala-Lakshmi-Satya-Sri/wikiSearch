let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function creatAndAppendSearchResult(result) {
    let {
        link,
        title,
        description
    } = result;
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");

    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.textContent = title;
    titleEl.classList.add("result-title");
    resultItemEl.appendChild(titleEl);

    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);

    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    resultItemEl.appendChild(urlEl);

    let linkBreakEl = document.createElement("br");
    resultItemEl.appendChild(linkBreakEl);

    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("link-description");
    descriptionEl.textContent = description;
    resultItemEl.appendChild(descriptionEl);

    searchResultsEl.appendChild(resultItemEl);
    //console.log(searchResultsEl)

}

function display_results(search_results) {
    spinnerEl.classList.add("d-none");
    for (let result of search_results) {
        console.log(search_results[0])
        console.log(result)
        creatAndAppendSearchResult(search_results[0]);
    }
}



function searchWikipidia(event) {
    if (event.key === "Enter") {
        console.log("Enter");
        let searchText = searchInputEl.value;

        spinnerEl.classList.remove("d-none");
        searchResultsEl.textContent = "";
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchText;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(respone) {
                return respone.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                display_results(search_results);
            });
    }
}
searchInputEl.addEventListener("keydown", searchWikipidia);