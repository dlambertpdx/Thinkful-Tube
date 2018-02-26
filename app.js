const API_KEY = 'AIzaSyCBxwI_1JYyOQ0a5pi8ETEoYo1GXHOFVBM';
const URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback){
  const settings = {
    url: URL,
    part: 'snippet',
    key: API_KEY,
    q:searchTerm
  };
}
