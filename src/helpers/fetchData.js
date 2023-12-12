async function fetchData (input) {
    if (process.env.NODE_ENV === "development") {
        console.log("fetchData fired");
    }
    
    const BASE_URL = "https://www.dictionaryapi.com/api/v3/references/thesaurus/json/";

    const response = await fetch(BASE_URL + input + "?key=" + process.env.REACT_APP_API_KEY);

    return await response.json();
}

export default fetchData