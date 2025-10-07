<template>
  <footer class="bg-primary dark:bg-slate-800 text-neutral dark:text-accent-50 py-6 md:py-8 transition-colors duration-300">
    <div class="container mx-auto px-4 text-sm text-neutral dark:text-accent-50">
      <!-- Layout responsive: colonne sur mobile, ligne sur desktop -->
      <div class="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        <!-- Copyright -->
        <div class="text-center md:text-left">© {{ year }} Melchior JORDA</div>
        
        <!-- Liens -->
        <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center text-center">
          <a 
            :href="linkedin" 
            target="_blank" 
            rel="noopener" 
            class="text-orange-200 dark:text-orange-400 hover:text-orange-300 dark:hover:text-orange-300 transition-colors duration-300"
          >
            {{ $t('footer.linkedin') }}
          </a>
          <a 
            :href="cv" 
            target="_blank" 
            rel="noopener" 
            class="text-orange-200 dark:text-orange-400 hover:text-orange-300 dark:hover:text-orange-300 transition-colors duration-300"
          >
            {{ $t('footer.download_cv') }}
          </a>
          <a 
            :href="mailtoObfuscated" 
            @click.prevent="openMail" 
            class="text-neutral dark:text-accent-50 hover:text-orange-200 dark:hover:text-orange-300 transition-colors duration-300"
          >
            Email
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
      linkedin: 'https://www.linkedin.com/in/melchior-jorda',
      cv: '/assets/Melchior-JORDA-CV.pdf',
      // simple obfuscation for scraping bots
      mailUser: 'melchior.jorda',
      mailHost: 'example.com'
    }
  },
  computed: {
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
