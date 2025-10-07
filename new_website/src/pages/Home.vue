<template>
  <section>
    <!-- Hero section responsive -->
    <header class="text-center py-8 sm:py-10 md:py-12 bg-accent-100 dark:bg-slate-800 rounded-lg p-4 sm:p-6 transition-colors duration-300">
      <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary dark:text-accent-50">
        {{ $t('home.title') }}
      </h1>
      <p class="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-slate-600 dark:text-accent-200 px-4">
        {{ $t('home.subtitle') }}
      </p>
      
      <!-- Boutons responsive: empilés sur mobile, côte à côte sur tablette+ -->
      <div class="mt-5 sm:mt-6 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
        <router-link 
          to="/projects" 
          class="px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base bg-orange-500 dark:bg-orange-400 text-white dark:text-primary hover:bg-orange-600 dark:hover:bg-orange-500 transition-colors duration-300 font-medium"
        >
          {{ $t('home.see_projects') }}
        </router-link>
        <router-link 
          to="/contact" 
          class="px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base border-2 border-orange-500 dark:border-orange-400 text-orange-500 dark:text-orange-300 hover:bg-orange-50 dark:hover:bg-slate-700 transition-colors duration-300 font-medium"
        >
          {{ $t('home.contact_me') }}
        </router-link>
      </div>
    </header>

    <!-- Section projets vedette -->
    <section class="mt-8 sm:mt-10 md:mt-12">
      <h2 class="text-xl sm:text-2xl md:text-3xl font-semibold text-primary dark:text-accent-50">
        {{ $t('projects.featured') }}
      </h2>
      
      <!-- Grille responsive: 1 colonne mobile, 2 colonnes tablette+ -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mt-4 sm:mt-5 md:mt-6">
        <article class="card bg-accent-50 dark:bg-slate-800 transition-colors duration-300 p-5 sm:p-6">
          <h3 class="text-base sm:text-lg font-semibold text-primary dark:text-accent-50">
            {{ $t('projects.placeholder_title') }}
          </h3>
          <p class="text-sm sm:text-base text-slate-600 dark:text-accent-200 mt-2">
            {{ $t('projects.placeholder_description') }}
          </p>
        </article>
        <article class="card bg-accent-50 dark:bg-slate-800 transition-colors duration-300 p-5 sm:p-6">
          <h3 class="text-base sm:text-lg font-semibold text-primary dark:text-accent-50">
            {{ $t('projects.placeholder_title') }}
          </h3>
          <p class="text-sm sm:text-base text-slate-600 dark:text-accent-200 mt-2">
            {{ $t('projects.placeholder_description') }}
          </p>
        </article>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  name: 'Home'
}
</script>
