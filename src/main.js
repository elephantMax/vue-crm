import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {Field, Form} from 'vee-validate'
import messagePlugin from '@/utils/message.plugin';
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'





const app = createApp(App);
app.use(messagePlugin);
app.component('Field', Field);
app.component('Form', Form);
app.use(store)
app.use(router)
app.mount('#app');
// app.use(store).use(router).use(Vuelidate).mount('#app')
