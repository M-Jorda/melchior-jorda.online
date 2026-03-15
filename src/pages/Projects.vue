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

    <!-- Filter Buttons -->
    <div class="mt-6 flex flex-wrap gap-2">
      <button
        v-for="cat in filterCategories"
        :key="cat.value"
        @click="selectedCategory = cat.value"
        :class="[
          'px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200',
          selectedCategory === cat.value
            ? 'bg-orange-500 dark:bg-orange-400 text-white dark:text-primary'
            : 'bg-accent-50 dark:bg-slate-800 text-primary dark:text-accent-100 hover:bg-orange-100 dark:hover:bg-slate-700'
        ]"
      >
        {{ cat.label }}
      </button>
    </div>

    <!-- Clients Section -->
    <div v-show="selectedCategory === 'all' || selectedCategory === 'client'" class="mt-10">
      <h2 class="text-lg sm:text-xl md:text-2xl font-bold text-primary dark:text-accent-50 mb-4 border-b-2 border-primary dark:border-accent-100 pb-2">
        {{ $t('projects.categories.clients') }}
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        <ProjectCard
          v-for="project in clientProjects"
          :key="project.id"
          :project="project"
        />
      </div>
    </div>

    <!-- Websites Section -->
    <div v-show="selectedCategory === 'all' || selectedCategory === 'websites'" class="mt-10">
      <h2 class="text-lg sm:text-xl md:text-2xl font-bold text-primary dark:text-accent-50 mb-4 border-b-2 border-primary dark:border-accent-100 pb-2">
        {{ $t('projects.categories.websites') }}
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        <article 
          v-for="project in websiteProjects" 
          :key="project.id"
          class="card bg-accent-50 dark:bg-slate-800 rounded-lg p-5 sm:p-6 relative group transition-shadow duration-300 hover:shadow-lg overflow-hidden flex flex-col"
        >
          <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>
          <img
            v-if="project.thumbnail"
            :src="project.thumbnail"
            :alt="($t(`projects.items.${project.id}.title`) || project.title) + ' - Project screenshot'"
            class="w-full h-40 sm:h-48 object-cover rounded-md mb-4"
            loading="lazy"
            @error="handleImageError"
          />

          <h3 class="text-base sm:text-lg font-semibold text-primary dark:text-accent-50">
            {{ $t(`projects.items.${project.id}.title`) || project.title }}
          </h3>
          <p class="text-sm sm:text-base text-slate-600 dark:text-accent-200 mt-2 flex-grow">
            {{ $t(`projects.items.${project.id}.description`) || project.description }}
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
              :aria-label="$t('projects.view_live') + ' – ' + ($t(`projects.items.${project.id}.title`) || project.title)"
              class="text-sm px-4 py-2 bg-primary dark:bg-orange-400 dark:text-primary text-white rounded hover:opacity-80 transition-opacity"
            >
              {{ $t('projects.view_live') }}
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
    </div>

    <!-- 42 School Projects Section -->
    <div v-show="selectedCategory === 'all' || selectedCategory === '42'" class="mt-10">
      <h2 class="text-lg sm:text-xl md:text-2xl font-bold text-primary dark:text-accent-50 mb-4 border-b-2 border-primary dark:border-accent-100 pb-2">
        {{ $t('projects.categories.school42') }}
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        <article 
          v-for="project in school42Projects" 
          :key="project.id"
          class="card bg-accent-50 dark:bg-slate-800 rounded-lg p-5 sm:p-6 relative group transition-shadow duration-300 hover:shadow-lg overflow-hidden flex flex-col"
        >
          <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>
          <h3 class="text-base sm:text-lg font-semibold text-primary dark:text-accent-50">
            {{ $t(`projects.items.${project.id}.title`) || project.title }}
          </h3>
          <p class="text-sm sm:text-base text-slate-600 dark:text-accent-200 mt-2 flex-grow">
            {{ $t(`projects.items.${project.id}.description`) || project.description }}
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
    </div>

    <!-- Applications Section -->
    <div v-show="selectedCategory === 'all' || selectedCategory === 'applications'" class="mt-10">
      <h2 class="text-lg sm:text-xl md:text-2xl font-bold text-primary dark:text-accent-50 mb-4 border-b-2 border-primary dark:border-accent-100 pb-2">
        {{ $t('projects.categories.applications') }}
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        <article 
          v-for="project in applicationProjects" 
          :key="project.id"
          class="card bg-accent-50 dark:bg-slate-800 rounded-lg p-5 sm:p-6 relative group transition-shadow duration-300 hover:shadow-lg overflow-hidden flex flex-col"
        >
          <div class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"></div>
          <img
            v-if="project.thumbnail"
            :src="project.thumbnail"
            :alt="($t(`projects.items.${project.id}.title`) || project.title) + ' - Application screenshot'"
            class="w-full h-40 sm:h-48 object-cover rounded-md mb-4"
            loading="lazy"
            @error="handleImageError"
          />

          <h3 class="text-base sm:text-lg font-semibold text-primary dark:text-accent-50">
            {{ $t(`projects.items.${project.id}.title`) || project.title }}
          </h3>
          <p class="text-sm sm:text-base text-slate-600 dark:text-accent-200 mt-2 flex-grow">
            {{ $t(`projects.items.${project.id}.description`) || project.description }}
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
              :aria-label="$t('projects.view_live') + ' – ' + ($t(`projects.items.${project.id}.title`) || project.title)"
              class="text-sm px-4 py-2 bg-primary dark:bg-orange-400 dark:text-primary text-white rounded hover:opacity-80 transition-opacity"
            >
              {{ $t('projects.view_live') }}
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
    </div>
  </section>
</template>

<script>
import projectsData from '@/data/projects.json'
import MetaTags from '@/components/MetaTags.vue'
import ProjectCard from '@/components/ProjectCard.vue'

export default {
  name: 'Projects',
  components: {
    MetaTags,
    ProjectCard
  },
  data() {
    return {
      projects: projectsData,
      selectedCategory: 'all'
    }
  },
  computed: {
    filterCategories() {
      return [
        { value: 'all', label: this.$t('projects.categories.all') },
        { value: 'client', label: this.$t('projects.categories.clients') },
        { value: 'websites', label: this.$t('projects.categories.websites') },
        { value: '42', label: this.$t('projects.categories.school42') },
        { value: 'applications', label: this.$t('projects.categories.applications') }
      ]
    },
    clientProjects() {
      return this.projects.filter(p => p.category === 'client')
    },
    websiteProjects() {
      return this.projects.filter(p => p.category === 'websites')
    },
    school42Projects() {
      return this.projects.filter(p => p.category === '42')
    },
    applicationProjects() {
      return this.projects.filter(p => p.category === 'applications')
    }
  },
  methods: {
    handleImageError(event) {
      // Cache l'image si elle n'existe pas
      event.target.style.display = 'none'
    }
  }
}
</script>
