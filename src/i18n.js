import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import fr from './locales/fr.json'
import es from './locales/es.json'

const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('lang') : null

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: saved || 'en',
  fallbackLocale: 'en',
  messages: { en, fr, es }
})

export default i18n
