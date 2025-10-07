<template>
  <header 
    class="header-navbar border-b border-white/20 dark:border-slate-700/50 py-4 fixed left-0 right-0 z-40"
    :style="headerStyle"
    :class="{ 
      'header-hidden': !showHeader,
      'header-scrolled': lastScrollPosition > scrollThreshold
    }"
  >
    <div class="container mx-auto px-4 flex items-center justify-between">
      <!-- Logo et titre -->
      <div class="flex items-center gap-2 md:gap-3">
        <img src="/favicon.svg" alt="logo" class="w-8 h-8 md:w-10 md:h-10" />
        <div>
          <div class="text-sm md:text-lg font-semibold text-primary dark:text-accent-50">
            Melchior JORDA 
            <span class="hidden sm:inline text-xs md:text-sm text-slate-400">[{{ currentLang }}]</span>
          </div>
          <div class="text-xs md:text-sm text-slate-500 dark:text-accent-200">Junior Web Developer</div>
        </div>
      </div>

      <!-- Menu hamburger (visible quand le menu desktop est caché) -->
      <button 
        @click="toggleMobileMenu" 
        class="lg:hidden p-2 text-primary dark:text-accent-50 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded hover:bg-orange-50 dark:hover:bg-slate-700 transition-colors"
        aria-label="Toggle menu"
        type="button"
      >
        <svg v-if="!isMobileMenuOpen" class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
        <svg v-else class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>

      <!-- Navigation desktop (cachée sur mobile/tablette) -->
      <nav class="hidden lg:block">
        <ul class="flex gap-4 xl:gap-6 items-center">
          <li><router-link class="nav-link" to="/">{{ $t('nav.home') }}</router-link></li>
          <li><router-link class="nav-link" to="/projects">{{ $t('nav.projects') }}</router-link></li>
          <li><router-link class="nav-link" to="/about">{{ $t('nav.about') }}</router-link></li>
          <li><router-link class="nav-link" to="/resume">{{ $t('nav.resume') }}</router-link></li>
          <li><router-link class="nav-link" to="/contact">{{ $t('nav.contact') }}</router-link></li>

          <li class="flex items-center gap-2">
            <button @click.prevent="onLang('en')" :aria-pressed="currentLang==='en'" class="flag-btn" title="English">
              <svg width="20" height="14" viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg" fill="none">
                <rect width="20" height="14" fill="#fff8f3" />
                <path d="M0 0L20 14M20 0L0 14" stroke="#ff7a18" stroke-width="2" />
              </svg>
            </button>
            <button @click.prevent="onLang('fr')" :aria-pressed="currentLang==='fr'" class="flag-btn" title="Français">
              <svg width="20" height="14" viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg" fill="none">
                <rect width="6.66" height="14" x="0" fill="#0b5fff" />
                <rect width="6.66" height="14" x="6.66" fill="#fff" />
                <rect width="6.68" height="14" x="13.32" fill="#ff4b3e" />
              </svg>
            </button>
            <button @click.prevent="onLang('es')" :aria-pressed="currentLang==='es'" class="flag-btn" title="Español">
              <svg width="20" height="14" viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg" fill="none">
                <rect width="20" height="14" fill="#ffdd00" />
                <rect y="3" width="20" height="8" fill="#c60b1e" />
              </svg>
            </button>
          </li>

          <li>
            <button @click.prevent="toggleTheme" :aria-pressed="isDark" class="px-2 xl:px-3 py-1 text-sm rounded border border-orange-500 text-orange-500 hover:bg-orange-50 dark:hover:bg-slate-700 transition-colors duration-300">
              <span class="sr-only">Toggle theme</span>
              <span aria-hidden="true">{{ isDark ? 'Dark' : 'Light' }}</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Menu mobile (overlay) -->
    <transition name="mobile-menu">
      <div 
        v-if="isMobileMenuOpen" 
        class="lg:hidden fixed inset-0 top-[73px] bg-white dark:bg-primary z-50 overflow-y-auto"
      >
        <nav class="container mx-auto px-4 py-6">
          <ul class="flex flex-col gap-4">
            <li>
              <router-link 
                @click="closeMobileMenu" 
                class="nav-link-mobile" 
                to="/"
              >
                {{ $t('nav.home') }}
              </router-link>
            </li>
            <li>
              <router-link 
                @click="closeMobileMenu" 
                class="nav-link-mobile" 
                to="/projects"
              >
                {{ $t('nav.projects') }}
              </router-link>
            </li>
            <li>
              <router-link 
                @click="closeMobileMenu" 
                class="nav-link-mobile" 
                to="/about"
              >
                {{ $t('nav.about') }}
              </router-link>
            </li>
            <li>
              <router-link 
                @click="closeMobileMenu" 
                class="nav-link-mobile" 
                to="/resume"
              >
                {{ $t('nav.resume') }}
              </router-link>
            </li>
            <li>
              <router-link 
                @click="closeMobileMenu" 
                class="nav-link-mobile" 
                to="/contact"
              >
                {{ $t('nav.contact') }}
              </router-link>
            </li>

            <!-- Langues -->
            <li class="py-3 border-b border-slate-200 dark:border-slate-700">
              <div class="text-sm text-slate-500 dark:text-accent-200 mb-2">Language</div>
              <div class="flex gap-3">
                <button @click.prevent="onLang('en')" :aria-pressed="currentLang==='en'" class="flag-btn" title="English">
                  <svg width="24" height="17" viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg" fill="none">
                    <rect width="20" height="14" fill="#fff8f3" />
                    <path d="M0 0L20 14M20 0L0 14" stroke="#ff7a18" stroke-width="2" />
                  </svg>
                </button>
                <button @click.prevent="onLang('fr')" :aria-pressed="currentLang==='fr'" class="flag-btn" title="Français">
                  <svg width="24" height="17" viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg" fill="none">
                    <rect width="6.66" height="14" x="0" fill="#0b5fff" />
                    <rect width="6.66" height="14" x="6.66" fill="#fff" />
                    <rect width="6.68" height="14" x="13.32" fill="#ff4b3e" />
                  </svg>
                </button>
                <button @click.prevent="onLang('es')" :aria-pressed="currentLang==='es'" class="flag-btn" title="Español">
                  <svg width="24" height="17" viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg" fill="none">
                    <rect width="20" height="14" fill="#ffdd00" />
                    <rect y="3" width="20" height="8" fill="#c60b1e" />
                  </svg>
                </button>
              </div>
            </li>

            <!-- Toggle theme -->
            <li class="py-3">
              <button @click.prevent="toggleTheme" :aria-pressed="isDark" class="w-full px-4 py-2 rounded border border-orange-500 text-orange-500 hover:bg-orange-50 dark:hover:bg-slate-700 transition-colors duration-300">
                <span class="sr-only">Toggle theme</span>
                <span aria-hidden="true">{{ isDark ? '🌙 Dark Mode' : '☀️ Light Mode' }}</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </transition>
  </header>
</template>

<script>
import i18n from '../i18n'

export default {
  name: 'Header',
  data() {
    const savedTheme = typeof localStorage !== 'undefined' ? localStorage.getItem('theme') : null
    return {
      currentLang: (i18n && i18n.global && i18n.global.locale) ? i18n.global.locale.value : (localStorage.getItem('lang') || 'en'),
      isDark: savedTheme === 'dark' || (savedTheme === null && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches),
      isMobileMenuOpen: false,
      showHeader: true,
      lastScrollPosition: 0,
      scrollThreshold: 50,
      scrollContainer: null
    }
  },
  computed: {
    headerStyle() {
      const baseOpacity = this.lastScrollPosition > this.scrollThreshold ? 0.85 : 0.65
      const blurAmount = this.lastScrollPosition > this.scrollThreshold ? '20px' : '16px'
      
      if (this.isDark) {
        return {
          background: `rgba(7, 16, 36, ${baseOpacity})`,
          backdropFilter: `blur(${blurAmount}) saturate(180%)`,
          WebkitBackdropFilter: `blur(${blurAmount}) saturate(180%)`
        }
      } else {
        return {
          background: `rgba(255, 248, 243, ${baseOpacity})`,
          backdropFilter: `blur(${blurAmount}) saturate(180%)`,
          WebkitBackdropFilter: `blur(${blurAmount}) saturate(180%)`
        }
      }
    }
  },
  created() {
    if (this.isDark) document.documentElement.classList.add('dark')
  },
  mounted() {
    // Obtenir l'élément #app qui est le conteneur scrollable
    this.scrollContainer = document.getElementById('app')
    
    if (this.scrollContainer) {
      this.lastScrollPosition = this.scrollContainer.scrollTop
      // Écouter le scroll sur #app
      this.scrollContainer.addEventListener('scroll', this.handleScroll, { passive: true })
    } else {
      // Fallback sur window si #app n'est pas trouvé
      window.addEventListener('scroll', this.handleScroll, { passive: true })
    }
  },
  beforeUnmount() {
    if (this.scrollContainer) {
      this.scrollContainer.removeEventListener('scroll', this.handleScroll)
    } else {
      window.removeEventListener('scroll', this.handleScroll)
    }
    // Nettoyer le style du body si le composant est détruit
    document.body.style.overflow = ''
  },
  methods: {
    handleScroll() {
      // Obtenir la position de scroll depuis le conteneur #app
      const currentScrollPosition = this.scrollContainer 
        ? this.scrollContainer.scrollTop 
        : (window.pageYOffset || window.scrollY || document.documentElement.scrollTop)
      
      // Ne rien faire si on est tout en haut de la page
      if (currentScrollPosition < this.scrollThreshold) {
        this.showHeader = true
        this.lastScrollPosition = currentScrollPosition
        return
      }

      // Éviter les petits mouvements parasites avec un seuil plus élevé pour plus de fluidité
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 10) {
        return
      }

      // Déterminer la direction du scroll
      if (currentScrollPosition < this.lastScrollPosition) {
        // Scroll vers le haut
        this.showHeader = true
      } else {
        // Scroll vers le bas
        this.showHeader = false
        // Fermer le menu mobile si ouvert
        if (this.isMobileMenuOpen) {
          this.closeMobileMenu()
        }
      }

      this.lastScrollPosition = currentScrollPosition
    },
    onLang(val) {
      this.currentLang = val
      if (i18n && i18n.global && i18n.global.locale) {
        i18n.global.locale.value = val
      }
      document.documentElement.lang = val
      localStorage.setItem('lang', val)
    },
    toggleTheme() {
      this.isDark = !this.isDark
      if (this.isDark) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
      }
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen
      // Empêcher le scroll du body quand le menu est ouvert
      if (this.isMobileMenuOpen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false
      document.body.style.overflow = ''
    }
  }
}
</script>

<style scoped>
/* Animation fluide pour la navbar avec effet glass */
.header-navbar {
  top: 0;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), 
              box-shadow 0.3s ease,
              border-color 0.3s ease,
              background 0.3s ease,
              backdrop-filter 0.3s ease;
}

/* Effet glass plus prononcé au scroll */
.header-scrolled {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 
              0 2px 4px -1px rgba(0, 0, 0, 0.06),
              0 0 0 1px rgba(255, 122, 24, 0.1) inset;
}

.dark .header-scrolled {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 
              0 2px 4px -1px rgba(0, 0, 0, 0.2),
              0 0 0 1px rgba(255, 159, 67, 0.1) inset;
}

.header-hidden {
  transform: translateY(-100%);
}

/* Animation pour le menu mobile */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.mobile-menu-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.mobile-menu-enter-to,
.mobile-menu-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/* Styles pour les liens de navigation desktop */
.nav-link {
  position: relative;
  padding: 0.5rem 0.75rem;
  color: var(--color-primary);
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 0.375rem;
}

.dark .nav-link {
  color: #fff8f3;
}

.nav-link:hover {
  color: #ff7a18;
  background-color: rgba(255, 122, 24, 0.05);
}

.dark .nav-link:hover {
  color: #ff9f43;
  background-color: rgba(255, 159, 67, 0.1);
}

/* Style pour le lien actif - avec barre en dessous */
.nav-link.router-link-active,
.nav-link.router-link-exact-active {
  color: #ff7a18;
  font-weight: 600;
}

.dark .nav-link.router-link-active,
.dark .nav-link.router-link-exact-active {
  color: #ff9f43;
}

.nav-link.router-link-active::after,
.nav-link.router-link-exact-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0.75rem;
  right: 0.75rem;
  height: 2px;
  background: linear-gradient(90deg, #ff7a18, #ff9f43);
  border-radius: 2px;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    transform: scaleX(0);
    opacity: 0;
  }
  to {
    transform: scaleX(1);
    opacity: 1;
  }
}

/* Styles pour les liens de navigation mobile */
.nav-link-mobile {
  display: block;
  padding: 0.75rem 0;
  font-size: 1.125rem;
  color: var(--color-primary);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-bottom: 1px solid #e2e8f0;
  position: relative;
  padding-left: 1rem;
}

.dark .nav-link-mobile {
  color: #fff8f3;
  border-bottom-color: #334155;
}

.nav-link-mobile:hover {
  color: #ff7a18;
  padding-left: 1.5rem;
}

.dark .nav-link-mobile:hover {
  color: #ff9f43;
}

/* Style pour le lien actif mobile - avec barre à gauche */
.nav-link-mobile.router-link-active,
.nav-link-mobile.router-link-exact-active {
  color: #ff7a18;
  font-weight: 600;
  padding-left: 1.5rem;
  background: linear-gradient(90deg, rgba(255, 122, 24, 0.05) 0%, transparent 100%);
}

.dark .nav-link-mobile.router-link-active,
.dark .nav-link-mobile.router-link-exact-active {
  color: #ff9f43;
  background: linear-gradient(90deg, rgba(255, 159, 67, 0.1) 0%, transparent 100%);
}

.nav-link-mobile.router-link-active::before,
.nav-link-mobile.router-link-exact-active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(180deg, #ff7a18, #ff9f43);
  border-radius: 0 2px 2px 0;
  animation: slideInLeft 0.3s ease;
}

@keyframes slideInLeft {
  from {
    transform: scaleY(0);
    opacity: 0;
  }
  to {
    transform: scaleY(1);
    opacity: 1;
  }
}
</style>
