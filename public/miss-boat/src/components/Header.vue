<template>
  <header class="bg-gradient-to-r from-sea-500 to-sea-300 text-white shadow-soft-lg">
    <div class="container mx-auto flex items-center justify-between p-4">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white font-bold">MB</div>
        <div>
          <h1 class="text-xl font-semibold">Miss Boat</h1>
          <p class="text-sm text-white/90">Location bateaux sans permis • Cavalaire-sur-Mer</p>
        </div>
      </div>
      <nav class="space-x-6">
        <router-link to="/" class="px-3 py-2 rounded-lg hover:bg-white/10">Accueil</router-link>
        <router-link to="/qui-sommes-nous" class="px-3 py-2 rounded-lg hover:bg-white/10">Qui sommes-nous</router-link>
        <router-link to="/nos-tarifs" class="px-3 py-2 rounded-lg hover:bg-white/10">Nos Tarifs</router-link>
        <router-link to="/contact" class="px-3 py-2 rounded-lg bg-trop-500 text-white hover:opacity-95">Contact</router-link>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>
