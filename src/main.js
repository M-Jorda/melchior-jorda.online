import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './pages/Home.vue'
import './styles/tailwind.css'
import i18n from './i18n'

const routes = [
  { path: '/', component: Home, meta: { titleKey: 'home.title' } },
  { path: '/projects', component: () => import('./pages/Projects.vue'), meta: { titleKey: 'projects.title' } },
  { path: '/about', component: () => import('./pages/About.vue'), meta: { titleKey: 'about.title' } },
  { path: '/resume', component: () => import('./pages/Resume.vue'), meta: { titleKey: 'resume.title' } },
  { path: '/contact', component: () => import('./pages/Contact.vue'), meta: { titleKey: 'contact.title' } },
  { path: '/42', component: () => import('./pages/FortyTwo.vue'), meta: { titleKey: 'fortyTwo.pageTitle' } },
  { path: '/:pathMatch(.*)*', component: () => import('./pages/NotFound.vue'), meta: { titleKey: 'nav.not_found' } }
]

const router = createRouter({ history: createWebHistory(), routes })

router.afterEach((to) => {
  const key = to.meta && to.meta.titleKey ? to.meta.titleKey : null
  const title = key && i18n && i18n.global && i18n.global.t
    ? i18n.global.t(key)
    : (to.meta && to.meta.title) || ''
  document.title = `${title} · Melchior JORDA`
  // GA4 pageview tracking
  if (typeof gtag !== 'undefined' && import.meta.env.VITE_GA_ID) {
    gtag('event', 'page_view', { page_path: to.fullPath })
  }
})

createApp(App).use(router).use(i18n).mount('#app')
