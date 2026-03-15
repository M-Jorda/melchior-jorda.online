<template>
  <div class="w-full">
    <video
      v-if="!hasError"
      :poster="poster || undefined"
      :aria-label="title"
      preload="none"
      playsinline
      controls
      class="w-full rounded-lg"
      @error="onError"
    >
      <source :src="src" type="video/mp4" />
      <source :src="srcWebm" type="video/webm" />
    </video>

    <div
      v-else
      class="flex items-center justify-center w-full rounded-lg bg-gray-100 dark:bg-slate-800 py-12 text-sm text-gray-500 dark:text-accent-200"
    >
      {{ $t('fortyTwo.videoUnavailable') }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectVideo',
  props: {
    src: { type: String, required: true },
    srcWebm: { type: String, required: true },
    poster: { type: String, default: '' },
    title: { type: String, required: true }
  },
  data() {
    return {
      hasError: false
    }
  },
  methods: {
    onError() {
      this.hasError = true
    }
  }
}
</script>
