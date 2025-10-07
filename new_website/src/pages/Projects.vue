<template>
  <section>
    <!-- Titre et description responsive -->
    <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-primary dark:text-accent-50">
      {{ $t('projects.title') }}
    </h1>
    <p class="text-sm sm:text-base text-slate-600 dark:text-accent-200 mt-2 sm:mt-3">
      {{ $t('projects.description') }}
    </p>

    <!-- Websites Section -->
    <div class="mt-10">
      <h2 class="text-lg sm:text-xl md:text-2xl font-bold text-primary dark:text-accent-50 mb-4 border-b-2 border-primary dark:border-accent-100 pb-2">
        🌐 Websites
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        <article 
          v-for="project in websiteProjects" 
          :key="project.id"
          class="card bg-accent-50 dark:bg-slate-800 transition-colors duration-300 p-5 sm:p-6 hover:shadow-lg hover:scale-105 transition-all flex flex-col"
        >
          <img 
            v-if="project.thumbnail" 
            :src="project.thumbnail" 
            :alt="project.title"
            class="w-full h-40 sm:h-48 object-cover rounded-md mb-4"
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
              class="text-sm px-4 py-2 bg-primary dark:bg-orange-400 dark:text-primary text-white rounded hover:opacity-80 transition-opacity"
            >
              {{ $t('projects.view_live') }}
            </a>
            <a 
              v-if="project.github" 
              :href="project.github" 
              target="_blank"
              class="text-sm px-4 py-2 border border-primary dark:border-accent-100 text-primary dark:text-accent-100 rounded hover:bg-primary/10 dark:hover:bg-accent-100/10 transition-colors"
            >
              GitHub
            </a>
          </div>
        </article>
      </div>
    </div>

    <!-- 42 School Projects Section -->
    <div class="mt-10">
      <h2 class="text-lg sm:text-xl md:text-2xl font-bold text-primary dark:text-accent-50 mb-4 border-b-2 border-primary dark:border-accent-100 pb-2">
        🎓 42 School Projects
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        <article 
          v-for="project in school42Projects" 
          :key="project.id"
          class="card bg-accent-50 dark:bg-slate-800 transition-colors duration-300 p-5 sm:p-6 hover:shadow-lg hover:scale-105 transition-all flex flex-col"
        >
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
              class="text-sm px-4 py-2 bg-primary dark:bg-orange-400 dark:text-primary text-white rounded hover:opacity-80 transition-opacity"
            >
              Try on Repl.it
            </a>
            <a 
              v-if="project.github" 
              :href="project.github" 
              target="_blank"
              class="text-sm px-4 py-2 border border-primary dark:border-accent-100 text-primary dark:text-accent-100 rounded hover:bg-primary/10 dark:hover:bg-accent-100/10 transition-colors"
            >
              GitHub
            </a>
          </div>
        </article>
      </div>
    </div>

    <!-- Applications Section -->
    <div class="mt-10">
      <h2 class="text-lg sm:text-xl md:text-2xl font-bold text-primary dark:text-accent-50 mb-4 border-b-2 border-primary dark:border-accent-100 pb-2">
        🛠️ Applications
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        <article 
          v-for="project in applicationProjects" 
          :key="project.id"
          class="card bg-accent-50 dark:bg-slate-800 transition-colors duration-300 p-5 sm:p-6 hover:shadow-lg hover:scale-105 transition-all flex flex-col"
        >
          <img 
            v-if="project.thumbnail" 
            :src="project.thumbnail" 
            :alt="project.title"
            class="w-full h-40 sm:h-48 object-cover rounded-md mb-4"
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
              class="text-sm px-4 py-2 bg-primary dark:bg-orange-400 dark:text-primary text-white rounded hover:opacity-80 transition-opacity"
            >
              {{ $t('projects.view_live') }}
            </a>
            <a 
              v-if="project.github" 
              :href="project.github" 
              target="_blank"
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

export default { 
  name: 'Projects',
  data() {
    return {
      projects: projectsData
    }
  },
  computed: {
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
