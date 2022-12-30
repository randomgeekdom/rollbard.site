import { createApp } from 'vue'
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./assets/css/app.css";
import { createAuth0 } from '@auth0/auth0-vue';

createApp(App).use(router).use(createPinia()).use(
    createAuth0({
      domain: "storysuite-auth.us.auth0.com",
      client_id: "jTEB1v1oxIEe46mo3uabBJlV4uB0hBsV",
      redirect_uri: window.location.origin
    })
  ).mount('#app')