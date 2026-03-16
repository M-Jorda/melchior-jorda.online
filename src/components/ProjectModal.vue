<template>
  <Teleport to="body">
    <transition name="modal-fade">
      <div
        v-if="project"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        :aria-label="projectTitle"
        @keydown.esc="$emit('close')"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/50 dark:bg-black/70"
          @click="$emit('close')"
        ></div>

        <!-- Modal panel -->
        <div class="relative bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 z-10">
          <!-- Close button -->
          <button
            @click="$emit('close')"
            class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:text-accent-200 dark:hover:text-accent-50 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
            aria-label="Fermer"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          <!-- Image -->
          <img
            v-if="project.thumbnail"
            :src="project.thumbnail"
            :alt="imageAlt"
            class="w-full h-48 object-cover rounded-lg mb-4"
            loading="lazy"
          />

          <!-- Sector -->
          <span
            v-if="project.sector"
            class="text-xs font-semibold text-orange-500 dark:text-orange-400 uppercase tracking-wide"
          >
            {{ project.sector }}
          </span>

          <!-- Title -->
          <h2 class="text-xl font-bold text-primary dark:text-accent-50 mt-1 pr-6">
            {{ projectTitle }}
          </h2>

          <!-- Description / Client context -->
          <p
            v-if="clientContext || projectDescription"
            class="text-sm text-slate-600 dark:text-accent-200 mt-3"
          >
            {{ clientContext || projectDescription }}
          </p>

          <!-- Result -->
          <p v-if="projectResult" class="text-sm text-green-500 dark:text-green-400 mt-2">
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

          <!-- Technologies -->
          <div class="flex flex-wrap gap-2 mt-4">
            <span
              v-for="tech in project.technologies"
              :key="tech"
              class="text-xs px-2 py-1 bg-primary/10 dark:bg-accent-100/10 text-primary dark:text-accent-100 rounded"
            >
              {{ tech }}
            </span>
          </div>

          <!-- Links -->
          <div class="flex flex-wrap gap-3 mt-5">
            <a
              v-if="project.live"
              :href="project.live"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="liveLabelText + ' – ' + projectTitle"
              class="text-sm px-4 py-2 bg-primary dark:bg-orange-400 dark:text-primary text-white rounded hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {{ liveLabelText }}
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
            <router-link
              v-if="project.category === 'client'"
              to="/contact"
              @click="$emit('close')"
              class="text-sm text-orange-500 dark:text-orange-400 hover:underline inline-block self-center focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
            >
              {{ $t('projects.contactCTA') }}
            </router-link>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script>
export default {
  name: 'ProjectModal',
  props: {
    project: {
      type: Object,
      default: null
    }
  },
  emits: ['close'],
  watch: {
    project(val) {
      if (val) {
        document.body.style.overflow = 'hidden'
        this.$nextTick(() => {
          const panel = this.$el?.querySelector('[role="dialog"] > div:last-child')
          if (panel) panel.focus()
        })
      } else {
        document.body.style.overflow = ''
      }
    }
  },
  beforeUnmount() {
    document.body.style.overflow = ''
  },
  computed: {
    projectTitle() {
      const key = 'projects.items.' + this.project?.id + '.title'
      return this.$te(key) ? this.$t(key) : this.project?.title
    },
    clientContext() {
      if (!this.project) return null
      const key = 'projects.items.' + this.project.id + '.clientContext'
      return this.$te(key) ? this.$t(key) : null
    },
    projectDescription() {
      if (!this.project) return null
      const key = 'projects.items.' + this.project.id + '.description'
      return this.$te(key) ? this.$t(key) : this.project.description || null
    },
    projectResult() {
      if (!this.project) return null
      const key = 'projects.items.' + this.project.id + '.result'
      return this.$te(key) ? this.$t(key) : null
    },
    imageAlt() {
      const title = this.projectTitle
      const sector = this.project?.sector || ''
      return sector ? title + ' — ' + sector : title
    },
    liveLabelText() {
      return this.project?.category === '42'
        ? this.$t('projects.try_replit')
        : this.$t('projects.view_live')
    }
  }
}
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
