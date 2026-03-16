<template>
  <section>
    <MetaTags
      :title="$t('projects.title')"
      :description="$t('projects.description')"
      keywords="Melchior JORDA, Projects, Portfolio, Web Development, Vue.js, JavaScript, C Programming, 42 School, Applications, Websites"
      url="/projects"
    />

    <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-primary dark:text-accent-50">
      {{ $t('projects.title') }}
    </h1>
    <p class="text-sm sm:text-base text-slate-600 dark:text-accent-200 mt-2 sm:mt-3">
      {{ $t('projects.description') }}
    </p>

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
            class="card bg-accent-50 dark:bg-slate-800 rounded-lg p-5 sm:p-6 relative group transition-shadow duration-300 hover:shadow-lg overflow-hidden flex flex-col cursor-pointer select-none"
            @click="selectedProject = project"
            tabindex="0"
            @keydown.enter="selectedProject = project"
            @keydown.space.prevent="selectedProject = project"
            :aria-label="project42Title(project)"
          >
            <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>

            <!-- Title -->
            <h3 class="text-base sm:text-lg font-semibold text-primary dark:text-accent-50">
              {{ project42Title(project) }}
            </h3>

            <!-- Description truncated -->
            <p class="text-sm sm:text-base text-slate-600 dark:text-accent-200 mt-2 line-clamp-2">
              {{ project42Description(project) }}
            </p>

            <!-- "Voir plus" hint -->
            <span class="mt-3 text-xs text-orange-500 dark:text-orange-400 font-medium">
              {{ $t('projects.seeMore') || 'Voir plus →' }}
            </span>
          </article>
        </div>
        <p v-else class="text-center text-gray-500 dark:text-gray-400 mt-10">
          {{ $t('projects.emptyTab') }}
        </p>
      </div>
    </transition>

    <ProjectModal :project="selectedProject" @close="selectedProject = null" />
  </section>
</template>

<script>
import projectsData from '@/data/projects.json'
import MetaTags from '@/components/MetaTags.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import ProjectFilter from '@/components/ProjectFilter.vue'
import ProjectModal from '@/components/ProjectModal.vue'

export default {
  name: 'Projects',
  components: {
    MetaTags,
    ProjectCard,
    ProjectFilter,
    ProjectModal
  },
  data() {
    return {
      projects: projectsData,
      activeTab: 'client',
      selectedProject: null
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
    },
    project42Title(project) {
      const key = 'projects.items.' + project.id + '.title'
      return this.$te(key) ? this.$t(key) : project.title
    },
    project42Description(project) {
      const key = 'projects.items.' + project.id + '.description'
      return this.$te(key) ? this.$t(key) : project.description
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
