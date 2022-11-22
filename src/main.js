import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

import "/src/index.css";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

app.config.globalProperties.$version = window.__VERSION__;

app.mount("#app");
