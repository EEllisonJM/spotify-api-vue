// If you're using ES modules then they can be imported directly:
import { createApp } from 'vue'
import App from './App.vue'

//Agregando Axios
import Axios from "axios";
import VueAxios from "vue-axios";

const app = createApp(App);
app.use(VueAxios, Axios);

app.mount("#app");