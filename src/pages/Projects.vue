<template>
  <section>
    <MetaTags
      :title="$t('projects.title')"
      :description="$t('projects.description')"
      keywords="Melchior JORDA, Projects, Portfolio, Web Development, Vue.js, JavaScript, C Programming, 42 School, Applications, Websites"
      url="/projects"
    />

    <!-- Titre et description responsive -->
    <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-primary dark:text-accent-50">
      {{ $t('projects.title') }}
    </h1>
    <p class="text-sm sm:text-base text-slate-600 dark:text-accent-200 mt-2 sm:mt-3">
      {{ $t('projects.description') }}
    </p>

    <!-- Tab Filter -->
    <ProjectFilter @tab-change="onTabChange" />

    <!-- Clients Section -->
    <transition name="fade">
      <div v-show="activeTab === 'client'" class="mt-10">
        <div
          v-if="clientProjects.length"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6"
        >
          <ProjectCard
            v-for="project in clientProjects"
            :key="project.id"
            :project="project"
          />
        </div>
        <p v-else class="text-center text-gray-500 dark:text-gray-400 mt-10">
          {{ $t('projects.emptyTab') }}
        </p>
      </div>
    </transition>

    <!-- 42 School Projects Section -->
    <transition name="fade">
      <div v-show="activeTab === '42'" class="mt-10">
        <div
          v-if="school42Projects.length"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6"
        >
          <article
            v-for="project in school42Projects"
            :key="project.id"
            class="card bg-accent-50 dark:bg-slate-800 rounded-lg p-5 sm:p-6 relative group transition-shadow duration-300 hover:shadow-lg overflow-hidden flex flex-col"
          >
            <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>
            <h3 class="text-base sm:text-lg font-semibold text-primary dark:text-accent-50">
              {{ $te(`projects.items.${project.id}.title`) ? $t(`projects.items.${project.id}.title`) : project.title }}
            </h3>
            <p class="text-sm sm:text-base text-slate-600 dark:text-accent-200 mt-2 flex-grow">
              {{ $te(`projects.items.${project.id}.description`) ? $t(`projects.items.${project.id}.description`) : project.description }}
            </p>

            <div class="flex flex-wrap gap-2 mt-3">
              <span
                v-for="tech in project.technologies"
                :key="tech"
                class="text-xs px-2 py-1 bg-primary/10 dark:bg-accent-100/10 text-primary dark:text-accent-100 rounded"
              >
                {{ tech }}
              </span>
            </div>

            <div class="flex gap-3 mt-4">
              <a
                v-if="project.live"
                :href="project.live"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="$t('projects.try_replit') + ' – ' + ($t(`projects.items.${project.id}.title`) || project.title)"
                class="text-sm px-4 py-2 bg-primary dark:bg-orange-400 dark:text-primary text-white rounded hover:opacity-80 transition-opacity"
              >
                {{ $t('projects.try_replit') }}
              </a>
              <a
                v-if="project.github"
                :href="project.github"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="'GitHub – ' + ($t(`projects.items.${project.id}.title`) || project.title)"
                class="text-sm px-4 py-2 border border-primary dark:border-accent-100 text-primary dark:text-accent-100 rounded hover:bg-primary/10 dark:hover:bg-accent-100/10 transition-colors"
              >
                GitHub
              </a>
            </div>
          </article>
        </div>
        <p v-else class="text-center text-gray-500 dark:text-gray-400 mt-10">
          {{ $t('projects.emptyTab') }}
        </p>
      </div>
    </transition>
  </section>
</template>

<script>
import projectsData from '@/data/projects.json'
import MetaTags from '@/components/MetaTags.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import ProjectFilter from '@/components/ProjectFilter.vue'

export default {
  name: 'Projects',
  components: {
    MetaTags,
    ProjectCard,
    ProjectFilter
  },
  data() {
    return {
      projects: projectsData,
      activeTab: 'client'
    }
  },
  computed: {
    clientProjects() {
      return this.projects.filter(p => p.category === 'client')
    },
    school42Projects() {
      return this.projects.filter(p => p.category === '42')
    }
  },
  methods: {
    onTabChange(tab) {
      this.activeTab = tab
    }
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 150ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
