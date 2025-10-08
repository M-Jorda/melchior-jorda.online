<template>
  <div class="min-h-screen bg-gradient-to-b from-sky-50 to-white text-slate-800">
    <Header />
    <main class="container mx-auto p-4">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>
