import { createApp } from "vue";
import App from "./App.vue";
import { notificationKey, notificationProvider } from "./notifications";
import router from "./router";
import "./style.css";

createApp(App)
  .use(router)
  .provide(notificationKey, notificationProvider)
  .mount("#app");
