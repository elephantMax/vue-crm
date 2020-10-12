import { createApp } from 'vue'
import App from './App.vue'
import {VuelidatePlugin} from '@vuelidate/core'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

const app = createApp(App);
app.use(store)
app.use(router)
app.use(VuelidatePlugin)
app.mount('#app');

// app.use(store).use(router).use(Vuelidate).mount('#app')
