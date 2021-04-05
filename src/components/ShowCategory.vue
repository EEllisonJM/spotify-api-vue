<template>
  <h2>Buscar canciones</h2>
  <input v-model="message" placeholder="Canción" @keyup.enter="submit" />
  <div class="wrapper">
    <div v-for="item in items" :key="item.album.name">
      <img :src="item.album.images[2].url" alt="" />
      <div>{{ item.album.name }}</div>
      <div>{{ item.artists[0].name }}</div>
      <div>{{ item.name }}</div>
      <button v-on:click="addTrackByUriId(item.uri)" type="button">
        Agregar
      </button>
    </div>
  </div>
  <!--<div class="wrapper">
    <div v-for="category in categories" :key="category.name">
      <img :src="category.icons[0].url" alt="" />
      <div>{{ category.name }}</div>
    </div>
  </div>-->
</template>

<script>
//https://codingpotions.com/vue-axios
//https://stackoverflow.com/questions/44617825/passing-headers-with-axios-post-request
import axios from "axios";
import {
  getCategories,
  getToken,
  addTrackToPlaylist,
} from "../functions/spotifyAPI";
export default {
  data() {
    return {
      message: "",
      items: {},
    };
  },
  async setup() {
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
    //const token =
    const token = await getToken(clientId, clientSecret);
    //"BQCZmsDAClfJO4bUHjfRxX_JFac6SqffzUtUdbfLGA0b_tGDCaokVtSX9C7Ngvzn2ZQ5wIQnaIgZIWK5KiqS2";
    //"BQBvxB4vYDU_VMobGOOCxFWaiT93mdGPhgtKDOodc_Yh3ntVZncfvjeL1t6tijJ-CI2M5Y8ySKGf8YBadRiTYwOM6rNXIAVbe6uh1hh0EaWLA_FM0h3qHKHz6gKnslRcVJE2Y8CepjkgltlsG8VahNwtT1NbK3_gYhw6GmTDzs4_pH7bxSPa-2zsM5D58a8hYJx27IGQszTGWWpjjquvad79NB4lq46RklyltPK22_bfYgBgUBQns2pNFsfvhbUXmSwLFAdxUYLNVrdjnkBA70Fl_tUta9uj-IvjL0do";
    //const categories = await getCategories(token);
    return {
      // anything returned here will be available for the rest of the component
      //categories,
      token,
    };
  },

  methods: {
    submit: function (value) {
      //console.log(this.token);
      //console.log(search("Panteon", this.token));
      var url =
        "https://api.spotify.com/v1/search?q=" +
        this.message +
        "&type=track&limit=20";
      axios
        .get(url, {
          headers: { Authorization: "Bearer " + this.token },
        })
        .then((result) => {
          console.log(this.token);
          console.log(this.message);
          console.log(result.data.tracks.items);
          //return result.data.;
          this.items = result.data.tracks.items;
          //window.location.reload();
        });
    },
    addTrackByUriId: function (uri) {
      // `this` dentro de los métodos apunta a la instancia de Vue
      //https://developer.spotify.com/documentation/general/guides/authorization-guide/
      addTrackToPlaylist(this.token, uri);
      alert("Agregado : ");
    },
  },
};
</script>

<style>
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 5px;
}
</style>