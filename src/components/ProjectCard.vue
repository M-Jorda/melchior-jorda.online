<template>
  <article
    class="card bg-accent-50 dark:bg-slate-800 rounded-lg p-5 sm:p-6 relative group transition-shadow duration-300 hover:shadow-lg overflow-hidden flex flex-col cursor-pointer select-none"
    @click="expanded = !expanded"
    :aria-expanded="expanded"
  >
    <!-- Orange left border on hover -->
    <div
      class="absolute left-0 top-0 bottom-0 w-1 pointer-events-none bg-gradient-to-b from-orange-400 via-orange-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-orange-500 dark:via-orange-400"
    ></div>

    <!-- Project image -->
    <img
      v-if="project.thumbnail"
      :src="project.thumbnail"
      :alt="imageAlt"
      class="w-full h-40 sm:h-48 object-cover rounded-md mb-4"
      loading="lazy"
      @error="handleImageError"
      @click.stop
    />

    <!-- Sector label -->
    <span
      v-if="project.sector"
      class="text-xs font-semibold text-orange-500 dark:text-orange-400 uppercase tracking-wide mb-1"
    >
      {{ project.sector }}
    </span>

    <!-- Title + chevron -->
    <div class="flex items-start justify-between gap-2">
      <h3 class="text-base sm:text-lg font-semibold text-primary dark:text-accent-50">
        {{ projectTitle }}
      </h3>
      <svg
        class="w-4 h-4 text-orange-500 dark:text-orange-400 flex-shrink-0 mt-1 transition-transform duration-200"
        :class="{ 'rotate-180': expanded }"
        fill="none" stroke="currentColor" viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </div>

    <!-- Description: tronquée en collapsed -->
    <p
      v-if="clientContext || projectDescription"
      class="text-sm sm:text-base text-slate-600 dark:text-accent-200 mt-2"
      :class="expanded ? 'flex-grow' : 'line-clamp-2'"
    >
      {{ clientContext || projectDescription }}
    </p>

    <!-- Contenu expanded -->
    <transition name="card-expand">
      <div v-if="expanded">
        <p v-if="projectResult" class="text-sm sm:text-base text-green-500 dark:text-green-400 mt-2">
          {{ projectResult }}
        </p>

        <div v-if="project.status" class="mt-3">
          <span
            v-if="project.status === 'delivered'"
            class="text-xs px-2 py-0.5 rounded-full bg-green-500/15 border border-green-500/40 text-green-700 dark:text-green-400"
          >
            {{ $t('projects.status.delivered') }}
          </span>
          <span
            v-else-if="project.status === 'in-progress'"
            class="text-xs px-2 py-0.5 rounded-full bg-orange-500/15 border border-orange-500/40 text-orange-700 dark:text-orange-400"
          >
            {{ $t('projects.status.inProgress') }}
          </span>
        </div>

        <div class="flex flex-wrap gap-2 mt-3">
          <span
            v-for="tech in project.technologies"
            :key="tech"
            class="text-xs px-2 py-1 bg-primary/10 dark:bg-accent-100/10 text-primary dark:text-accent-100 rounded"
          >
            {{ tech }}
          </span>
        </div>

        <div class="flex flex-wrap gap-3 mt-4" @click.stop>
          <a
            v-if="project.live"
            :href="project.live"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="$t('projects.view_live') + ' – ' + projectTitle"
            class="text-sm px-4 py-2 bg-primary dark:bg-orange-400 dark:text-primary text-white rounded hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {{ $t('projects.view_live') }}
          </a>
          <a
            v-if="project.github"
            :href="project.github"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="'GitHub – ' + projectTitle"
            class="text-sm px-4 py-2 border border-primary dark:border-accent-100 text-primary dark:text-accent-100 rounded hover:bg-primary/10 dark:hover:bg-accent-100/10 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            GitHub
          </a>
        </div>

        <router-link
          v-if="project.category === 'client'"
          to="/contact"
          @click.stop
          class="text-sm text-orange-500 dark:text-orange-400 hover:underline mt-3 inline-block focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
        >
          {{ $t('projects.contactCTA') }}
        </router-link>
      </div>
    </transition>
  </article>
</template>

<script>
export default {
  name: 'ProjectCard',
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      expanded: false
    }
  },
  computed: {
    projectTitle() {
      return this.$t('projects.items.' + this.project.id + '.title') || this.project.title
    },
    clientContext() {
      const key = 'projects.items.' + this.project.id + '.clientContext'
      return this.$te(key) ? this.$t(key) : null
    },
    projectDescription() {
      const key = 'projects.items.' + this.project.id + '.description'
      return this.$te(key) ? this.$t(key) : null
    },
    projectResult() {
      const key = 'projects.items.' + this.project.id + '.result'
      return this.$te(key) ? this.$t(key) : null
    },
    imageAlt() {
      const title = this.projectTitle
      const sector = this.project.sector || ''
      return sector ? title + ' — ' + sector : title
    }
  },
  methods: {
    handleImageError(event) {
      event.target.style.display = 'none'
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
