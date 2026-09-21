import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { usePwa } from './pwa'

import App from './App.vue'
import router from './router'

usePwa()

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
