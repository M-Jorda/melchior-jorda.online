<template>
  <section class="mt-8 sm:mt-10 md:mt-12" aria-labelledby="offre-block-heading">
    <h2 id="offre-block-heading" class="text-xl sm:text-2xl md:text-3xl font-semibold text-primary dark:text-accent-50 text-center mb-6 sm:mb-8">
      {{ $t('home.offreBlock.title') }}
    </h2>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
      <article
        v-for="service in services"
        :key="service.key"
        role="article"
        class="bg-accent-50 dark:bg-slate-800 rounded-lg p-5 sm:p-6 border border-transparent hover:border-orange-500 dark:hover:border-orange-400 hover:shadow-md transition-all duration-300"
      >
        <div class="text-orange-500 dark:text-orange-400 mb-3 w-8 h-8">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8" v-html="service.iconPath" aria-hidden="true"></svg>
        </div>
        <h3 class="text-base sm:text-lg font-semibold text-primary dark:text-accent-50 mb-2">
          {{ $t(`home.offreBlock.${service.key}.title`) }}
        </h3>
        <p class="text-sm text-slate-600 dark:text-accent-200">
          {{ $t(`home.offreBlock.${service.key}.profiles`) }}
        </p>
      </article>
    </div>

    <div class="mt-6 sm:mt-8 text-center">
      <router-link
        to="/contact"
        class="inline-block px-6 py-3 rounded-lg bg-orange-500 dark:bg-orange-400 text-white dark:text-primary hover:bg-orange-600 dark:hover:bg-orange-500 transition-colors duration-300 font-medium text-sm sm:text-base"
      >
        {{ $t('home.offreBlock.cta') }}
      </router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: 'OffreBlock',
  data() {
    return {
      services: [
        {
          key: 'vitrine',
          iconPath: '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>'
        },
        {
          key: 'ecommerce',
          iconPath: '<path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>'
        },
        {
          key: 'multipage',
          iconPath: '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>'
        }
      ]
    }
  }
}
</script>
