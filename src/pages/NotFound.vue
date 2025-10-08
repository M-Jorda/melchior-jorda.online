<template>
  <section class="text-center py-12">
    <h1 class="text-3xl font-bold">404 — Page not found</h1>
    <p class="mt-4 text-slate-600">The page you're looking for doesn't exist.</p>
    <div class="mt-6">
      <router-link to="/" class="text-accent">Return home</router-link>
    </div>
  </section>
</template>

<script>
export default { name: 'NotFound' }
</script>
