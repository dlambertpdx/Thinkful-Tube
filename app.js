const API_KEY = 'AIzaSyCBxwI_1JYyOQ0a5pi8ETEoYo1GXHOFVBM';
const URL = 'https://www.googleapis.com/youtube/v3/search';
let nextPage;
let prevPage;
let searchedTerm;


//get data from API
function callApi(searchTerm, pageToken, callback){
  const query = {
    type: 'video',
    q: searchTerm,
    maxResults: 6,
    part: 'snippet',
    key: API_KEY,
    pageToken: pageToken
  };
  searchedTerm = searchTerm;
  $.getJSON(URL, query, callback)
}

// display results in result div
function renderResult(result) {
  return`<div class='result'>
    <a href='https://www.youtube.com/watch?v=${result.id.videoId}' target='_blank' class='thumbnail' role='link'>
    <img src='${result.snippet.thumbnails.medium.url}' class='thumbs' alt='video thumbnail'></a>
    <p class='caption'>${result.snippet.title}</p></div>`
}

function displayResults(data) {
  $('.js-search-results').prop('hidden', false).html(data.items.map(renderResult)).append(pageNav(data));
}

function  watchSubmit() {
  $('form').submit((e) => {
    e.preventDefault();
    const queryTarget = $(e.currentTarget).find('.js-query');
    const query = queryTarget.val();
    queryTarget.val('');
    callApi(query, undefined, displayResults);
    $('.js-search-results').css('visibility', 'visible');
  });
}

function watchPageToken() {
  $('.js-search-results').on('click', '#nextPage', (e) => {
    callApi(searchedTerm, nextPage, displayResults)
  });
  $('.js-search-results').on('click', '#prevPage', (e) => {
    callApi(searchedTerm, prevPage, displayResults)
  });
}

//display page navigation
function pageNav(data) {
  nextPage = data.nextPageToken;
  prevPage = data.prevPageToken;
  let openTag = `<div id='pageNav'><form><fieldset>`
  let closeTag = `</fieldset></form></div>`
  if (prevPage) {
    openTag += `<button type='button' class='navButton' id='prevPage' value='Prev'><i class="fas fa-angle-left fa-lg"></i> Prev</button>`
  }
  if (nextPage) {
    openTag += `<button type='button' class='navButton' id='nextPage' value='Next'>Next <i class="fas fa-angle-right fa-lg"></i></button>`
  }
  return openTag + closeTag
}

$(watchSubmit);
$(watchPageToken);
