<template>
  <section>
    <!-- Titre responsive -->
    <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-primary dark:text-accent-50">
      {{ $t('resume.title') }}
    </h1>
    
    <!-- Description responsive -->
    <p class="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 dark:text-accent-200">
      {{ $t('resume.download') }}
    </p>
    
    <!-- Bouton de téléchargement responsive -->
    <a 
      class="inline-block mt-3 sm:mt-4 px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base rounded-lg bg-orange-500 dark:bg-orange-400 text-white dark:text-primary hover:bg-orange-600 dark:hover:bg-orange-500 transition-colors duration-300 font-medium" 
      href="/assets/Melchior-JORDA-CV.pdf" 
      download
    >
      {{ $t('resume.download_link') }}
    </a>

    <!-- Profile Section -->
    <div class="mt-6 sm:mt-8 md:mt-10">
      <h2 class="text-lg sm:text-xl md:text-2xl font-semibold text-primary dark:text-accent-50 border-b-2 border-primary dark:border-accent-100 pb-2">
        {{ $t('resume.profile.title') }}
      </h2>
      <div class="mt-3 bg-accent-50 dark:bg-slate-800 p-4 rounded-lg relative group transition-shadow duration-300 hover:shadow-lg overflow-hidden">
        <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>
        <div class="flex items-start">
          <!-- user/profile icon -->
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-orange-500 dark:text-orange-400 mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
          <p class="text-sm sm:text-base text-slate-600 dark:text-accent-200 leading-relaxed">
            {{ $t('resume.profile.description') }}
          </p>
        </div>
      </div>
    </div>

    <!-- Experience Section -->
    <div class="mt-6 sm:mt-8">
      <h2 class="text-lg sm:text-xl md:text-2xl font-semibold text-primary dark:text-accent-50 border-b-2 border-primary dark:border-accent-100 pb-2">
        {{ $t('resume.experience.title') }}
      </h2>
      
      <div class="mt-4 space-y-4">
        <article class="bg-accent-50 dark:bg-slate-800 p-4 rounded-lg relative group transition-shadow duration-300 hover:shadow-lg overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>
          <div class="flex items-start">
            <!-- game controller for video game tester -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-orange-500 dark:text-orange-400 mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
              <path d="M6 9h2v2H6V9zm0 4h2v2H6v-2zm10-4h2v2h-2V9zM8 6a6 6 0 00-6 6v2a4 4 0 004 4h2v-2H6a2 2 0 01-2-2v-2a4 4 0 014-4h8a4 4 0 014 4v2a2 2 0 01-2 2h-2v2h2a4 4 0 004-4v-2a6 6 0 00-6-6H8zm5 7h2v2h-2v-2z" />
            </svg>
            <div>
              <h3 class="text-base sm:text-lg font-semibold text-primary dark:text-accent-50">
                {{ $t('resume.experience.game_tester.title') }}
              </h3>
              <p class="text-xs sm:text-sm text-slate-500 dark:text-accent-300 mt-1">2024 - 2025</p>
              <p class="mt-2 text-sm sm:text-base text-slate-600 dark:text-accent-200">
                {{ $t('resume.experience.game_tester.description') }}
              </p>
            </div>
          </div>
        </article>

        <article class="bg-accent-50 dark:bg-slate-800 p-4 rounded-lg relative group transition-shadow duration-300 hover:shadow-lg overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>
          <div class="flex items-start">
            <!-- briefcase for internship -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-orange-500 dark:text-orange-400 mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
              <path d="M10 2h4a2 2 0 012 2v2h3v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6h3V4a2 2 0 012-2zm0 4V4h4v2h-4zM6 10v8h12v-8H6z" />
            </svg>
            <div>
              <h3 class="text-base sm:text-lg font-semibold text-primary dark:text-accent-50">
                {{ $t('resume.experience.internship.title') }}
              </h3>
              <p class="text-xs sm:text-sm text-slate-500 dark:text-accent-300 mt-1">2024</p>
              <p class="mt-2 text-sm sm:text-base text-slate-600 dark:text-accent-200">
                {{ $t('resume.experience.internship.description') }}
              </p>
            </div>
          </div>
        </article>

        <article class="bg-accent-50 dark:bg-slate-800 p-4 rounded-lg relative group transition-shadow duration-300 hover:shadow-lg overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>
          <div class="flex items-start">
            <!-- chef hat for chef experience -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-orange-500 dark:text-orange-400 mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
              <path d="M12 3a5 5 0 00-4.58 2.9A4 4 0 004 10v1h16v-1a4 4 0 00-3.42-4.1A5 5 0 0012 3zM6 13v2a3 3 0 003 3h6a3 3 0 003-3v-2H6z" />
            </svg>
            <div>
              <h3 class="text-base sm:text-lg font-semibold text-primary dark:text-accent-50">
                {{ $t('resume.experience.chef.title') }}
              </h3>
              <p class="text-xs sm:text-sm text-slate-500 dark:text-accent-300 mt-1">2011 - 2018</p>
              <p class="mt-2 text-sm sm:text-base text-slate-600 dark:text-accent-200">
                {{ $t('resume.experience.chef.description') }}
              </p>
            </div>
          </div>
        </article>

        <article class="bg-accent-50 dark:bg-slate-800 p-4 rounded-lg relative group transition-shadow duration-300 hover:shadow-lg overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>
          <div class="flex items-start">
            <!-- tools icon for various experience -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-orange-500 dark:text-orange-400 mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
              <path d="M21.71 20.29l-4-4A7.47 7.47 0 0019 12a7 7 0 10-7 7 7.47 7.47 0 004.29-1.29l4 4a1 1 0 001.42-1.42zM5 12a7 7 0 1114 0 7 7 0 01-14 0zm7-5v3h3v2h-3v3h-2v-3H7v-2h3V7h2z" />
            </svg>
            <div>
              <h3 class="text-base sm:text-lg font-semibold text-primary dark:text-accent-50">
                {{ $t('resume.experience.various.title') }}
              </h3>
              <p class="text-xs sm:text-sm text-slate-500 dark:text-accent-300 mt-1">2019 - 2023</p>
              <p class="mt-2 text-sm sm:text-base text-slate-600 dark:text-accent-200">
                {{ $t('resume.experience.various.description') }}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>

    <!-- IT Projects Section -->
    <div class="mt-6 sm:mt-8">
      <h2 class="text-lg sm:text-xl md:text-2xl font-semibold text-primary dark:text-accent-50 border-b-2 border-primary dark:border-accent-100 pb-2">
        {{ $t('resume.projects.title') }}
      </h2>
      
      <div class="mt-4 space-y-4">
        <article class="bg-accent-50 dark:bg-slate-800 p-4 rounded-lg relative group transition-shadow duration-300 hover:shadow-lg overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>
          <div class="flex items-start">
            <!-- hammer icon for auction project -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-orange-500 dark:text-orange-400 mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
              <path d="M13.78 15.3l-2.08-2.08-8.7 8.7L1.5 20.4l8.7-8.7-2.08-2.08L9.6 8.1l1.42 1.42L12.44 8.1l2.83 2.83-1.42 1.42 1.42 1.42-1.49 1.53zM14.5 6.5L17 4h4v4l-2.5 2.5-4-4zM15.9 9.8l-1.4-1.4 1.4-1.4 1.4 1.4-1.4 1.4z"/>
            </svg>
            <div>
              <h3 class="text-base sm:text-lg font-semibold text-primary dark:text-accent-50">
                {{ $t('resume.projects.auction.title') }}
              </h3>
              <p class="text-xs sm:text-sm text-slate-500 dark:text-accent-300 mt-1">2024</p>
              <p class="mt-2 text-sm sm:text-base text-slate-600 dark:text-accent-200">
                {{ $t('resume.projects.auction.description') }}
              </p>
            </div>
          </div>
        </article>

        <article class="bg-accent-50 dark:bg-slate-800 p-4 rounded-lg relative group transition-shadow duration-300 hover:shadow-lg overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>
          <div class="flex items-start">
            <!-- calendar for event project -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-orange-500 dark:text-orange-400 mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
              <path d="M7 10h10v2H7v-2zm0 4h6v2H7v-2zM17 4h-1V2h-2v2H10V2H8v2H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2z" />
            </svg>
            <div>
              <h3 class="text-base sm:text-lg font-semibold text-primary dark:text-accent-50">
                {{ $t('resume.projects.event.title') }}
              </h3>
              <p class="text-xs sm:text-sm text-slate-500 dark:text-accent-300 mt-1">2024</p>
              <p class="mt-2 text-sm sm:text-base text-slate-600 dark:text-accent-200">
                {{ $t('resume.projects.event.description') }}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>

    <!-- Skills Section -->
    <div class="mt-6 sm:mt-8">
      <h2 class="text-lg sm:text-xl md:text-2xl font-semibold text-primary dark:text-accent-50 border-b-2 border-primary dark:border-accent-100 pb-2">
        {{ $t('resume.skills.title') }}
      </h2>
      
      <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-accent-50 dark:bg-slate-800 p-4 rounded-lg relative group transition-shadow duration-300 hover:shadow-lg overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>
          <div class="flex items-start">
            <!-- monitor for frontend -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-orange-500 dark:text-orange-400 mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
              <path d="M3 5v12a2 2 0 002 2h6v2H9v2h6v-2h-2v-2h6a2 2 0 002-2V5H3zm2 2h14v8H5V7z" />
            </svg>
            <div>
              <h3 class="text-base font-semibold text-primary dark:text-accent-50 mb-2">
                {{ $t('resume.skills.frontend.title') }}
              </h3>
              <p class="text-sm text-slate-600 dark:text-accent-200">
                {{ $t('resume.skills.frontend.description') }}
              </p>
            </div>
          </div>
        </div>

        <div class="bg-accent-50 dark:bg-slate-800 p-4 rounded-lg relative group transition-shadow duration-300 hover:shadow-lg overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>
          <div class="flex items-start">
            <!-- server for backend -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-orange-500 dark:text-orange-400 mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
              <path d="M3 5h18v4H3V5zm0 6h18v4H3v-4zm0 6h18v2H3v-2z" />
            </svg>
            <div>
              <h3 class="text-base font-semibold text-primary dark:text-accent-50 mb-2">
                {{ $t('resume.skills.backend.title') }}
              </h3>
              <p class="text-sm text-slate-600 dark:text-accent-200">
                {{ $t('resume.skills.backend.description') }}
              </p>
            </div>
          </div>
        </div>

        <div class="bg-accent-50 dark:bg-slate-800 p-4 rounded-lg relative group transition-shadow duration-300 hover:shadow-lg overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>
          <div class="flex items-start">
            <!-- gear/cog icon for tools -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-orange-500 dark:text-orange-400 mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
              <path d="M12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5zM19.43 12.97c.04-.32.07-.64.07-.97s-.03-.65-.07-.97l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.97s.03.65.07.97l-2.11 1.66c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66z"/>
            </svg>
            <div>
              <h3 class="text-base font-semibold text-primary dark:text-accent-50 mb-2">
                {{ $t('resume.skills.tools.title') }}
              </h3>
              <p class="text-sm text-slate-600 dark:text-accent-200">
                {{ $t('resume.skills.tools.description') }}
              </p>
            </div>
          </div>
        </div>

        <div class="bg-accent-50 dark:bg-slate-800 p-4 rounded-lg relative group transition-shadow duration-300 hover:shadow-lg overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>
          <div class="flex items-start">
            <!-- language/translate icon for languages -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-orange-500 dark:text-orange-400 mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
              <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
            </svg>
            <div>
              <h3 class="text-base font-semibold text-primary dark:text-accent-50 mb-2">
                {{ $t('resume.skills.languages.title') }}
              </h3>
              <p class="text-sm text-slate-600 dark:text-accent-200">
                {{ $t('resume.skills.languages.description') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Education Section -->
    <div class="mt-6 sm:mt-8">
      <h2 class="text-lg sm:text-xl md:text-2xl font-semibold text-primary dark:text-accent-50 border-b-2 border-primary dark:border-accent-100 pb-2">
        {{ $t('resume.education.title') }}
      </h2>
      
      <div class="mt-4 space-y-4">
        <article class="bg-accent-50 dark:bg-slate-800 p-4 rounded-lg relative group transition-shadow duration-300 hover:shadow-lg overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>
          <div class="flex items-start">
            <!-- graduation cap for education -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-orange-500 dark:text-orange-400 mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
              <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v3.77c0 .75 3.11 2.05 7 2.05s7-1.3 7-2.05v-3.77l-7 3.82-7-3.82z" />
            </svg>
            <div>
              <h3 class="text-base sm:text-lg font-semibold text-primary dark:text-accent-50">
                {{ $t('resume.education.eni.title') }}
              </h3>
              <p class="text-xs sm:text-sm text-slate-500 dark:text-accent-300 mt-1">2023 - 2024</p>
              <p class="mt-2 text-sm sm:text-base text-slate-600 dark:text-accent-200">
                {{ $t('resume.education.eni.description') }}
              </p>
            </div>
          </div>
        </article>

        <article class="bg-accent-50 dark:bg-slate-800 p-4 rounded-lg relative group transition-shadow duration-300 hover:shadow-lg overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>
          <div class="flex items-start">
            <!-- graduation cap for education -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-orange-500 dark:text-orange-400 mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
              <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v3.77c0 .75 3.11 2.05 7 2.05s7-1.3 7-2.05v-3.77l-7 3.82-7-3.82z" />
            </svg>
            <div>
              <h3 class="text-base sm:text-lg font-semibold text-primary dark:text-accent-50">
                {{ $t('resume.education.school42.title') }}
              </h3>
              <p class="text-xs sm:text-sm text-slate-500 dark:text-accent-300 mt-1">2024 - 2025</p>
              <p class="mt-2 text-sm sm:text-base text-slate-600 dark:text-accent-200">
                {{ $t('resume.education.school42.description') }}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>

    <!-- Hobbies Section -->
    <div class="mt-6 sm:mt-8 mb-8">
      <h2 class="text-lg sm:text-xl md:text-2xl font-semibold text-primary dark:text-accent-50 border-b-2 border-primary dark:border-accent-100 pb-2">
        {{ $t('resume.hobbies.title') }}
      </h2>
      <div class="mt-3 bg-accent-50 dark:bg-slate-800 p-4 rounded-lg relative group transition-shadow duration-300 hover:shadow-lg overflow-hidden">
        <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>
        <div class="flex items-start">
          <!-- heart/favorite icon for hobbies -->
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-orange-500 dark:text-orange-400 mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <p class="text-sm sm:text-base text-slate-600 dark:text-accent-200 leading-relaxed">
            {{ $t('resume.hobbies.description') }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default { name: 'Resume' }
</script>
