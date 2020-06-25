
import Vue from 'vue'
import App from './App'
import router from './router'
import {firestorePlugin} from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'
import './assets/styles/main.css'
Vue.config.productionTip = false

Vue.use(firestorePlugin)
const firebaseConfig = {
  apiKey: "AIzaSyAt7zT2BhegRBrKLKGramLY4Af4coUJS4s",
    authDomain: "stolen-bikes-57254.firebaseapp.com",
    databaseURL: "https://stolen-bikes-57254.firebaseio.com",
    projectId: "stolen-bikes-57254",
    storageBucket: "stolen-bikes-57254.appspot.com",
    messagingSenderId: "346570891936",
    appId: "1:346570891936:web:511656f05b54c87f115fc5",
    measurementId: "G-DWMELJC4CC"
}
firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore()

new Vue({
  el: '#app-content',
  router,
  components: { App },
  template: '<App/>'
})