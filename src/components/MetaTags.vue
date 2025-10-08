<template>
  <div></div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: '' },
    description: { type: String, default: '' }
  },
  mounted() {
    if (this.title) document.title = `${this.title} · Melchior JORDA`
    if (this.description) {
      let meta = document.querySelector('meta[name="description"]')
      if (meta) meta.setAttribute('content', this.description)
    }
  }
}
</script>
