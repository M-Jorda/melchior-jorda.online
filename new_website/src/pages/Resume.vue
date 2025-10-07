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

    <!-- Sous-section expérience -->
    <h2 class="mt-6 sm:mt-8 md:mt-10 text-lg sm:text-xl md:text-2xl font-semibold text-primary dark:text-accent-50">
      {{ $t('resume.experience_title') }}
    </h2>
    <p class="mt-2 sm:mt-3 text-sm sm:text-base text-slate-600 dark:text-accent-200 leading-relaxed">
      {{ $t('resume.experience_text') }}
    </p>
  </section>
</template>

<script>
export default { name: 'Resume' }
</script>
