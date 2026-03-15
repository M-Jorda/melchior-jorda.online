<template>
  <article
    class="card bg-accent-50 dark:bg-slate-800 rounded-lg p-5 sm:p-6 relative group transition-shadow duration-300 hover:shadow-lg overflow-hidden flex flex-col"
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
    />

    <!-- Sector label (above title) -->
    <span
      v-if="project.sector"
      class="text-xs font-semibold text-orange-500 dark:text-orange-400 uppercase tracking-wide mb-1"
    >
      {{ project.sector }}
    </span>

    <!-- Title -->
    <h3 class="text-base sm:text-lg font-semibold text-primary dark:text-accent-50">
      {{ projectTitle }}
    </h3>

    <!-- Client context or description fallback -->
    <p
      v-if="clientContext || projectDescription"
      class="text-sm sm:text-base text-slate-600 dark:text-accent-200 mt-2 flex-grow"
    >
      {{ clientContext || projectDescription }}
    </p>

    <!-- Result (green) -->
    <p
      v-if="projectResult"
      class="text-sm sm:text-base text-green-500 dark:text-green-400 mt-2"
    >
      {{ projectResult }}
    </p>

    <!-- Status badge -->
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

    <!-- Tech tags -->
    <div class="flex flex-wrap gap-2 mt-3">
      <span
        v-for="tech in project.technologies"
        :key="tech"
        class="text-xs px-2 py-1 bg-primary/10 dark:bg-accent-100/10 text-primary dark:text-accent-100 rounded"
      >
        {{ tech }}
      </span>
    </div>

    <!-- Links (live, github) -->
    <div class="flex flex-wrap gap-3 mt-4">
      <a
        v-if="project.live"
        :href="project.live"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="$t('projects.view_live') + ' – ' + projectTitle"
        class="text-sm px-4 py-2 bg-primary dark:bg-orange-400 dark:text-primary text-white rounded hover:opacity-80 transition-opacity"
      >
        {{ $t('projects.view_live') }}
      </a>
      <a
        v-if="project.github"
        :href="project.github"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="'GitHub – ' + projectTitle"
        class="text-sm px-4 py-2 border border-primary dark:border-accent-100 text-primary dark:text-accent-100 rounded hover:bg-primary/10 dark:hover:bg-accent-100/10 transition-colors"
      >
        GitHub
      </a>
    </div>

    <!-- Contact CTA (client projects only) — preparation for Story 3.1 -->
    <router-link
      v-if="project.category === 'client'"
      to="/contact"
      class="text-sm text-orange-500 dark:text-orange-400 hover:underline mt-3 inline-block"
    >
      {{ $t('projects.contactCTA') }}
    </router-link>
  </article>
</template>

<script>
export default {
  name: 'ProjectCard',
  components: {},
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
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
