<template>
  <span
    role="img"
    :aria-label="$t('home.nasaBadge.aria')"
    :class="badgeClasses"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      :class="iconClasses"
      aria-hidden="true"
    >
      <path fill-rule="evenodd" d="M10 1a.75.75 0 01.75.75v1.5h3.75a.75.75 0 010 1.5h-.615l-1.14 5.13A3.001 3.001 0 0110 12.75a3.001 3.001 0 01-2.745-1.87L6.115 5.75H5.5a.75.75 0 010-1.5h3.75V1.75A.75.75 0 0110 1zM6.957 12.573A4.5 4.5 0 007.5 12.75h5a4.5 4.5 0 00.543-.177l.346 1.557A1.5 1.5 0 0112 15.75h-.25v.5a.75.75 0 01-1.5 0v-.5h-1.5v.5a.75.75 0 01-1.5 0v-.5H7a1.5 1.5 0 01-1.389-2.32l.346-1.557z" clip-rule="evenodd" />
    </svg>
    <span>{{ $t('home.nasaBadge.title') }}</span>
  </span>
</template>

<script>
export default {
  name: 'NasaBadge',
  props: {
    variant: {
      type: String,
      default: 'md',
      validator: (v) => ['md', 'sm'].includes(v)
    }
  },
  computed: {
    badgeClasses() {
      const base = 'inline-flex items-center rounded-full border border-orange-500/40 bg-orange-500/15 text-orange-600 dark:text-orange-400 font-medium'
      const sizes = {
        md: 'px-4 py-2 gap-2 text-base',
        sm: 'px-3 py-1.5 gap-1.5 text-sm'
      }
      return `${base} ${sizes[this.variant]}`
    },
    iconClasses() {
      return this.variant === 'md' ? 'w-5 h-5 flex-shrink-0' : 'w-4 h-4 flex-shrink-0'
    }
  }
}
</script>
