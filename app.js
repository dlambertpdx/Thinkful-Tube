const API_KEY = 'AIzaSyCBxwI_1JYyOQ0a5pi8ETEoYo1GXHOFVBM';
const URL = 'https://www.googleapis.com/youtube/v3/search';


function callApi(searchTerm, pageToken, callback){
  const query = {
    type: 'video',
    q: searchTerm,
    maxResults: 3,
    part: 'snippet',
    key: API_KEY,
    pageToken: pageToken
  };

  $.getJSON(URL, query, callback)
}

function  watchSubmit() {
  $('form').submit((e) => {
    e.preventDefault();
    const queryTarget = $(e.currentTarget).find('.js-query');
    const query = queryTarget.val();
    callApi(query, undefined, displayResults);
  });
}

function watchPageToken() {
  $('.js-search-results').on('click', '#nextPage', (e) => {
    callApi(searchTerm, nextPage, displayResults)
  });
  $('.js-search-results').on('click', '#prevPage', (e) => {
    callApi(searchTerm, prevPage, displayResults)
  });
}

function renderPageNav(data){
  nextPage = data.nextPageToken;
  prevPage = data.prevPageToken;
  let startTag = `<div class='pageNav'><form><fieldset>`
  let endTag = `</fieldset></form></div>`
  if (prevPage) {
      startTag += `<button type='button' id='prevPage' value='Prev'>Prev</button>`
    }
    if (nextPage) {
      startTag += `<button type='button' id='nextPage' value='Next'>Next</button>`
    }
    return startTag + endTag
  }

function renderResult(result) {
  return(`<div class='result'>
    <a href='https://www.youtube.com/watch?v=${result.id.videoId}' target='_blank' class= 'thumbnail' role='link'>
    <img src='${result.snippet.thumbnails.medium.url}' alt='video thumbnail'></a>
    <p class='caption'>${result.snippet.title}</p></div>`)
}

function displayResults(data) {
  $('.js-search-results').html(data.items.map(renderResult)).append(renderPageNav(data));
  console.log(data)
}
$(watchSubmit);
$(watchPageToken);
