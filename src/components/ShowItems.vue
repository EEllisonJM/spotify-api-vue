<template>
  <h2>Canciones a agregar</h2>
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
</template>

<script>
import {
  getResultFromSearchItem,
  addTrackToPlaylist,
  getToken,
} from "../functions/spotifyAPI";
export default {
  data: {
    message: "La sexta vocal",
    token:""
  },

  async setup() {
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
    const token = await getToken(clientId, clientSecret);
    this.token=token
    /*const items =await getResultFromSearchItem(token, "Lavocal");
    return {
      items,
    };*/
  },
  // definir métodos bajo el objeto `methods`
  methods: {
    addTrackByUriId: function (uri) {
      // `this` dentro de los métodos apunta a la instancia de Vue
      //const clientId = import.meta.env.VITE_CLIENT_ID;
    //const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
    //const token = await getToken(clientId, clientSecret);
      alert("Agregado : " + addTrackToPlaylist(token, uri));
      // `evento` es el evento DOM nativo
      // if (event) {
      //   alert(event.target.tagName);
      // }
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