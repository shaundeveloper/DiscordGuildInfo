import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

Vue.config.productionTip = false

import '@/assets/css/index.css';

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
