<template>
  <article
    class="card bg-accent-50 dark:bg-slate-800 rounded-lg p-5 sm:p-6 relative group transition-shadow duration-300 hover:shadow-lg overflow-hidden flex flex-col cursor-pointer select-none"
    @click="showModal = true"
    tabindex="0"
    @keydown.enter="showModal = true"
    @keydown.space.prevent="showModal = true"
    :aria-label="projectTitle"
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

    <!-- Sector label -->
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

    <!-- Description truncated -->
    <p
      v-if="clientContext || projectDescription"
      class="text-sm sm:text-base text-slate-600 dark:text-accent-200 mt-2 line-clamp-2"
    >
      {{ clientContext || projectDescription }}
    </p>

    <!-- "Voir plus" hint -->
    <span class="mt-3 text-xs text-orange-500 dark:text-orange-400 font-medium">
      {{ $t('projects.seeMore') || 'Voir plus →' }}
    </span>

    <ProjectModal :project="showModal ? project : null" @close="showModal = false" />
  </article>
</template>

<script>
import ProjectModal from '@/components/ProjectModal.vue'

export default {
  name: 'ProjectCard',
  components: { ProjectModal },
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showModal: false
    }
  },
  computed: {
    projectTitle() {
      return this.$te('projects.items.' + this.project.id + '.title')
        ? this.$t('projects.items.' + this.project.id + '.title')
        : this.project.title
    },
    clientContext() {
      const key = 'projects.items.' + this.project.id + '.clientContext'
      return this.$te(key) ? this.$t(key) : null
    },
    projectDescription() {
      const key = 'projects.items.' + this.project.id + '.description'
      return this.$te(key) ? this.$t(key) : this.project.description || null
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
