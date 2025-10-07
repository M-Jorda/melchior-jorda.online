<template>
  <section>
    <!-- Titre et description responsive -->
    <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-primary dark:text-accent-50">
      {{ $t('projects.title') }}
    </h1>
    <p class="text-sm sm:text-base text-slate-600 dark:text-accent-200 mt-2 sm:mt-3">
      {{ $t('projects.description') }}
    </p>
    
    <!-- Grille responsive: 1 colonne mobile, 2 colonnes tablette+, possibilité 3 colonnes sur très grand écran -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mt-4 sm:mt-5 md:mt-6">
      <!-- Projects will be rendered from data/projects.json in future -->
      <article class="card bg-accent-50 dark:bg-slate-800 transition-colors duration-300 p-5 sm:p-6 hover:shadow-lg hover:scale-105 transition-all">
        <h3 class="text-base sm:text-lg font-semibold text-primary dark:text-accent-50">
          {{ $t('projects.example_title') }}
        </h3>
        <p class="text-sm sm:text-base text-slate-600 dark:text-accent-200 mt-2">
          {{ $t('projects.example_description') }}
        </p>
      </article>
    </div>
  </section>
</template>

<script>
export default { name: 'Projects' }
</script>
