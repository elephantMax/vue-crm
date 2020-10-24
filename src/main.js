import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {Field, Form} from 'vee-validate'
import messagePlugin from '@/utils/message.plugin';
import Loader from '@/components/app/Loader';
import Paginate from '@/components/app/Pagination';
import tooltipDirective from '@/directives/tooltip.directive';
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'


import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyDMcSIBiBBsY3ETPpxnho4Lh5t5MlRj5XQ",
    authDomain: "vue-crm-dd9be.firebaseapp.com",
    databaseURL: "https://vue-crm-dd9be.firebaseio.com",
    projectId: "vue-crm-dd9be",
    storageBucket: "vue-crm-dd9be.appspot.com",
    messagingSenderId: "253228525304",
    appId: "1:253228525304:web:f6e05326afe8fe8548bd0d",
    measurementId: "G-XZW3DN68GZ"
};

firebase.initializeApp(firebaseConfig);

let app;

firebase.auth().onAuthStateChanged(()=>{
    if(!app){
        app = createApp(App);
        app.use(messagePlugin);
        app.directive('tooltip', tooltipDirective);
        app.component('Field', Field);
        app.component('Form', Form);
        app.component('Loader', Loader);
        app.component('Paginate', Paginate);
        app.use(store);
        app.use(router);
        app.mount('#app');
    }
});

// app.use(store).use(router).use(Vuelidate).mount('#app')
