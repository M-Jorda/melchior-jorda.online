<template>
  <section>
    <MetaTags
      title="Resume & CV | Melchior JORDA"
      :description="$t('resume.profile.description')"
      keywords="Melchior JORDA, Resume, CV, Full-Stack Developer, Software Engineer, École 42, C++, Vue.js, PHP, Symfony"
      url="/resume"
    />

    <!-- Title -->
    <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-primary dark:text-accent-50">
      {{ $t('resume.title') }}
    </h1>

    <!-- Download description -->
    <p class="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 dark:text-accent-200">
      {{ $t('resume.download') }}
    </p>

    <!-- Download button -->
    <a
      class="inline-block mt-3 sm:mt-4 px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base rounded-lg bg-orange-500 dark:bg-orange-400 text-white dark:text-primary hover:bg-orange-600 dark:hover:bg-orange-500 transition-colors duration-300 font-medium"
      :href="cvPath"
      :download="cvFilename"
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
        <!-- LQA Tester -->
        <article class="bg-accent-50 dark:bg-slate-800 p-4 rounded-lg relative group transition-shadow duration-300 hover:shadow-lg overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>
          <div class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-orange-500 dark:text-orange-400 mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
              <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
            </svg>
            <div>
              <h3 class="text-base sm:text-lg font-semibold text-primary dark:text-accent-50">
                {{ $t('resume.experience.lqa_tester.title') }}
              </h3>
              <p class="text-xs sm:text-sm text-slate-500 dark:text-accent-300 mt-1">{{ $t('resume.experience.lqa_tester.date') }}</p>
              <p class="mt-2 text-sm sm:text-base text-slate-600 dark:text-accent-200">
                {{ $t('resume.experience.lqa_tester.description') }}
              </p>
            </div>
          </div>
        </article>

        <!-- NainVert -->
        <article class="bg-accent-50 dark:bg-slate-800 p-4 rounded-lg relative group transition-shadow duration-300 hover:shadow-lg overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>
          <div class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-orange-500 dark:text-orange-400 mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
            </svg>
            <div>
              <h3 class="text-base sm:text-lg font-semibold text-primary dark:text-accent-50">
                {{ $t('resume.experience.nainvert.title') }}
              </h3>
              <p class="text-xs sm:text-sm text-slate-500 dark:text-accent-300 mt-1">{{ $t('resume.experience.nainvert.date') }}</p>
              <p class="mt-2 text-sm sm:text-base text-slate-600 dark:text-accent-200">
                {{ $t('resume.experience.nainvert.description') }}
              </p>
            </div>
          </div>
        </article>

        <!-- Internship -->
        <article class="bg-accent-50 dark:bg-slate-800 p-4 rounded-lg relative group transition-shadow duration-300 hover:shadow-lg overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>
          <div class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-orange-500 dark:text-orange-400 mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
              <path d="M10 2h4a2 2 0 012 2v2h3v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6h3V4a2 2 0 012-2zm0 4V4h4v2h-4zM6 10v8h12v-8H6z"/>
            </svg>
            <div>
              <h3 class="text-base sm:text-lg font-semibold text-primary dark:text-accent-50">
                {{ $t('resume.experience.internship.title') }}
              </h3>
              <p class="text-xs sm:text-sm text-slate-500 dark:text-accent-300 mt-1">{{ $t('resume.experience.internship.date') }}</p>
              <p class="mt-2 text-sm sm:text-base text-slate-600 dark:text-accent-200">
                {{ $t('resume.experience.internship.description') }}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>

    <!-- Technical Projects Section (42) -->
    <div class="mt-6 sm:mt-8">
      <h2 class="text-lg sm:text-xl md:text-2xl font-semibold text-primary dark:text-accent-50 border-b-2 border-primary dark:border-accent-100 pb-2">
        {{ $t('resume.projects.title') }}
      </h2>

      <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Minishell -->
        <article class="bg-accent-50 dark:bg-slate-800 p-4 rounded-lg relative group transition-shadow duration-300 hover:shadow-lg overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>
          <div class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-orange-500 dark:text-orange-400 mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-2-1h-6v-2h6v2zM7.5 17l-1.41-1.41L8.67 13l-2.59-2.59L7.5 9l4 4-4 4z"/>
            </svg>
            <div>
              <h3 class="text-base font-semibold text-primary dark:text-accent-50">{{ $t('resume.projects.minishell.title') }}</h3>
              <p class="text-xs text-slate-500 dark:text-accent-300 mt-1">{{ $t('resume.projects.minishell.date') }}</p>
              <p class="mt-2 text-sm text-slate-600 dark:text-accent-200">{{ $t('resume.projects.minishell.description') }}</p>
            </div>
          </div>
        </article>

        <!-- Philosophers -->
        <article class="bg-accent-50 dark:bg-slate-800 p-4 rounded-lg relative group transition-shadow duration-300 hover:shadow-lg overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>
          <div class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-orange-500 dark:text-orange-400 mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <div>
              <h3 class="text-base font-semibold text-primary dark:text-accent-50">{{ $t('resume.projects.philosophers.title') }}</h3>
              <p class="text-xs text-slate-500 dark:text-accent-300 mt-1">{{ $t('resume.projects.philosophers.date') }}</p>
              <p class="mt-2 text-sm text-slate-600 dark:text-accent-200">{{ $t('resume.projects.philosophers.description') }}</p>
            </div>
          </div>
        </article>

        <!-- cub3D -->
        <article class="bg-accent-50 dark:bg-slate-800 p-4 rounded-lg relative group transition-shadow duration-300 hover:shadow-lg overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>
          <div class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-orange-500 dark:text-orange-400 mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            <div>
              <h3 class="text-base font-semibold text-primary dark:text-accent-50">{{ $t('resume.projects.cub3d.title') }}</h3>
              <p class="text-xs text-slate-500 dark:text-accent-300 mt-1">{{ $t('resume.projects.cub3d.date') }}</p>
              <p class="mt-2 text-sm text-slate-600 dark:text-accent-200">{{ $t('resume.projects.cub3d.description') }}</p>
            </div>
          </div>
        </article>

        <!-- C++ Modules -->
        <article class="bg-accent-50 dark:bg-slate-800 p-4 rounded-lg relative group transition-shadow duration-300 hover:shadow-lg overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>
          <div class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-orange-500 dark:text-orange-400 mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
              <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
            </svg>
            <div>
              <h3 class="text-base font-semibold text-primary dark:text-accent-50">{{ $t('resume.projects.cpp_modules.title') }}</h3>
              <p class="text-xs text-slate-500 dark:text-accent-300 mt-1">{{ $t('resume.projects.cpp_modules.date') }}</p>
              <p class="mt-2 text-sm text-slate-600 dark:text-accent-200">{{ $t('resume.projects.cpp_modules.description') }}</p>
            </div>
          </div>
        </article>
      </div>
    </div>

    <!-- Hackathons Section -->
    <div class="mt-6 sm:mt-8">
      <h2 class="text-lg sm:text-xl md:text-2xl font-semibold text-primary dark:text-accent-50 border-b-2 border-primary dark:border-accent-100 pb-2">
        {{ $t('resume.hackathons.title') }}
      </h2>

      <div class="mt-4">
        <article class="bg-accent-50 dark:bg-slate-800 p-4 rounded-lg relative group transition-shadow duration-300 hover:shadow-lg overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>
          <div class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-orange-500 dark:text-orange-400 mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
              <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/>
            </svg>
            <div>
              <h3 class="text-base sm:text-lg font-semibold text-primary dark:text-accent-50">
                {{ $t('resume.hackathons.nasa.title') }}
              </h3>
              <p class="text-xs sm:text-sm text-slate-500 dark:text-accent-300 mt-1">{{ $t('resume.hackathons.nasa.date') }}</p>
              <p class="mt-2 text-sm sm:text-base text-slate-600 dark:text-accent-200">
                {{ $t('resume.hackathons.nasa.description') }}
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
        <!-- Programming Languages -->
        <div class="bg-accent-50 dark:bg-slate-800 p-4 rounded-lg relative group transition-shadow duration-300 hover:shadow-lg overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>
          <div class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-orange-500 dark:text-orange-400 mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
              <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
            </svg>
            <div>
              <h3 class="text-base font-semibold text-primary dark:text-accent-50 mb-2">{{ $t('resume.skills.languages_prog.title') }}</h3>
              <p class="text-sm text-slate-600 dark:text-accent-200">{{ $t('resume.skills.languages_prog.description') }}</p>
            </div>
          </div>
        </div>

        <!-- Web Technologies -->
        <div class="bg-accent-50 dark:bg-slate-800 p-4 rounded-lg relative group transition-shadow duration-300 hover:shadow-lg overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>
          <div class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-orange-500 dark:text-orange-400 mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
              <path d="M3 5v12a2 2 0 002 2h6v2H9v2h6v-2h-2v-2h6a2 2 0 002-2V5H3zm2 2h14v8H5V7z"/>
            </svg>
            <div>
              <h3 class="text-base font-semibold text-primary dark:text-accent-50 mb-2">{{ $t('resume.skills.web.title') }}</h3>
              <p class="text-sm text-slate-600 dark:text-accent-200">{{ $t('resume.skills.web.description') }}</p>
            </div>
          </div>
        </div>

        <!-- Databases -->
        <div class="bg-accent-50 dark:bg-slate-800 p-4 rounded-lg relative group transition-shadow duration-300 hover:shadow-lg overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>
          <div class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-orange-500 dark:text-orange-400 mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
              <path d="M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4zm0 2c3.87 0 6 1.5 6 2s-2.13 2-6 2-6-1.5-6-2 2.13-2 6-2zm6 12c0 .5-2.13 2-6 2s-6-1.5-6-2v-2.23c1.61.78 3.72 1.23 6 1.23s4.39-.45 6-1.23V17zm0-4c0 .5-2.13 2-6 2s-6-1.5-6-2v-2.23c1.61.78 3.72 1.23 6 1.23s4.39-.45 6-1.23V13z"/>
            </svg>
            <div>
              <h3 class="text-base font-semibold text-primary dark:text-accent-50 mb-2">{{ $t('resume.skills.databases.title') }}</h3>
              <p class="text-sm text-slate-600 dark:text-accent-200">{{ $t('resume.skills.databases.description') }}</p>
            </div>
          </div>
        </div>

        <!-- Systems Programming -->
        <div class="bg-accent-50 dark:bg-slate-800 p-4 rounded-lg relative group transition-shadow duration-300 hover:shadow-lg overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>
          <div class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-orange-500 dark:text-orange-400 mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
              <path d="M3 5h18v4H3V5zm0 6h18v4H3v-4zm0 6h18v2H3v-2z"/>
            </svg>
            <div>
              <h3 class="text-base font-semibold text-primary dark:text-accent-50 mb-2">{{ $t('resume.skills.systems.title') }}</h3>
              <p class="text-sm text-slate-600 dark:text-accent-200">{{ $t('resume.skills.systems.description') }}</p>
            </div>
          </div>
        </div>

        <!-- Tools -->
        <div class="bg-accent-50 dark:bg-slate-800 p-4 rounded-lg relative group transition-shadow duration-300 hover:shadow-lg overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>
          <div class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-orange-500 dark:text-orange-400 mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
              <path d="M12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5zM19.43 12.97c.04-.32.07-.64.07-.97s-.03-.65-.07-.97l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.97s.03.65.07.97l-2.11 1.66c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66z"/>
            </svg>
            <div>
              <h3 class="text-base font-semibold text-primary dark:text-accent-50 mb-2">{{ $t('resume.skills.tools.title') }}</h3>
              <p class="text-sm text-slate-600 dark:text-accent-200">{{ $t('resume.skills.tools.description') }}</p>
            </div>
          </div>
        </div>

        <!-- Languages -->
        <div class="bg-accent-50 dark:bg-slate-800 p-4 rounded-lg relative group transition-shadow duration-300 hover:shadow-lg overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>
          <div class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-orange-500 dark:text-orange-400 mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
              <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
            </svg>
            <div>
              <h3 class="text-base font-semibold text-primary dark:text-accent-50 mb-2">{{ $t('resume.skills.languages.title') }}</h3>
              <p class="text-sm text-slate-600 dark:text-accent-200">{{ $t('resume.skills.languages.description') }}</p>
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
        <!-- École 42 -->
        <article class="bg-accent-50 dark:bg-slate-800 p-4 rounded-lg relative group transition-shadow duration-300 hover:shadow-lg overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>
          <div class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-orange-500 dark:text-orange-400 mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
              <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v3.77c0 .75 3.11 2.05 7 2.05s7-1.3 7-2.05v-3.77l-7 3.82-7-3.82z"/>
            </svg>
            <div>
              <h3 class="text-base sm:text-lg font-semibold text-primary dark:text-accent-50">
                {{ $t('resume.education.school42.title') }}
              </h3>
              <p class="text-xs sm:text-sm text-slate-500 dark:text-accent-300 mt-1">{{ $t('resume.education.school42.date') }}</p>
              <p class="mt-2 text-sm sm:text-base text-slate-600 dark:text-accent-200">
                {{ $t('resume.education.school42.description') }}
              </p>
            </div>
          </div>
        </article>

        <!-- ENI -->
        <article class="bg-accent-50 dark:bg-slate-800 p-4 rounded-lg relative group transition-shadow duration-300 hover:shadow-lg overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>
          <div class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-orange-500 dark:text-orange-400 mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
              <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v3.77c0 .75 3.11 2.05 7 2.05s7-1.3 7-2.05v-3.77l-7 3.82-7-3.82z"/>
            </svg>
            <div>
              <h3 class="text-base sm:text-lg font-semibold text-primary dark:text-accent-50">
                {{ $t('resume.education.eni.title') }}
              </h3>
              <p class="text-xs sm:text-sm text-slate-500 dark:text-accent-300 mt-1">{{ $t('resume.education.eni.date') }}</p>
              <p class="mt-2 text-sm sm:text-base text-slate-600 dark:text-accent-200">
                {{ $t('resume.education.eni.description') }}
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
import MetaTags from '@/components/MetaTags.vue'

export default {
  name: 'Resume',
  components: {
    MetaTags
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
    }
  }
}
</script>
