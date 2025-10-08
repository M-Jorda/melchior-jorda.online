<template>
  <section>
    <MetaTags 
      title="Contact | Melchior JORDA"
      :description="$t('contact.subtitle')"
      keywords="Contact, Melchior JORDA, Web Developer, Get in Touch, Hire Developer, LinkedIn, Email, Remote Work, Freelance Developer"
      url="/contact"
    />
    
    <!-- Titre responsive -->
    <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-primary dark:text-accent-50">
      {{ $t('contact.title') }}
    </h1>
    <p class="mt-2 sm:mt-3 text-sm sm:text-base text-slate-600 dark:text-accent-200">
      {{ $t('contact.subtitle') }}
    </p>

    <!-- Contact Links Cards -->
    <div class="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- LinkedIn Card -->
      <a 
        :href="linkedinUrl" 
        target="_blank"
        rel="noopener noreferrer"
        class="bg-accent-50 dark:bg-slate-800 p-5 rounded-lg relative group transition-all duration-300 hover:shadow-lg overflow-hidden block"
      >
        <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>
        <div class="flex items-start">
          <!-- LinkedIn icon -->
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-orange-500 dark:text-orange-400 mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
          </svg>
          <div>
            <h3 class="text-base font-semibold text-primary dark:text-accent-50">LinkedIn</h3>
            <p class="text-sm text-slate-600 dark:text-accent-200 mt-1">Melchior-jorda</p>
          </div>
        </div>
      </a>

      <!-- Email Card -->
      <a 
        :href="emailLink"
        @click.prevent="revealEmail"
        class="bg-accent-50 dark:bg-slate-800 p-5 rounded-lg relative group transition-all duration-300 hover:shadow-lg overflow-hidden block cursor-pointer"
      >
        <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>
        <div class="flex items-start">
          <!-- Email icon -->
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-orange-500 dark:text-orange-400 mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
          <div>
            <h3 class="text-base font-semibold text-primary dark:text-accent-50">Email</h3>
            <p class="text-sm text-slate-600 dark:text-accent-200 mt-1">{{ displayEmail }}</p>
          </div>
        </div>
      </a>

      <!-- Phone Card -->
      <a 
        :href="phoneLink"
        @click.prevent="revealPhone"
        class="bg-accent-50 dark:bg-slate-800 p-5 rounded-lg relative group transition-all duration-300 hover:shadow-lg overflow-hidden block cursor-pointer"
      >
        <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>
        <div class="flex items-start">
          <!-- Phone icon -->
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-orange-500 dark:text-orange-400 mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
          <div>
            <h3 class="text-base font-semibold text-primary dark:text-accent-50">{{ $t('contact.phone') }}</h3>
            <p class="text-sm text-slate-600 dark:text-accent-200 mt-1">{{ displayPhone }}</p>
          </div>
        </div>
      </a>
    </div>

    <!-- Message de succès flottant (Teleport pour sortir du flux) -->
    <Teleport to="body">
      <div v-if="showSuccessMessage" class="notification-wrapper">
        <div class="flex items-start notification-content">
          <svg class="w-6 h-6 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <div class="flex-1">
            <h3 class="font-bold text-base notification-title">{{ $t('contact.success_title') }}</h3>
            <p class="text-sm mt-1 notification-message">{{ $t('contact.success_message') }}</p>
          </div>
          <button @click="showSuccessMessage = false" class="ml-3 transition-colors flex-shrink-0 notification-close">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
    </Teleport>

    <!-- Formulaire responsive avec max-width adaptative -->
    <div class="mt-8 sm:mt-10">
      <h2 class="text-lg sm:text-xl md:text-2xl font-semibold text-primary dark:text-accent-50 mb-4">
        {{ $t('contact.form_title') }}
      </h2>
      <form @submit.prevent="handleSubmit" class="w-full">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <!-- Left Column: Name and Email -->
          <div class="space-y-3 sm:space-y-4">
            <label class="block">
              <span class="text-xs sm:text-sm font-medium text-primary dark:text-accent-50">
                {{ $t('contact.form.name') }}
              </span>
              <input 
                v-model="formData.name"
                name="name" 
                :placeholder="$t('contact.form.name_placeholder')" 
                class="block w-full border border-slate-300 dark:border-slate-600 rounded-lg p-2.5 sm:p-3 mt-1 text-sm sm:text-base bg-white dark:bg-slate-700 text-primary dark:text-accent-50 transition-colors duration-300 focus:border-orange-500 dark:focus:border-orange-400 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-900 focus:outline-none" 
                required 
              />
            </label>
            
            <label class="block">
              <span class="text-xs sm:text-sm font-medium text-primary dark:text-accent-50">
                {{ $t('contact.form.email') }}
              </span>
              <input 
                v-model="formData.email"
                name="email" 
                type="email" 
                :placeholder="$t('contact.form.email_placeholder')" 
                class="block w-full border border-slate-300 dark:border-slate-600 rounded-lg p-2.5 sm:p-3 mt-1 text-sm sm:text-base bg-white dark:bg-slate-700 text-primary dark:text-accent-50 transition-colors duration-300 focus:border-orange-500 dark:focus:border-orange-400 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-900 focus:outline-none" 
                required 
              />
            </label>
          </div>

          <!-- Right Column: Message -->
          <div class="flex flex-col h-full">
            <label class="block flex-1 flex flex-col">
              <span class="text-xs sm:text-sm font-medium text-primary dark:text-accent-50">
                {{ $t('contact.form.message') }}
              </span>
              <textarea 
                v-model="formData.message"
                name="message" 
                :placeholder="$t('contact.form.message_placeholder')" 
                class="block w-full border border-slate-300 dark:border-slate-600 rounded-lg p-2.5 sm:p-3 mt-1 text-sm sm:text-base bg-white dark:bg-slate-700 text-primary dark:text-accent-50 transition-colors duration-300 focus:border-orange-500 dark:focus:border-orange-400 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-900 focus:outline-none resize-none flex-1" 
                required
              ></textarea>
            </label>
          </div>
        </div>
        
        <!-- Honeypot anti-bot (champ invisible) -->
        <input 
          v-model="formData.website"
          type="text" 
          name="website" 
          class="hidden-field"
          tabindex="-1"
          autocomplete="off"
        />
        
        <button 
          class="mt-4 sm:mt-5 w-full md:w-auto px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base bg-orange-500 dark:bg-orange-400 text-white dark:text-primary rounded-lg hover:bg-orange-600 dark:hover:bg-orange-500 transition-colors duration-300 font-medium" 
          type="submit"
        >
          {{ $t('contact.form.send') }}
        </button>
      </form>
    </div>
  </section>
</template>

<script>
import emailjs from '@emailjs/browser'
import { emailjsConfig } from '../config/emailjs.config.js'
import MetaTags from '@/components/MetaTags.vue'

export default { 
  name: 'Contact',
  components: {
    MetaTags
  },
  data() {
    return {
      linkedinUrl: 'https://www.linkedin.com/in/melchior-jorda-354a31270',
      // Email obfuscation - split to avoid scraping
      emailPart1: 'jorda.j.fr',
      emailPart2: 'gmail.com',
      emailRevealed: false,
      // Phone obfuscation
      phoneParts: ['+33', '6', '66', '00', '81', '27'],
      phoneRevealed: false,
      // Form data
      formData: {
        name: '',
        email: '',
        message: '',
        website: '' // Honeypot - doit rester vide
      },
      // Message de confirmation
      showSuccessMessage: false
    }
  },
  computed: {
    emailLink() {
      if (this.emailRevealed) {
        return `mailto:${this.emailPart1}@${this.emailPart2}`
      }
      return '#'
    },
    displayEmail() {
      if (this.emailRevealed) {
        return `${this.emailPart1}@${this.emailPart2}`
      }
      return this.$t('contact.email_hidden')
    },
    phoneLink() {
      if (this.phoneRevealed) {
        return `tel:${this.phoneParts.join('')}`
      }
      return '#'
    },
    displayPhone() {
      if (this.phoneRevealed) {
        return `${this.phoneParts[0]} ${this.phoneParts[1]} ${this.phoneParts[2]} ${this.phoneParts[3]} ${this.phoneParts[4]} ${this.phoneParts[5]}`
      }
      return this.$t('contact.phone_hidden')
    }
  },
  methods: {
    revealEmail() {
      this.emailRevealed = true
      this.$nextTick(() => {
        window.location.href = this.emailLink
      })
    },
    revealPhone() {
      this.phoneRevealed = true
      this.$nextTick(() => {
        window.location.href = this.phoneLink
      })
    },
    async handleSubmit(event) {
      // Protection anti-bot : si le champ honeypot est rempli, c'est un bot
      if (this.formData.website) {
        console.warn('Bot detected - honeypot field filled')
        return // Ne rien faire si c'est un bot
      }
      
      try {
        // Paramètres du template
        const templateParams = {
          from_name: this.formData.name,
          from_email: this.formData.email,
          message: this.formData.message,
          to_email: `${this.emailPart1}@${this.emailPart2}` // Votre email
        }
        
        // Envoi de l'email via EmailJS
        await emailjs.send(
          emailjsConfig.serviceID, 
          emailjsConfig.templateID, 
          templateParams, 
          emailjsConfig.publicKey
        )
        
        // Sauvegarder dans sessionStorage pour afficher après rechargement
        sessionStorage.setItem('emailSent', 'true')
        
        // Recharger la page
        window.location.reload()
        
      } catch (error) {
        console.error('Erreur lors de l\'envoi:', error)
        alert('Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.')
      }
    }
  },
  mounted() {
    // Vérifier si un email vient d'être envoyé
    if (sessionStorage.getItem('emailSent') === 'true') {
      sessionStorage.removeItem('emailSent')
      this.showSuccessMessage = true
      
      // Masquer le message après 6 secondes
      setTimeout(() => {
        this.showSuccessMessage = false
      }, 6000)
    }
  }
}
</script>

<style scoped>
/* Honeypot anti-bot - complètement invisible */
.hidden-field {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}

/* Notification de succès flottante */
.notification-wrapper {
  position: fixed;
  top: 80px;
  right: 20px;
  z-index: 9999;
  max-width: 420px;
  padding: 1rem 1.25rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(240, 253, 244, 0.98));
  border: 2px solid #10b981;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.5), 0 0 0 1px rgba(16, 185, 129, 0.1);
  backdrop-filter: blur(10px);
  animation: fadeInNotification 0.5s ease-out forwards;
}

/* Couleurs du contenu en light mode */
.notification-content svg {
  color: #15803d; /* green-700 */
}

.notification-title {
  color: #14532d; /* green-900 */
}

.notification-message {
  color: #166534; /* green-800 */
}

.notification-close {
  color: #15803d; /* green-700 */
}

.notification-close:hover {
  color: #14532d; /* green-900 */
}

@keyframes fadeInNotification {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (prefers-color-scheme: dark) {
  .notification-wrapper {
    background: linear-gradient(135deg, rgba(6, 78, 59, 0.98), rgba(4, 120, 87, 0.98));
    border-color: #059669;
    box-shadow: 0 8px 24px rgba(16, 185, 129, 0.3);
  }
  
  /* Couleurs du contenu en dark mode */
  .notification-content svg {
    color: #4ade80; /* green-400 */
  }
  
  .notification-title {
    color: #bbf7d0; /* green-200 */
  }
  
  .notification-message {
    color: #86efac; /* green-300 */
  }
  
  .notification-close {
    color: #4ade80; /* green-400 */
  }
  
  .notification-close:hover {
    color: #bbf7d0; /* green-200 */
  }
}

/* Responsive pour mobile */
@media (max-width: 640px) {
  .notification-wrapper {
    top: 70px;
    right: 16px;
    left: 16px;
    max-width: calc(100vw - 32px);
    padding: 0.875rem 1rem;
  }
}
</style>
