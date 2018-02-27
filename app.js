$(() =>{

const API_KEY = 'AIzaSyCBxwI_1JYyOQ0a5pi8ETEoYo1GXHOFVBM';
const URL = 'https://www.googleapis.com/youtube/v3/search';

function callApi(searchTerm, callback){
  const settings = {
    url: URL,
    key: API_KEY,
    part: 'snippet',
    q:searchTerm,
    maxResults: 6
  };
}

function renderResult(result) {
// return html and string literals for results
}


function displayResults(obj) {
// add val to results on html page
}


function handleResults(data) {
// remove hidden class from results
}


function watchSubmit() {
// what happens when submit button is clicked
}


watchSubmit();
});
