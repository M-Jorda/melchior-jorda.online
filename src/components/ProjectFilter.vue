<template>
  <div
    role="tablist"
    class="mt-6 flex gap-2"
    @keydown="handleKeydown"
  >
    <button
      v-for="tab in tabs"
      :key="tab.value"
      role="tab"
      :aria-selected="activeTab === tab.value"
      :tabindex="activeTab === tab.value ? 0 : -1"
      @click="selectTab(tab.value)"
      :class="tabClass(tab.value)"
    >
      {{ $t(tab.labelKey) }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'ProjectFilter',
  props: {
    modelValue: {
      type: String,
      default: 'client'
    }
  },
  data() {
    return {
      activeTab: this.modelValue,
      tabs: [
        { value: 'client', labelKey: 'projects.filter.clients' },
        { value: '42',     labelKey: 'projects.filter.projets42' }
      ]
    }
  },
  methods: {
    selectTab(value) {
      this.activeTab = value
      this.$emit('tab-change', value)
    },
    tabClass(value) {
      const base = 'px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 border focus:outline-none focus:ring-2 focus:ring-orange-500'
      if (value === this.activeTab) {
        if (value === 'client') {
          return base + ' bg-orange-500 dark:bg-orange-400 text-white dark:text-primary border-transparent'
        }
        if (value === '42') {
          return base + ' bg-indigo-600/20 text-indigo-400 border-indigo-500/40'
        }
      }
      return base + ' bg-accent-50 dark:bg-slate-800 text-primary dark:text-accent-100 border-transparent hover:bg-orange-100 dark:hover:bg-slate-700'
    },
    handleKeydown(event) {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
      event.preventDefault()
      const idx = this.tabs.findIndex(t => t.value === this.activeTab)
      let next
      if (event.key === 'ArrowRight') {
        next = this.tabs[(idx + 1) % this.tabs.length]
      } else {
        next = this.tabs[(idx - 1 + this.tabs.length) % this.tabs.length]
      }
      this.selectTab(next.value)
      this.$nextTick(() => {
        const buttons = this.$el.querySelectorAll('[role="tab"]')
        const nextIdx = this.tabs.findIndex(t => t.value === next.value)
        if (buttons[nextIdx]) buttons[nextIdx].focus()
      })
    }
  }
}
</script>
