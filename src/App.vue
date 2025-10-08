<template>
  <div class="bg-accent-50 dark:bg-slate-900 text-slate-900 dark:text-accent-50 font-sans transition-colors duration-300">
    <Header />
    <!-- Padding-top pour compenser la navbar fixe (hauteur approximative: 73px) -->
    <main class="container mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 pt-[85px] sm:pt-[90px] md:pt-[95px] min-h-screen">
      <router-view v-slot="{ Component, route }">
        <transition name="page" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  components: { Header, Footer }
}
</script>

<style>
/* Transitions smooth entre les pages */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.page-enter-to,
.page-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
