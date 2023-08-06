import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Cookies } from 'js-cookie'
const app = createApp(App)
app.config.globalProperties.$cookies = Cookies
app.use(store).use(router).mount('#app')
// app.config.globalProperties.$cookies = Cookies
// createApp(App).use(store).use(router).mount('#app')
