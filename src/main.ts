import {createApp} from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia'
import router from './router/index';
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fab} from '@fortawesome/free-brands-svg-icons';

library.add(fas);
library.add(far);
library.add(fab);

import "bootstrap/dist/css/bootstrap.min.css";
import './assets/style.scss';
import "bootstrap/dist/js/bootstrap.js";

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(router);
app.use(createPinia());

app.mount('#app');
