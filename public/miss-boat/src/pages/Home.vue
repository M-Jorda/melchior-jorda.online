<template>
  <section class="text-center">
    <div class="bg-[url('/src/assets/sea-hero.jpg')] bg-cover bg-center rounded-lg overflow-hidden shadow-soft-lg">
      <div class="bg-gradient-to-b from-transparent to-sea-800/60 p-16">
        <h2 class="text-4xl font-bold text-white">Explorez la Côte d'Azur en toute liberté</h2>
        <p class="mt-4 text-white/90 text-lg">Location de bateaux sans permis à partir de 16 ans — Cavalaire-sur-Mer</p>
        <div class="mt-6">
          <router-link to="/contact" class="inline-block bg-trop-500 text-white px-6 py-3 rounded-lg font-medium">Nous contacter</router-link>
        </div>
      </div>
    </div>

    <div class="max-w-3xl mx-auto py-8 prose lg:prose-lg text-slate-700">
      <p class="mt-6">Miss Boat vous propose des embarcations faciles à manier pour découvrir les criques et plages autour de Saint-Tropez. Nous offrons un briefing sécurité pour tous les conducteurs.</p>
    </div>

    <Gallery />
  </section>
</template>

<script>
import Gallery from '../components/Gallery.vue'

export default {
  name: 'Home',
  components: { Gallery }
}
</script>
