import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './pages/Home.vue'
import QuiSommesNous from './pages/QuiSommesNous.vue'
import NosTarifs from './pages/NosTarifs.vue'
import Contact from './pages/Contact.vue'
import './assets/tailwind.css'

const routes = [
  { path: '/', component: Home },
  { path: '/qui-sommes-nous', component: QuiSommesNous },
  { path: '/nos-tarifs', component: NosTarifs },
  { path: '/contact', component: Contact }
]

const router = createRouter({
  history: createWebHistory('/miss-boat/dist/'),
  routes
})

createApp(App).use(router).mount('#app')
