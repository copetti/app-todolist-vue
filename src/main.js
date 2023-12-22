import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import '@/plugins/vee-validate'
import '@/plugins/axios'

import '@/assets/css/tailwind.css';

createApp(App).use(store).use(router).use(router).mount('#app')
