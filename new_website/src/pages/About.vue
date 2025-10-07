<template>
  <section>
    <!-- Titre responsive -->
    <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-primary dark:text-accent-50">
      {{ $t('about.title') }}
    </h1>
    
    <!-- Texte d'introduction responsive -->
    <p class="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-600 dark:text-accent-200 leading-relaxed">
      {{ $t('about.intro') }}
    </p>
    
    <!-- Sous-titre responsive -->
    <h2 class="mt-5 sm:mt-6 md:mt-8 text-lg sm:text-xl md:text-2xl font-semibold text-primary dark:text-accent-50">
      {{ $t('about.skills_title') }}
    </h2>
    
    <!-- Liste de compétences responsive -->
    <ul class="list-disc ml-5 sm:ml-6 mt-2 sm:mt-3 text-sm sm:text-base text-slate-600 dark:text-accent-200 space-y-1 sm:space-y-2">
      <li v-for="(skill, idx) in $t('about.skills')" :key="idx">{{ skill }}</li>
    </ul>
  </section>
</template>

<script>
export default { name: 'About' }
</script>
