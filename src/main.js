import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import 'primeicons/primeicons.css'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";


const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)  
pinia.use(piniaPersist) 
app.use(Toast)


app.mount('#app')
