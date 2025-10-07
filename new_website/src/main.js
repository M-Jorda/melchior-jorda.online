import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './pages/Home.vue'
import Projects from './pages/Projects.vue'
import About from './pages/About.vue'
import Contact from './pages/Contact.vue'
import Resume from './pages/Resume.vue'
import NotFound from './pages/NotFound.vue'
import './styles/tailwind.css'
import i18n from './i18n'

const routes = [
  { path: '/', component: Home, meta: { titleKey: 'home.title' } },
  { path: '/projects', component: Projects, meta: { titleKey: 'projects.title' } },
  { path: '/about', component: About, meta: { titleKey: 'about.title' } },
  { path: '/resume', component: Resume, meta: { titleKey: 'resume.title' } },
  { path: '/contact', component: Contact, meta: { titleKey: 'contact.title' } },
  { path: '/:pathMatch(.*)*', component: NotFound, meta: { titleKey: 'nav.not_found' } }
]

const router = createRouter({ history: createWebHistory(), routes })

router.afterEach((to) => {
  const key = to.meta && to.meta.titleKey ? to.meta.titleKey : null
  const title = key && i18n && i18n.global && i18n.global.t
    ? i18n.global.t(key)
    : (to.meta && to.meta.title) || ''
  document.title = `${title} · Melchior JORDA`
})

createApp(App).use(router).use(i18n).mount('#app')
