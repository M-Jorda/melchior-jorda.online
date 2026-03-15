<template>
  <section>
    <MetaTags
      :title="$t('about.title') + ' | Melchior JORDA'"
      :description="$t('about.intro')"
      keywords="Melchior JORDA, About, Skills, Experience, École 42, Web Developer, Software Developer, Vue.js, JavaScript, C Programming, Frontend, Backend, PHP, Symfony, Málaga, Spain"
      url="/about"
    />

    <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-primary dark:text-accent-50">
      {{ $t('about.title') }}
    </h1>

    <!-- 1. Value proposition — client-first opening (AC: 1, 2) -->
    <div class="mt-6 sm:mt-8">
      <div class="bg-accent-50 dark:bg-slate-800 p-6 sm:p-8 rounded-lg">
        <p class="text-base sm:text-lg text-slate-600 dark:text-accent-200 leading-relaxed">
          {{ $t('about.intro') }}
        </p>
        <p class="mt-3 text-sm font-medium text-orange-500 dark:text-orange-400">
          {{ $t('about.rates') }}
        </p>
      </div>
    </div>

    <!-- 2. Credentials — 42 + NASA proof-points (AC: 2, 3) -->
    <div class="mt-8 sm:mt-10">
      <h2 class="text-lg sm:text-xl font-semibold text-primary dark:text-accent-50 mb-4">
        {{ $t('about.credentials.title') }}
      </h2>
      <div class="flex flex-col gap-3">
        <p class="text-sm sm:text-base text-slate-600 dark:text-accent-200">
          {{ $t('about.credentials.fortyTwo') }}
        </p>
        <div>
          <NasaBadge variant="sm" />
        </div>
        <p class="text-sm sm:text-base text-slate-600 dark:text-accent-200">
          {{ $t('about.credentials.nasa') }}
        </p>
      </div>
    </div>

    <!-- 3. Skills section — conservée telle quelle -->
    <div class="mt-10 sm:mt-12">
      <h2 class="text-lg sm:text-xl md:text-2xl font-semibold text-primary dark:text-accent-50 mb-6">
        {{ $t('about.skills_title') }}
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <!-- Frontend Card -->
        <div class="bg-accent-50 dark:bg-slate-800 p-6 sm:p-8 rounded-lg relative group transition-shadow duration-300 hover:shadow-xl overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>
          <div class="flex items-start mb-4">
            <div class="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7 text-orange-500 dark:text-orange-400 transition-transform duration-300 group-hover:scale-110">
                <path d="M3 5v12a2 2 0 002 2h6v2H9v2h6v-2h-2v-2h6a2 2 0 002-2V5H3zm2 2h14v8H5V7z" />
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-bold text-primary dark:text-accent-50 mb-2">
                {{ $t('about.skills.frontend.title') }}
              </h3>
            </div>
          </div>
          <p class="text-base text-slate-600 dark:text-accent-200 leading-relaxed pl-1">
            {{ $t('about.skills.frontend.description') }}
          </p>
        </div>

        <!-- Backend Card -->
        <div class="bg-accent-50 dark:bg-slate-800 p-6 sm:p-8 rounded-lg relative group transition-shadow duration-300 hover:shadow-xl overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>
          <div class="flex items-start mb-4">
            <div class="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7 text-orange-500 dark:text-orange-400 transition-transform duration-300 group-hover:scale-110">
                <path d="M3 5h18v4H3V5zm0 6h18v4H3v-4zm0 6h18v2H3v-2z" />
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-bold text-primary dark:text-accent-50 mb-2">
                {{ $t('about.skills.backend.title') }}
              </h3>
            </div>
          </div>
          <p class="text-base text-slate-600 dark:text-accent-200 leading-relaxed pl-1">
            {{ $t('about.skills.backend.description') }}
          </p>
        </div>

        <!-- Tools Card -->
        <div class="bg-accent-50 dark:bg-slate-800 p-6 sm:p-8 rounded-lg relative group transition-shadow duration-300 hover:shadow-xl overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>
          <div class="flex items-start mb-4">
            <div class="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7 text-orange-500 dark:text-orange-400 transition-transform duration-300 group-hover:scale-110">
                <path d="M12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5zM19.43 12.97c.04-.32.07-.64.07-.97s-.03-.65-.07-.97l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.97s.03.65.07.97l-2.11 1.66c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-bold text-primary dark:text-accent-50 mb-2">
                {{ $t('about.skills.tools.title') }}
              </h3>
            </div>
          </div>
          <p class="text-base text-slate-600 dark:text-accent-200 leading-relaxed pl-1">
            {{ $t('about.skills.tools.description') }}
          </p>
        </div>

        <!-- Languages Card -->
        <div class="bg-accent-50 dark:bg-slate-800 p-6 sm:p-8 rounded-lg relative group transition-shadow duration-300 hover:shadow-xl overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>
          <div class="flex items-start mb-4">
            <div class="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7 text-orange-500 dark:text-orange-400 transition-transform duration-300 group-hover:scale-110">
                <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-bold text-primary dark:text-accent-50 mb-2">
                {{ $t('about.skills.languages.title') }}
              </h3>
            </div>
          </div>
          <p class="text-base text-slate-600 dark:text-accent-200 leading-relaxed pl-1">
            {{ $t('about.skills.languages.description') }}
          </p>
        </div>
      </div>
    </div>

    <!-- 4. Additional services (AC: 4, 5, 6, 7) -->
    <div class="mt-10 sm:mt-12">
      <h2 class="text-lg sm:text-xl md:text-2xl font-semibold text-primary dark:text-accent-50 mb-2">
        {{ $t('about.additionalServices.title') }}
      </h2>
      <p class="text-sm text-slate-600 dark:text-accent-200 mb-6">
        {{ $t('about.additionalServices.subtitle') }}
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <article
          role="article"
          class="bg-accent-50 dark:bg-slate-800 p-6 rounded-lg border border-transparent hover:border-orange-500 dark:hover:border-orange-400 hover:shadow-md transition-all duration-300"
        >
          <h3 class="text-base font-semibold text-primary dark:text-accent-50 mb-2">
            {{ $t('about.additionalServices.adminPanel.title') }}
          </h3>
          <p class="text-sm text-slate-600 dark:text-accent-200 mb-4">
            {{ $t('about.additionalServices.adminPanel.description') }}
          </p>
          <router-link
            to="/contact"
            class="inline-block px-4 py-2 rounded-lg bg-orange-500 dark:bg-orange-400 text-white dark:text-primary hover:bg-orange-600 dark:hover:bg-orange-500 transition-colors duration-300 font-medium text-sm"
          >
            {{ $t('about.additionalServices.adminPanel.cta') }}
          </router-link>
        </article>

        <article
          role="article"
          class="bg-accent-50 dark:bg-slate-800 p-6 rounded-lg border border-transparent hover:border-orange-500 dark:hover:border-orange-400 hover:shadow-md transition-all duration-300"
        >
          <h3 class="text-base font-semibold text-primary dark:text-accent-50 mb-2">
            {{ $t('about.additionalServices.maintenance.title') }}
          </h3>
          <p class="text-sm text-slate-600 dark:text-accent-200 mb-4">
            {{ $t('about.additionalServices.maintenance.description') }}
          </p>
          <router-link
            to="/contact"
            class="inline-block px-4 py-2 rounded-lg bg-orange-500 dark:bg-orange-400 text-white dark:text-primary hover:bg-orange-600 dark:hover:bg-orange-500 transition-colors duration-300 font-medium text-sm"
          >
            {{ $t('about.additionalServices.maintenance.cta') }}
          </router-link>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
import MetaTags from '@/components/MetaTags.vue'
import NasaBadge from '@/components/NasaBadge.vue'

export default {
  name: 'About',
  components: { MetaTags, NasaBadge }
}
</script>
