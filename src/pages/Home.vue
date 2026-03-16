<template>
  <section>
    <MetaTags
      :title="$t('home.title')"
      :description="$t('home.subtitle')"
      keywords="Melchior JORDA, Web Developer, Software Developer, Vue.js, JavaScript, TypeScript, C Programming, Portfolio, Projects, Frontend, Backend, Málaga"
      url="/"
    />

    <!-- Hero section responsive -->
    <header class="text-center py-8 sm:py-10 md:py-12 bg-accent-100 dark:bg-slate-800 rounded-lg p-4 sm:p-6 transition-colors duration-300">

      <div class="flex justify-center mb-4">
        <NasaBadge variant="md" />
      </div>

      <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary dark:text-accent-50">
        {{ $t('home.hero.title') }}
      </h1>
      <p class="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-slate-600 dark:text-accent-200 px-4">
        {{ $t('home.hero.subtitle') }}
      </p>

      <div class="mt-5 sm:mt-6 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
        <router-link
          to="/projects"
          class="px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base bg-orange-500 dark:bg-orange-400 text-white dark:text-primary hover:bg-orange-600 dark:hover:bg-orange-500 transition-colors duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          {{ $t('home.hero.ctaPrimary') }}
        </router-link>
        <router-link
          to="/contact"
          class="px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base border-2 border-orange-500 dark:border-orange-400 text-orange-500 dark:text-orange-300 hover:bg-orange-50 dark:hover:bg-slate-700 transition-colors duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          {{ $t('home.hero.ctaSecondary') }}
        </router-link>
      </div>
    </header>

    <OffreBlock />

    <!-- Section projets vedette -->
    <section id="projets" class="mt-8 sm:mt-10 md:mt-12">
      <h2 class="text-xl sm:text-2xl md:text-3xl font-semibold text-primary dark:text-accent-50">
        {{ $t('projects.featured') }}
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mt-4 sm:mt-5 md:mt-6">
        <article
          v-for="project in featuredProjects"
          :key="project.id"
          class="card bg-accent-50 dark:bg-slate-800 rounded-lg p-5 sm:p-6 relative group transition-shadow duration-300 hover:shadow-lg overflow-hidden flex flex-col cursor-pointer select-none"
          @click="expandedFeatured = { ...expandedFeatured, [project.id]: !expandedFeatured[project.id] }"
          :aria-expanded="!!expandedFeatured[project.id]"
        >
          <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>

          <!-- Title + chevron -->
          <div class="flex items-start justify-between gap-2">
            <h3 class="text-base sm:text-lg font-semibold text-primary dark:text-accent-50">
              {{ $t(`projects.items.${project.id}.title`) || project.title }}
            </h3>
            <svg
              class="w-4 h-4 text-orange-500 dark:text-orange-400 flex-shrink-0 mt-1 transition-transform duration-200"
              :class="{ 'rotate-180': expandedFeatured[project.id] }"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </div>

          <!-- Description tronquée -->
          <p
            class="text-sm sm:text-base text-slate-600 dark:text-accent-200 mt-2"
            :class="expandedFeatured[project.id] ? 'flex-grow' : 'line-clamp-2'"
          >
            {{ $t(`projects.items.${project.id}.description`) || project.description }}
          </p>

          <!-- Contenu expanded -->
          <transition name="card-expand">
            <div v-if="expandedFeatured[project.id]">
              <div class="flex flex-wrap gap-2 mt-3">
                <span
                  v-for="tech in project.technologies"
                  :key="tech"
                  class="text-xs px-2 py-1 bg-primary/10 dark:bg-accent-100/10 text-primary dark:text-accent-100 rounded"
                >
                  {{ tech }}
                </span>
              </div>
              <div class="mt-4" @click.stop>
                <a
                  v-if="project.live"
                  :href="project.live"
                  target="_blank"
                  rel="noopener noreferrer"
                  :aria-label="$t('projects.view_live') + ' – ' + ($t(`projects.items.${project.id}.title`) || project.title)"
                  class="inline-block text-sm px-4 py-2 bg-orange-500 dark:bg-orange-400 text-white dark:text-primary rounded hover:bg-orange-600 dark:hover:bg-orange-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {{ $t('projects.view_live') }}
                </a>
                <router-link
                  v-else
                  to="/projects"
                  @click.stop
                  class="inline-block text-sm px-4 py-2 border border-orange-500 dark:border-orange-400 text-orange-500 dark:text-orange-300 rounded hover:bg-orange-50 dark:hover:bg-slate-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {{ $t('home.see_projects') }}
                </router-link>
              </div>
            </div>
          </transition>
        </article>
      </div>
    </section>
  </section>
</template>

<script>
import projectsData from '@/data/projects.json'
import MetaTags from '@/components/MetaTags.vue'
import NasaBadge from '@/components/NasaBadge.vue'
import OffreBlock from '@/components/OffreBlock.vue'

export default {
  name: 'Home',
  components: {
    MetaTags,
    NasaBadge,
    OffreBlock
  },
  data() {
    return {
      featuredIds: ['re-fresh-earth', 'minata-portfolio', 'so-long'],
      projects: projectsData,
      expandedFeatured: {}
    }
  },
  computed: {
    featuredProjects() {
      return this.featuredIds
        .map(id => this.projects.find(p => p.id === id))
        .filter(Boolean)
    }
  }
}
</script>

<style scoped>
.card-expand-enter-active,
.card-expand-leave-active {
  transition: opacity 0.2s ease;
}
.card-expand-enter-from,
.card-expand-leave-to {
  opacity: 0;
}
</style>
