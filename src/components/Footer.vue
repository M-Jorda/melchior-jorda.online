<template>
  <footer class="bg-primary dark:bg-slate-800 text-neutral dark:text-accent-50 py-6 md:py-8 transition-colors duration-300">
    <div class="container mx-auto px-4 text-sm text-neutral dark:text-accent-50">
      <!-- Layout responsive: colonne sur mobile, ligne sur desktop -->
      <div class="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        <!-- Copyright -->
        <div class="text-center md:text-left">© {{ year }} Melchior JORDA</div>
        
        <!-- Liens -->
        <nav class="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center text-center" aria-label="Footer links">
          <a
            :href="linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="text-orange-200 dark:text-orange-400 hover:text-orange-300 dark:hover:text-orange-300 transition-colors duration-300"
            aria-label="Visit LinkedIn profile"
          >
            {{ $t('footer.linkedin') }}
          </a>
          <a
            :href="github"
            target="_blank"
            rel="noopener noreferrer"
            class="text-orange-200 dark:text-orange-400 hover:text-orange-300 dark:hover:text-orange-300 transition-colors duration-300"
            aria-label="Visit GitHub profile"
          >
            GitHub
          </a>
          <a
            :href="cvPath"
            :download="cvFilename"
            class="text-orange-200 dark:text-orange-400 hover:text-orange-300 dark:hover:text-orange-300 transition-colors duration-300"
            aria-label="Download CV as PDF"
          >
            {{ $t('footer.download_cv') }}
          </a>
          <a
            :href="mailtoObfuscated"
            @click.prevent="openMail"
            class="text-neutral dark:text-accent-50 hover:text-orange-200 dark:hover:text-orange-300 transition-colors duration-300"
            aria-label="Send email"
          >
            Email
          </a>
        </nav>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
      linkedin: 'https://www.linkedin.com/in/melchior-jorda-354a31270',
      github: 'https://github.com/M-Jorda',
      mailUser: 'jorda.j.fr',
      mailHost: 'gmail.com'
    }
  },
  computed: {
    cvPath() {
      const map = { fr: 'FR', en: 'EN', es: 'ES' }
      const code = map[this.$i18n.locale] || 'EN'
      return `/assets/Melchior_Jorda_FullStack_${code}.pdf`
    },
    cvFilename() {
      const map = { fr: 'FR', en: 'EN', es: 'ES' }
      const code = map[this.$i18n.locale] || 'EN'
      return `Melchior_Jorda_FullStack_${code}.pdf`
    },
    mailtoObfuscated() {
      return `mailto:${this.mailUser}@${this.mailHost}`
    }
  },
  methods: {
    openMail() {
      window.location.href = this.mailtoObfuscated
    }
  }
}
</script>
