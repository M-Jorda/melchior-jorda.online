<template>
  <section>
    <!-- Titre responsive -->
    <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-primary dark:text-accent-50">
      {{ $t('about.title') }}
    </h1>
    
    <!-- Introduction Section -->
    <div class="mt-6 sm:mt-8">
      <div class="bg-accent-50 dark:bg-slate-800 p-5 sm:p-6 rounded-lg relative group transition-shadow duration-300 hover:shadow-lg overflow-hidden">
        <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>
        <div class="flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-orange-500 dark:text-orange-400 mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
          <p class="text-sm sm:text-base text-slate-600 dark:text-accent-200 leading-relaxed">
            {{ $t('about.intro') }}
          </p>
        </div>
      </div>
    </div>

    <!-- Experience Highlights Section -->
    <div class="mt-8 sm:mt-10">
      <h2 class="text-lg sm:text-xl md:text-2xl font-semibold text-primary dark:text-accent-50 border-b-2 border-primary dark:border-accent-100 pb-2">
        {{ $t('about.experience_title') }}
      </h2>
      
      <div class="mt-4 space-y-4">
        <div class="bg-accent-50 dark:bg-slate-800 p-5 rounded-lg relative group transition-shadow duration-300 hover:shadow-lg overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>
          <div class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-orange-500 dark:text-orange-400 mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
              <path d="M6 9h2v2H6V9zm0 4h2v2H6v-2zm10-4h2v2h-2V9zM8 6a6 6 0 00-6 6v2a4 4 0 004 4h2v-2H6a2 2 0 01-2-2v-2a4 4 0 014-4h8a4 4 0 014 4v2a2 2 0 01-2 2h-2v2h2a4 4 0 004-4v-2a6 6 0 00-6-6H8zm5 7h2v2h-2v-2z"/>
            </svg>
            <div>
              <h3 class="text-base sm:text-lg font-semibold text-primary dark:text-accent-50">
                {{ $t('about.experience.game_tester.title') }}
              </h3>
              <p class="text-sm text-slate-600 dark:text-accent-200 mt-2">
                {{ $t('about.experience.game_tester.description') }}
              </p>
            </div>
          </div>
        </div>

        <div class="bg-accent-50 dark:bg-slate-800 p-5 rounded-lg relative group transition-shadow duration-300 hover:shadow-lg overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>
          <div class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-orange-500 dark:text-orange-400 mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
              <path d="M10 2h4a2 2 0 012 2v2h3v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6h3V4a2 2 0 012-2zm0 4V4h4v2h-4zM6 10v8h12v-8H6z" />
            </svg>
            <div>
              <h3 class="text-base sm:text-lg font-semibold text-primary dark:text-accent-50">
                {{ $t('about.experience.web_dev.title') }}
              </h3>
              <p class="text-sm text-slate-600 dark:text-accent-200 mt-2">
                {{ $t('about.experience.web_dev.description') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Skills Section -->
    <div class="mt-8 sm:mt-10">
      <h2 class="text-lg sm:text-xl md:text-2xl font-semibold text-primary dark:text-accent-50 border-b-2 border-primary dark:border-accent-100 pb-2">
        {{ $t('about.skills_title') }}
      </h2>
      
      <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-accent-50 dark:bg-slate-800 p-5 rounded-lg relative group transition-shadow duration-300 hover:shadow-lg overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>
          <div class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-orange-500 dark:text-orange-400 mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
              <path d="M3 5v12a2 2 0 002 2h6v2H9v2h6v-2h-2v-2h6a2 2 0 002-2V5H3zm2 2h14v8H5V7z" />
            </svg>
            <div>
              <h3 class="text-base font-semibold text-primary dark:text-accent-50 mb-2">
                {{ $t('about.skills.frontend.title') }}
              </h3>
              <p class="text-sm text-slate-600 dark:text-accent-200">
                {{ $t('about.skills.frontend.description') }}
              </p>
            </div>
          </div>
        </div>

        <div class="bg-accent-50 dark:bg-slate-800 p-5 rounded-lg relative group transition-shadow duration-300 hover:shadow-lg overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>
          <div class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-orange-500 dark:text-orange-400 mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
              <path d="M3 5h18v4H3V5zm0 6h18v4H3v-4zm0 6h18v2H3v-2z" />
            </svg>
            <div>
              <h3 class="text-base font-semibold text-primary dark:text-accent-50 mb-2">
                {{ $t('about.skills.backend.title') }}
              </h3>
              <p class="text-sm text-slate-600 dark:text-accent-200">
                {{ $t('about.skills.backend.description') }}
              </p>
            </div>
          </div>
        </div>

        <div class="bg-accent-50 dark:bg-slate-800 p-5 rounded-lg relative group transition-shadow duration-300 hover:shadow-lg overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>
          <div class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-orange-500 dark:text-orange-400 mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
              <path d="M12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5zM19.43 12.97c.04-.32.07-.64.07-.97s-.03-.65-.07-.97l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.97s.03.65.07.97l-2.11 1.66c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66z"/>
            </svg>
            <div>
              <h3 class="text-base font-semibold text-primary dark:text-accent-50 mb-2">
                {{ $t('about.skills.tools.title') }}
              </h3>
              <p class="text-sm text-slate-600 dark:text-accent-200">
                {{ $t('about.skills.tools.description') }}
              </p>
            </div>
          </div>
        </div>

        <div class="bg-accent-50 dark:bg-slate-800 p-5 rounded-lg relative group transition-shadow duration-300 hover:shadow-lg overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>
          <div class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-orange-500 dark:text-orange-400 mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
              <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
            </svg>
            <div>
              <h3 class="text-base font-semibold text-primary dark:text-accent-50 mb-2">
                {{ $t('about.skills.languages.title') }}
              </h3>
              <p class="text-sm text-slate-600 dark:text-accent-200">
                {{ $t('about.skills.languages.description') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Education Section -->
    <div class="mt-8 sm:mt-10">
      <h2 class="text-lg sm:text-xl md:text-2xl font-semibold text-primary dark:text-accent-50 border-b-2 border-primary dark:border-accent-100 pb-2">
        {{ $t('about.education_title') }}
      </h2>
      
      <div class="mt-4 space-y-4">
        <div class="bg-accent-50 dark:bg-slate-800 p-5 rounded-lg relative group transition-shadow duration-300 hover:shadow-lg overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>
          <div class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-orange-500 dark:text-orange-400 mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
              <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v3.77c0 .75 3.11 2.05 7 2.05s7-1.3 7-2.05v-3.77l-7 3.82-7-3.82z" />
            </svg>
            <div>
              <h3 class="text-base sm:text-lg font-semibold text-primary dark:text-accent-50">
                {{ $t('about.education.school42.title') }}
              </h3>
              <p class="text-sm text-slate-600 dark:text-accent-200 mt-2">
                {{ $t('about.education.school42.description') }}
              </p>
            </div>
          </div>
        </div>

        <div class="bg-accent-50 dark:bg-slate-800 p-5 rounded-lg relative group transition-shadow duration-300 hover:shadow-lg overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>
          <div class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-orange-500 dark:text-orange-400 mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
              <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v3.77c0 .75 3.11 2.05 7 2.05s7-1.3 7-2.05v-3.77l-7 3.82-7-3.82z" />
            </svg>
            <div>
              <h3 class="text-base sm:text-lg font-semibold text-primary dark:text-accent-50">
                {{ $t('about.education.eni.title') }}
              </h3>
              <p class="text-sm text-slate-600 dark:text-accent-200 mt-2">
                {{ $t('about.education.eni.description') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default { name: 'About' }
</script>
