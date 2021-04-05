import axios from 'axios'
//https://stackabuse.com/making-asynchronous-http-requests-in-javascript-with-axios/
export async function getToken(clientId, clientSecret) {
  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    //scope: "playlist-modify-public playlist-modify-private",
    body: "grant_type=client_credentials",   
  }); 

  const data = await result.json();
  return data.access_token;
}

export function getCategoriesWithAxios() {
  var url = "https://api.spotify.com/v1/browse/categories";
  axios.get(url).then((result) => {
    console.log(result.data.categories.items);
    return result.data.categories.items;
  })
}
//https://developer.spotify.com/documentation/general/guides/authorization-guide/
export function search(value, token) {
  var url = "https://api.spotify.com/v1/search?q=" + value + "&type=track&limit=20";
  axios.get(url,
    {
      headers: { Authorization: "Bearer " + token },
    }).then((result) => {
      //console.log(result.data.tracks.items);
      return result.data.tracks.items;
    })
}
export async function getCategories(token) {
  const result = await fetch(
    `https://api.spotify.com/v1/browse/categories`,
    {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    }
  );
  const data = await result.json();
  //search("panteon rococo", token);
  return data.categories.items;
}
export async function getResultFromSearchItem(token, valor) {//Type=[track|artist]
  const result = await fetch(
    `https://api.spotify.com/v1/search?q=tamagochi&type=track&limit=20`,
    {
      method: "GET",
    }
  );
  const data = await result.json();
  return data.tracks.items;
}

export async function addTrackToPlaylist(token, uri) {//Type=[track|artist]
  const result = await fetch(
    `https://api.spotify.com/v1/playlists/5JyAskpeECOkFMSb44HR8m/tracks?uris=` + uri,
    {
      method: "POST",
      headers: {
        'Authorization': "Bearer " + token,
        'Content-Type': "application/json",
        'Accept': "application/json"
      },
    }
  );
  const data = await result.json();
  return data.snapshot_id;
}